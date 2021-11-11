const { Model } = require('objection')
const Class = require('./class')
const Student = require('./student')

class Session extends Model {
  static get tableName () {
    return 'sessions'
  }

  static get relationMappings () {
    return {
      class: {
        relation: Model.BelongsToOneRelation,
        modelClass: Class,
        join: {
          from: 'sessions.class_id',
          to: 'classes.id'
        }
      },
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: 'sessions.id',
          through: {
            from: 'sessions_students.session_id',
            to: 'sessions_students.student_id'
          },
          to: 'students.id'
        }
      }
    }
  }
}

module.exports = Session
