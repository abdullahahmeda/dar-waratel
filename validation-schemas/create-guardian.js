const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '200',
    'string.empty': '200'
  }),
  username: Joi.string().regex(/^[a-zA-Z0-9_.]+$/).min(3).max(50).required().messages({
    'any.required': '210',
    'string.empty': '210',
    'string.min': '211',
    'string.max': '212',
    'string.pattern.base': '213'
  }),
  password: Joi.string().min(4).max(128).required().messages({
    'any.required': '220',
    'string.empty': '220',
    'string.min': '221',
    'string.max': '222'
  }),
  password_confirmation: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': '225',
    'string.empty': '225',
    'any.only': '226'
  }),
  address: Joi.string().allow('', null),
  phone: Joi.string().required().messages({
    'any.required': '230',
    'string.empty': '230'
  })
})

module.exports = schema
