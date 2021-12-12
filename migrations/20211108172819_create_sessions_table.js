exports.up = function (knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.increments('id')
    table.integer('class_id').unsigned().index().notNullable().references('classes.id').onDelete('cascade')
    table.datetime('session_date').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sessions')
}
