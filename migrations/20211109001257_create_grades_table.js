exports.up = function (knex) {
  return knex.schema.createTable('grades', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('type').notNullable()
    table.string('grade').nullable()
    table.integer('session_student_id').unsigned().references('sessions_students.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('grades')
}
