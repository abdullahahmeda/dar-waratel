const { Model } = require('objection')

class Guardian extends Model {
  static get tableName () {
    return 'guardians'
  }

  static get relationMappings () {
    const Student = require('./student')

    return {
      students: {
        relation: Model.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'guardians.id',
          to: 'students.guardian_id'
        }
      }
    }
  }
}

module.exports = Guardian
