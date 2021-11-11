const Guardian = require('../models/guardian')
// const Student = require('../models/student')
const logger = require('../services/logger')
const createStudentSchema = require('../validation-schemas/create-student')

async function create (req, res) {
  // Validate the data
  let body
  try {
    body = await createStudentSchema.validateAsync(req.body)
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error
    })
  }

  // Create the student
  let student
  try {
    student = await Guardian.relatedQuery('students').for(body.guardian_id).insert({
      name: body.name
    })
  } catch (error) {
    if (error.name === 'ForeignKeyViolationError') {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'The guardian with this id does not exist.'
        }
      })
    }
    logger.error('Unexpected error occurred while creating a student')
    logger.error(error)
    return res.status(500).json({
      ok: false,
      error: {
        message: 'Unexpected error occurred.'
      }
    })
  }

  return res.json({
    ok: true,
    student
  })
}

module.exports = {
  create
}
