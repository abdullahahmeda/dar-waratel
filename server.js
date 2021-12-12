const express = require('express')
const cors = require('cors')
const nconf = require('nconf')
const morgan = require('morgan')
const { Model } = require('objection')
const logger = require('./services/logger')
const routes = require('./routes')
const helmet = require('helmet')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const escapeBody = require('./middlewares/escapeBody')
const { settings } = require('./constants')

// Create the express application
const app = express()

// Use nconf for configuration
nconf.argv().env().file('config.json')

const database = require('./services/database')
const httpError = require('./utils/httpError')

// Use Objection.js for our database
Model.knex(database)

setupSessions(app)

// Enable CORS for allowed origins only
app.use(cors({
  origin: nconf.get('allowed_origins'),
  credentials: true
}))

// Use helmet for security
app.use(helmet())

app.use(express.json())

// Escape body of any request from html tags
app.use(escapeBody())

// Log HTTP requests
app.use(morgan('dev'))

setupRoutes(app)

app.use(function jsonCorsResponse (err, req, res, next) {
  // Custom json response for cors error
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.status(403).json(httpError(10))
})

const PORT = isNaN(nconf.get('port')) ? 3000 : nconf.get('port')

app.listen(PORT, () => {
  logger.info(`App has started at ${PORT}`)
  logger.info(`Environment: ${nconf.get('NODE_ENV')}`)
})

// Test database connection
database.raw('SELECT 1 + 1 AS TEST_QUERY')
  .then(() => logger.info('Connected to database successfully'))
  .catch(error => {
    logger.error("Couldn't connect to database")
    logger.error(error)
  })

function setupRoutes (app) {
  try {
    routes.forEach(route => {
      app.use(`${route.rootPath ? route.path : settings.routes_prefix + route.path}`, route.router)
    })
    logger.info('Routes have been set up')
  } catch (error) {
    logger.error('Error while setting up routes')
    logger.error(error)
  }
}

function setupSessions (app) {
  const store = new KnexSessionStore({
    knex: database,
    tablename: 'knex_sessions'
  })

  app.use(
    session({
      secret: nconf.get('session_secret'),
      saveUninitialized: false,
      resave: true,
      cookie: {
        maxAge: settings.cookie_max_age,
        httpOnly: true
      },
      store
    })
  )
}
