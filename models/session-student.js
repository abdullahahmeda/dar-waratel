const { Model } = require('objection')

class SessionStudent extends Model {
  static get tableName () {
    return 'sessions_students'
  }

  static get relationMappings () {
    const Grade = require('./grade')
    return {
      grades: {
        relation: Model.HasManyRelation,
        modelClass: Grade,
        join: {
          from: 'sessions_students.id',
          to: 'grades.session_student_id'
        }
      }
    }
  }
}

module.exports = SessionStudent
