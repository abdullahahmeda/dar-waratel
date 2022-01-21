exports.up = function (knex) {
  return knex.schema.createTable('grades', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('type').notNullable()
    table.string('grade').nullable()
    table
      .integer('session_id')
      .unsigned() /*.references('sessions_students.session_id').onDelete('cascade')*/
    table
      .integer('student_id')
      .unsigned() /*.references('sessions_students.student_id').onDelete('cascade')*/
    table
      .foreign(['session_id', 'student_id'])
      .references(['session_id', 'student_id'])
      .inTable('sessions_students')
      .onDelete('cascade')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('grades')
}
