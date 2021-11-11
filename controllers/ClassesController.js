const logger = require('../services/logger')
const Class = require('../models/class')
const createClassSchema = require('../validation-schemas/create-class')

async function create (req, res) {
  // Validate the data
  let body
  try {
    body = await createClassSchema.validateAsync(req.body)
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error
    })
  }

  // Create the class
  let _class
  try {
    _class = await Class.transaction(async trx => {
      const _class = await Class.query(trx).insert({ name: body.name })
      logger.debug(_class)
      await _class.$relatedQuery('students', trx).relate(body.students)
      return _class
    })
  } catch (error) {
    if (error.name === 'ForeignKeyViolationError') {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'The given students array contains students that do not exist.'
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
    class: _class
  })
}

module.exports = {
  create
}
