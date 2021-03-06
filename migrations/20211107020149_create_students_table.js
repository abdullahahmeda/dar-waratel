exports.up = function (knex) {
  return knex.schema.createTable('students', table => {
    table.increments('id')
    table.string('name').notNullable()
    table
      .integer('guardian_id')
      .unsigned()
      .references('guardians.id')
      .nullable()
      .onDelete('cascade')
    table
      .datetime('created_on')
      .notNullable()
      .defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('students')
}
