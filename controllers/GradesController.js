const logger = require('../services/logger')
// const Grade = require('../models/grade')
const createGradeSchema = require('../validation-schemas/create-grade')
const SessionStudent = require('../models/session-student')

async function create (req, res) {
  // Validate the data
  let body
  try {
    body = await createGradeSchema.validateAsync(req.body)
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error
    })
  }

  // Create the grade
  let grade
  try {
    grade = await SessionStudent.relatedQuery('grades').for(body.session_student_id).insert({
      name: body.name,
      type: body.type,
      grade: body.grade
    })
  } catch (error) {
    if (error.name === 'ForeignKeyViolationError') {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'This session_student_id does not exist.'
        }
      })
    }
    logger.error('Unexpected error occurred while creating a class')
    logger.error(error)
    return res.status(500).json({
      ok: false,
      error: {
        message: 'Unexpected error occurred.'
      }
    })
  }

  res.json({
    ok: true,
    grade
  })
}

module.exports = {
  create
}
