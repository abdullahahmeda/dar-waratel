const Joi = require('joi')

const schema = Joi.object({
  grades: Joi.array()
    .items(
      Joi.object({
        id: Joi.number()
          .integer()
          .positive()
          .optional(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        grade: Joi.string().allow('')
      })
    )
    .required(),
  session_id: Joi.number()
    .integer()
    .positive()
    .required(),
  student_id: Joi.number()
    .integer()
    .positive()
    .required()
})

module.exports = schema
