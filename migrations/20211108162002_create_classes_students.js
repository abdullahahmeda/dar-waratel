exports.up = function (knex) {
  return knex.schema.createTable('classes_students', table => {
    table.increments()
    table
      .integer('class_id')
      .unsigned()
      .notNullable()
      .references('classes.id')
      .onDelete('cascade')
    table
      .integer('student_id')
      .unsigned()
      .notNullable()
      .references('students.id')
      .onDelete('cascade')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('classes_students')
}
