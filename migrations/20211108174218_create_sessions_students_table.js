exports.up = function (knex) {
  return knex.schema.createTable('sessions_students', table => {
    table
      .integer('session_id')
      .unsigned()
      .index()
      .notNullable()
      .references('sessions.id')
      .onDelete('cascade')
    table
      .integer('student_id')
      .unsigned()
      .index()
      .notNullable()
      .references('students.id')
      .onDelete('cascade')
    table.primary(['session_id', 'student_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sessions_students')
}
