const Joi = require('joi')
const { gradeTypes } = require('../constants')

const schema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid(...gradeTypes).required(),
  grade: Joi.string(),
  session_student_id: Joi.number().integer().positive().required()
})

module.exports = schema
