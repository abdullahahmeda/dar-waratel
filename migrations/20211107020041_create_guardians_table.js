exports.up = function (knex) {
  return knex.schema.createTable('guardians', table => {
    table.increments()
    table.string('name').notNullable()
    table
      .string('username')
      .notNullable()
      .unique()
    table.string('password').notNullable()
    table.string('address').nullable()
    table.string('phone').notNullable()
    table
      .datetime('created_on')
      .notNullable()
      .defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('guardians')
}
