const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  guardian_id: Joi.number().integer().positive().required()
})

module.exports = schema
