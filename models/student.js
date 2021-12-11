const { Model } = require('objection')
const Guardian = require('./guardian')

class Student extends Model {
  static get tableName () {
    return 'students'
  }

  static get relationMappings () {
    const Session = require('./session')

    return {
      guardian: {
        relation: Model.BelongsToOneRelation,
        modelClass: Guardian,
        join: {
          from: 'students.guardian_id',
          to: 'guardians.id'
        }
      },
      sessions: {
        relation: Model.ManyToManyRelation,
        modelClass: Session,
        join: {
          from: 'students.id',
          through: {
            from: 'sessions_students.student_id',
            to: 'sessions_students.session_id'
          },
          to: 'sessions.id'
        }
      }
    }
  }
}

module.exports = Student
