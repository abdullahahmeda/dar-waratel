const logger = require('../services/logger')
const createGradeSchema = require('../validation/createGradeSchema')
const SessionStudent = require('../models/session-student')
const Grade = require('../models/grade')

class GradesController {
  static async create (req, res) {
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
      grade = await SessionStudent.query().upsertGraph({
        session_id: body.session_id,
        student_id: body.student_id,
        grades: body.grades
      })
    } catch (error) {
      if (error.name === 'ForeignKeyViolationError') {
        return res.status(400).json({
          ok: false,
          error: {
            message: 'This session or this student do not exist.'
          }
        })
      }
      logger.error('Unexpected error occurred while creating grades')
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

  static async get (req, res) {
    const { sessionId, studentId } = req.params
    let grades
    try {
      grades = await Grade.query()
        .select('id', 'grade', 'name', 'type')
        .where({
          session_id: sessionId,
          student_id: studentId
        })
    } catch (error) {
      logger.error('Unexpected error occurred while fetching grades')
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
      grades
    })
  }
}

module.exports = GradesController
