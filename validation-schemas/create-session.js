const Joi = require('joi')

const schema = Joi.object({
  session_date: Joi.string().required(),
  class_id: Joi.number().integer().positive().required(),
  students: Joi.array().items(Joi.number().integer().positive()).required().min(1)
})

module.exports = schema
