const { Model } = require('objection')
const Guardian = require('./guardian')

class Student extends Model {
  static get tableName () {
    return 'students'
  }

  static get relationMappings () {
    return {
      guardian: {
        relation: Model.BelongsToOneRelation,
        modelClass: Guardian,
        join: {
          from: 'students.guardian_id',
          to: 'guardians.id'
        }
      }
    }
  }
}

module.exports = Student
