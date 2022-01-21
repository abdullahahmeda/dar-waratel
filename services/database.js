const nconf = require('nconf')
const database = require('knex')({
  client: nconf.get('database_client'),
  connection: nconf.get('database_connection'),
  debug: false // nconf.get('NODE_ENV') === 'development'
})

module.exports = database
