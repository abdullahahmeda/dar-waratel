const { Model } = require('objection')
const Student = require('./student')

class Class extends Model {
  static get tableName () {
    return 'classes'
  }

  static get relationMappings () {
    const Session = require('./session')

    return {
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: 'classes.id',
          through: {
            from: 'classes_students.class_id',
            to: 'classes_students.student_id'
          },
          to: 'students.id'
        }
      },

      sessions: {
        relation: Model.HasManyRelation,
        modelClass: Session,
        join: {
          from: 'classes.id',
          to: 'sessions.class_id'
        }
      }
    }
  }
}

module.exports = Class
