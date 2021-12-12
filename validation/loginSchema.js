// Validation schema of login
const Joi = require('joi')
const { userRoles } = require('../constants')

const schema = Joi.object({
  username: Joi.string().regex(/^[a-zA-Z0-9_.]+$/).min(3).max(50).required().messages({
    'any.required': '100',
    'string.empty': '100',
    'string.base': '101',
    'string.min': '102',
    'string.max': '103',
    'string.pattern.base': '104'
  }),
  password: Joi.string().min(4).max(128).required().messages({
    'any.required': '110',
    'string.empty': '110',
    'string.base': '111',
    'string.min': '112',
    'string.max': '113'
  }),
  type: Joi.string().required().valid(...userRoles).messages({
    'any.required': '120',
    'string.empty': '120',
    'string.base': '121',
    'any.only': '122'
  })
})

module.exports = schema
