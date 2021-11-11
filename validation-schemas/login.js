// Validation schema of login
const Joi = require('joi')
const { userRoles } = require('../constants')

const schema = Joi.object({
  username: Joi.string().regex(/^[a-zA-Z0-9_.]+$/).min(3).max(50).required().messages({
    'any.required': '100',
    'string.empty': '100',
    'string.min': '101',
    'string.max': '102',
    'string.pattern.base': '103'
  }),
  password: Joi.string().min(4).max(128).required().messages({
    'any.required': '110',
    'string.empty': '110',
    'string.min': '111',
    'string.max': '112'
  }),
  type: Joi.string().required().valid(...userRoles).messages({
    'any.required': '120',
    'string.empty': '120',
    'any.only': '121'
  })
})

module.exports = schema
