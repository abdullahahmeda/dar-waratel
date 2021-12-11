const Joi = require('joi')
const { gradeTypes } = require('../constants')

const schema = Joi.object({
  grades: Joi.array().items(Joi.object({
    id: Joi.number().integer().positive().optional(),
    name: Joi.string().required(),
    type: Joi.string().valid(...gradeTypes).required(),
    grade: Joi.string()
  })).required(),
  session_id: Joi.number().integer().positive().required(),
  student_id: Joi.number().integer().positive().required()
})

module.exports = schema
