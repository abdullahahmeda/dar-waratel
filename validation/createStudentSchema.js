const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'any.required': '300',
      'string.empty': '300',
      'string.base': '301'
    }),
  guardian_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': '310',
      'number.base': '311',
      'number.positive': '311',
      'number.integer': '311'
    })
})

module.exports = schema
