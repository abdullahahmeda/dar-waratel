const logger = require('../services/logger')
const Class = require('../models/class')
const createClassSchema = require('../validation/createClassSchema')
const httpError = require('../utils/httpError')

class ClassesController {
  static async all (req, res) {
    let classes = Class.query()
    if (req.query.page) classes.page(req.query.page, req.query.page_size || 10)
    try {
      classes = await classes
    } catch (error) {
      logger.error('Unexpected error occurred while creating a student')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }

    res.json({
      ok: true,
      classes
    })
  }

  static async create (req, res) {
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
      console.log(body.students)
      _class = await Class.transaction(async trx => {
        const _class = await Class.query(trx).insertGraph(
          {
            name: body.name,
            students: body.students.map(studentId => ({ id: studentId }))
          },
          {
            relate: true
          }
        )
        logger.debug(_class)
        return _class
      })
    } catch (error) {
      if (error.name === 'ForeignKeyViolationError') {
        return res.status(400).json({
          ok: false,
          error: {
            message:
              'The given students array contains students that do not exist.'
          }
        })
      }
      logger.error('Unexpected error occurred while creating a class')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }

    res.json({
      ok: true,
      class: _class
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
      await Class.query().deleteById(id)
    } catch (error) {
      logger.error('Unexpected error occurred while deleting a class')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
    res.json({
      ok: true,
      message: 'Class has been deleted.'
    })
  }
}

module.exports = ClassesController
