exports.up = function (knex) {
  return knex.schema.createTable('classes_students', (table) => {
    table.integer('class_id').unsigned().primary().references('classes.id')
    table.integer('student_id').unsigned().notNullable().references('students.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('classes_students')
}
