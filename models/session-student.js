const { Model } = require('objection')

class SessionStudent extends Model {
  static get tableName () {
    return 'sessions_students'
  }

  static get idColumn () {
    return ['session_id', 'student_id']
  }

  static get relationMappings () {
    const Grade = require('./grade')
    return {
      grades: {
        relation: Model.HasManyRelation,
        modelClass: Grade,
        join: {
          from: [
            'sessions_students.session_id',
            'sessions_students.student_id'
          ],
          to: ['grades.session_id', 'grades.student_id']
        }
      }
    }
  }
}

module.exports = SessionStudent
