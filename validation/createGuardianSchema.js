const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '200',
    'string.empty': '200',
    'string.base': '201'
  }),
  username: Joi.string().regex(/^[a-zA-Z0-9_.]+$/).min(3).max(50).required().messages({
    'any.required': '210',
    'string.empty': '210',
    'string.base': '211',
    'string.min': '212',
    'string.max': '213',
    'string.pattern.base': '214'
  }),
  password: Joi.string().min(4).max(128).required().messages({
    'any.required': '220',
    'string.empty': '220',
    'string.empty': '221',
    'string.min': '222',
    'string.max': '223'
  }),
  password_confirmation: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': '225',
    'string.empty': '225',
    'string.base': '226',
    'any.only': '227'
  }),
  address: Joi.string().allow('', null),
  phone: Joi.string().required().messages({
    'any.required': '230',
    'string.empty': '230',
    'string.base': '231'
  })
})

module.exports = schema
