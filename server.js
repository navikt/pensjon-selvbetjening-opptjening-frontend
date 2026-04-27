const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const compression = require('compression')
const winston = require('winston')

const app = express()

const PORT = process.env.PORT || 8080
const BASE_URL = '/pensjon/opptjening'

const OPPTJENING_BACKEND = process.env.OPPTJENING_BACKEND

if (!OPPTJENING_BACKEND) {
  throw new Error('OPPTJENING_BACKEND environment variable is not set')
}

const isDevelopment = process.env.NODE_ENV !== 'production'

const logger = winston.createLogger({
  format: isDevelopment ? winston.format.simple() : undefined,
  transports: [new winston.transports.Console()]
})

const loggerMiddleware = (logger) => (req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    const logMetadata = {
      url: req.originalUrl,
      method: req.method,
      duration,
      statusCode: res.statusCode,
      'x_correlation-id': req.headers['x_correlation-id']
    }

    const logMessage = `${req.method} ${req.path} ${res.statusCode}`
    if (res.statusCode >= 400) {
      logger.error(logMessage, logMetadata)
    } else {
      logger.info(logMessage, logMetadata)
    }
  })
  next()
}

app.use(
  compression({
    level: 9,
    filter: (req, res) => {
      const contentType = res.getHeader('Content-Type') || ''
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
  createProxyMiddleware({
    target: OPPTJENING_BACKEND,
    pathRewrite: {
      [`^${BASE_URL}/api/`]: '/api/'
    },
    changeOrigin: true,
    logProvider: () => logger
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
    logProvider: () => logger
  })
)

app.use(
  express.static(path.join(__dirname, 'build'), {
    index: false,
    etag: true
  })
)

app.use(`${BASE_URL}/`, express.static(path.join(__dirname, 'build')))

app.get(`${BASE_URL}/*`, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
