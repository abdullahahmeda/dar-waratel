const { hash } = require('../services/bcrypt')

const DEFAULT_PASSWORD = '1234'

exports.seed = function (knex) {
  return hash(DEFAULT_PASSWORD).then((hashedPassword) => {
    return knex('admins').insert({
      username: 'admin',
      password: hashedPassword
    })
  })
}
