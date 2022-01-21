const winston = require('winston')
const nconf = require('nconf')

const LOGS_DIR = 'logs'

const logger = winston.createLogger({
  level: nconf.get('NODE_ENV') === 'production' ? 'http' : 'debug',
  transports: [
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
      dirname: LOGS_DIR
    }),
    new winston.transports.File({ filename: 'combined.log', dirname: LOGS_DIR })
  ]
})

if (nconf.get('NODE_ENV') !== 'production') {
  logger.add(
    new winston.transports.Console({
      // winston.format.combine(
      format: winston.format.prettyPrint({
        colorize: true
      })
      // )
    })
  )
}

// Fixes winston does not log errors correctly. See: https://github.com/winstonjs/winston/issues/1498
logger.error = err => {
  if (err instanceof Error) {
    logger.log({ level: 'error', message: `${err.stack || err}` })
  } else {
    logger.log({ level: 'error', message: err })
  }
}

module.exports = logger
