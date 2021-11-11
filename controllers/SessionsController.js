const logger = require('../services/logger')
const Class = require('../models/class')
const Session = require('../models/session')
const createSessionSchema = require('../validation-schemas/create-session')

async function create (req, res) {
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
      const session = await Class.relatedQuery('sessions', trx).for(body.class_id).insert({ session_date: body.session_date })
      await session.$relatedQuery('students', trx).relate(body.students)
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
    session
  })
}

module.exports = {
  create
}
