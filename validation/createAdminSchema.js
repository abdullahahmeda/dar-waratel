const Joi = require('joi')

const schema = Joi.object({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_.]+$/)
    .min(3)
    .max(50)
    .required(),
  password: Joi.string()
    .min(4)
    .max(128)
    .required(),
  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref('password'))
})

module.exports = schema
