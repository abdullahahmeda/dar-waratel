const logger = require('../services/logger')
const Class = require('../models/class')
const Session = require('../models/session')
const createSessionSchema = require('../validation/createSessionSchema')
const Student = require('../models/student')
const httpError = require('../utils/httpError')

class SessionsController {
  static async all (req, res) {
    let sessions = Session.query().withGraphFetched('class')
    if (req.query.student_id)
      sessions = Student.relatedQuery('sessions')
        .for(req.query.student_id)
        .withGraphFetched('class')
    if (req.query.page)
      sessions = sessions.page(req.query.page, req.query.page_size || 10)
    try {
      sessions = await sessions
    } catch (error) {
      logger.error('Unexpected error occurred while fetching all sessions')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }

    res.json({
      ok: true,
      sessions
    })
  }

  static async get (req, res) {
    let session
    try {
      session = await Session.query()
        .withGraphFetched('[class,students]')
        .findById(req.params.id)
    } catch (error) {
      logger.error('Unexpected error occurred while fetcing a session')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
    if (!session) {
      return res.status(404).json({
        ok: false,
        error: {
          code: 'somevalue',
          message: 'This session was not found.'
        }
      })
    }
    res.json({
      ok: true,
      session
    })
  }

  static async create (req, res) {
    // Validate the data
    let body
    try {
      body = await createSessionSchema.validateAsync(req.body)
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error
      })
    }

    // Create the session
    let session
    try {
      session = await Session.transaction(async trx => {
        const session = await Class.relatedQuery('sessions', trx)
          .for(body.class_id)
          .insertGraph(
            {
              session_date: body.session_date,
              students: body.students.map(studentId => ({ id: studentId }))
            },
            {
              relate: true
            }
          )
        return session
      })
    } catch (error) {
      if (error.name === 'ForeignKeyViolationError') {
        return res.status(400).json({
          ok: false,
          error: {
            message: 'The class or one of the students do not exist.',
            details: error.message
          }
        })
      }
      logger.error('Unexpected error occurred while creating a session')
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
      session
    })
  }

  static async destroy (req, res) {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: '`id` parameter must be sent.'
      })
    }
    try {
      await Session.query().deleteById(id)
    } catch (error) {
      logger.error('Unexpected error occurred while deleting a session')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
    res.json({
      ok: true,
      message: 'Session has been deleted.'
    })
  }
}

module.exports = SessionsController
