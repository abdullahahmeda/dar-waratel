const faker = require('@faker-js/faker')
const Student = require('../models/student')
const Guardian = require('../models/guardian')

exports.run = async function run (knex) {
  const guardian = faker.random.arrayElement(await Guardian.query(knex))
  return Student.query(knex).insert({
    name: `${faker.name.findName()} ${guardian.name}`,
    guardian_id: guardian.id,
    created_on: faker.date.between('2018-01-01', '2022-03-15')
  })
}
