import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { createProxyMiddleware } from 'http-proxy-middleware'
import compression from 'compression'
import winston from 'winston'
import { getToken } from '@navikt/oasis'
import { validateToken } from '@navikt/oasis'
import { requestOboToken } from '@navikt/oasis'

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', true)

const PORT = process.env.PORT || 8080
const BASE_URL = '/pensjon/opptjening'

const BUILD_DIR = path.join(import.meta.dirname, 'build')
const INDEX_HTML = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')

const OPPTJENING_BACKEND = process.env.OPPTJENING_BACKEND

if (!OPPTJENING_BACKEND) {
  throw new Error('OPPTJENING_BACKEND environment variable is not set')
}

const OBO_AUDIENCE = process.env.ENTRA_ID_OBO_SCOPE

if (!OBO_AUDIENCE) {
  throw new Error('ENTRA_ID_OBO_SCOPE environment variable is not set')
}

const isDevelopment = process.env.NODE_ENV !== 'production'

const logger = winston.createLogger({
  format: isDevelopment ? winston.format.simple() : winston.format.json(),
  transports: [new winston.transports.Console()]
})

const sanitizeUrl = (url: string): string =>
  url.replace(/(fnr|pid)=[^&]*/gi, '$1=***********')

const loggerMiddleware =
  (logger: winston.Logger) =>
  (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now()
    res.on('finish', () => {
      const duration = Date.now() - start
      const logMetadata = {
        url: sanitizeUrl(req.originalUrl),
        method: req.method,
        duration,
        statusCode: res.statusCode,
        'x-correlation-id': req.headers['x-correlation-id']
      }

      const logMessage = `${req.method} ${sanitizeUrl(req.path)} ${res.statusCode}`
      if (res.statusCode >= 400) {
        logger.error(logMessage, logMetadata)
      } else {
        logger.info(logMessage, logMetadata)
      }
    })
    next()
  }

const onProxyError = (err: Error, req: Request, res: Response) => {
  logger.error('Proxy request failed', {
    method: req.method,
    url: sanitizeUrl(req.originalUrl),
    error: err.message
  })
  if (!res.headersSent) {
    res.status(502).json({ message: 'Bad gateway' })
  }
}

const getOboToken = async (req: Request) => {
  if (isDevelopment && process.env.ACCESS_TOKEN) {
    logger.info('DEVELOPMENT: Using ACCESS_TOKEN from environment')
    return process.env.ACCESS_TOKEN
  }

  const token = getToken(req)
  if (!token) {
    logger.info('No token found in request', {
      'x_correlation-id': req.headers['x_correlation-id']
    })
    throw new Error('403')
  }

  const validationResult = await validateToken(token)
  if (!validationResult.ok) {
    logger.error('Failed to validate token', {
      error: validationResult.error.message,
      errorType: validationResult.errorType,
      'x_correlation-id': req.headers['x_correlation-id']
    })
    throw new Error('401')
  }

  const obo = await requestOboToken(token, OBO_AUDIENCE)
  if (!obo.ok) {
    logger.error('Failed to get OBO token', {
      error: obo.error.message,
      'x_correlation-id': req.headers['x_correlation-id']
    })
    throw new Error('401')
  }
  return obo.token
}

app.use(
  compression({
    level: 9,
    filter: (req: Request, res: Response) => {
      const contentType = String(res.getHeader('Content-Type') || '')
      return /text\/css|application\/javascript|application\/json|image\/svg\+xml/.test(
        contentType
      )
    }
  })
)

app.get('/internal/alive', (req, res) => {
  res.status(200).send('Alive')
})

app.get('/internal/ready', (req, res) => {
  res.status(200).send('Ready')
})

app.use(loggerMiddleware(logger))

app.use(
  `${BASE_URL}/api/`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const oboToken = await getOboToken(req)
      req.headers['authorization'] = `Bearer ${oboToken}`
      next()
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' })
    }
  },
  createProxyMiddleware({
    target: OPPTJENING_BACKEND,
    pathRewrite: {
      [`^${BASE_URL}/api/`]: '/api/'
    },
    changeOrigin: true,
    logProvider: () => logger,
    onError: onProxyError
  })
)

app.use(
  `${BASE_URL}/oauth2/`,
  createProxyMiddleware({
    target: OPPTJENING_BACKEND,
    pathRewrite: {
      [`^${BASE_URL}/oauth2/`]: '/oauth2/'
    },
    changeOrigin: true,
    logProvider: () => logger,
    proxyTimeout: 30000,
    timeout: 30000,
    onError: onProxyError
  })
)

app.use(
  BASE_URL,
  express.static(BUILD_DIR, {
    index: false,
    etag: true
  })
)

app.get(`${BASE_URL}/*`, (req, res) => {
  res.type('html').send(INDEX_HTML)
})

app.get('/', (req, res) => {
  res.redirect(302, `${BASE_URL}${req.url}`)
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
