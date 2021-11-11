const { Model } = require('objection')
const SessionStudent = require('./session-student')

class Grade extends Model {
  static get tableName () {
    return 'grades'
  }

  static get relationMappings () {
    return {
      sessionStudent: {
        relation: Model.BelongsToOneRelation,
        modelClass: SessionStudent,
        join: {
          from: 'grades.session_student_id',
          to: 'sessions_students.id'
        }
      }
    }
  }
}

module.exports = Grade
