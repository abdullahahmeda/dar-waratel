const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  students: Joi.array()
    .items(
      Joi.number()
        .integer()
        .positive()
    )
    .required()
    .min(1)
})

module.exports = schema
