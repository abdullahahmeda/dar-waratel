exports.up = function (knex) {
  return knex.schema.createTable('sessions_students', (table) => {
    table.increments('id')
    table.integer('session_id').unsigned().index().notNullable().references('sessions.id')
    table.integer('student_id').unsigned().index().notNullable().references('students.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sessions_students')
}
