const faker = require('@faker-js/faker')
const Guardian = require('../models/guardian')

const password = '$2a$10$H8rMXHSb03VPSMvM7v2anu85w8UEzF9..H.k0DaQDD0bWJx2kDAq6' // 1234

exports.run = async function run (knex) {
  return Guardian.query(knex).insert({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password,
    phone: faker.phone.phoneNumberFormat(),
    address: faker.datatype.boolean() ? faker.address.streetAddress() : null
  })
}
