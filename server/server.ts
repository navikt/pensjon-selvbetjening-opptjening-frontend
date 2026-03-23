import express, { NextFunction, Request, Response } from 'express'
import compression from 'compression'
import path from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware'
import winston from 'winston'
import { getToken, requestOboToken, validateToken } from '@navikt/oasis'

const isDevelopment = process.env.NODE_ENV?.startsWith('development')

const logger = winston.createLogger({
  format: isDevelopment ? winston.format.simple() : undefined,
  transports: [new winston.transports.Console()]
})

const PORT = 8080
const BASE_URL = '/pensjon/opptjening'
const OPPTJENING_BACKEND =
  process.env.OPPTJENING_BACKEND ?? 'http://localhost:8081'

if (!process.env.OPPTJENING_BACKEND) {
  logger.warn(
    'OPPTJENING_BACKEND is not set, using default http://localhost:8081'
  )
}

const AUTH_PROVIDER = (() => {
  const idporten = !!process.env.TOKEN_X_ISSUER
  const azure = !!process.env.AZURE_OPENID_CONFIG_ISSUER

  if (idporten && azure) {
    throw new Error(
      'Both TOKEN_X_ISSUER (idporten) and AZURE_OPENID_CONFIG_ISSUER are set. Only one can be set.'
    )
  }

  if (idporten) return 'idporten'
  if (azure) return 'azure'

  throw new Error(
    'No auth provider is set (TOKEN_X_ISSUER or AZURE_OPENID_CONFIG_ISSUER)'
  )
})()

const OBO_AUDIENCE = (() => {
  if (AUTH_PROVIDER === 'idporten') {
    return process.env.TOKEN_X_OBO_AUDIENCE
  } else if (AUTH_PROVIDER === 'azure') {
    return process.env.ENTRA_ID_OBO_SCOPE
  }
})() as string

if (!OBO_AUDIENCE) {
  throw new Error(
    `OBO audience not set. Set ${AUTH_PROVIDER === 'idporten' ? 'TOKEN_X_OBO_AUDIENCE' : 'ENTRA_ID_OBO_SCOPE'}`
  )
}

const app = express()
const __dirname = process.cwd()

app.use(
  compression({
    level: 9,
    filter: (_req, res) => {
      const contentType = res.getHeader('Content-Type') || ''
      return /text\/css|application\/javascript|application\/json|image\/svg\+xml/.test(
        String(contentType)
      )
    }
  })
)

const sanitizeForLog = (input: string | undefined): string => {
  if (!input) return ''
  return input.replace(/[\r\n]/g, '').replace(/(fnr|pid)=[^&]*/gi, '$1=***')
}

const addCorrelationId = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.headers['x_correlation-id']) {
    req.headers['x_correlation-id'] = crypto.randomUUID()
  }
  next()
}

app.use(addCorrelationId)

app.get('/internal/alive', (_req: Request, res: Response) => {
  res.sendStatus(200)
})

app.get('/internal/ready', (_req: Request, res: Response) => {
  res.sendStatus(200)
})

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    const sanitizedUrl = sanitizeForLog(req.originalUrl)
    const sanitizedPath = sanitizeForLog(req.path)

    const logMetadata = {
      url: sanitizedUrl,
      method: req.method,
      duration,
      statusCode: res.statusCode,
      'x_correlation-id': sanitizeForLog(
        req.headers['x_correlation-id'] as string
      )
    }

    const logMessage = `${req.method} ${sanitizedPath} ${res.statusCode}`
    if (res.statusCode >= 400) {
      logger.error(logMessage, logMetadata)
    } else {
      logger.info(logMessage, logMetadata)
    }
  })
  next()
})

const getOboToken = async (req: Request): Promise<string> => {
  if (isDevelopment && process.env.ACCESS_TOKEN) {
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
  `${BASE_URL}/api/`,
  async (req: Request, res: Response, next: NextFunction) => {
    let oboToken: string
    try {
      oboToken = await getOboToken(req)
    } catch {
      res.sendStatus(401)
      return
    }

    createProxyMiddleware({
      target: `${OPPTJENING_BACKEND}/api/`,
      changeOrigin: true,
      pathRewrite: {
        [`^${BASE_URL}/api/`]: '/api/'
      },
      headers: {
        Authorization: `Bearer ${oboToken}`
      },
      logger: logger
    })(req, res, next)
  }
)

app.use(
  `${BASE_URL}/oauth2/`,
  createProxyMiddleware({
    target: OPPTJENING_BACKEND,
    changeOrigin: true,
    pathRewrite: {
      [`^${BASE_URL}/oauth2/`]: '/oauth2/'
    },
    logger: logger
  })
)

app.use(
  `${BASE_URL}/`,
  express.static(path.join(__dirname, 'build'), {
    index: false,
    etag: true
  })
)

app.get(`${BASE_URL}/*`, (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
  logger.info(
    `Server running on port ${PORT} using ${AUTH_PROVIDER} as auth provider`
  )
})
