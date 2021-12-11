const httpError = require('../utils/httpError')
const Class = require('../models/class')
const Guardian = require('../models/guardian')
const Student = require('../models/student')
const logger = require('../services/logger')
const createStudentSchema = require('../validation-schemas/create-student')

async function all (req, res) {
  let students = Student.query()
  if (req.query.class_id) students = Class.relatedQuery('students').for(req.query.class_id)
  if (req.query.guardian_id) students = students.where('guardian_id', req.query.guardian_id)

  if (req.query.page) students = students.page(req.query.page, req.query.page_size || 10)
  try {
    students = await students
  } catch (error) {
    logger.error('Unexpected error occurred while creating a student')
    logger.error(error)
    return res.status(500).json(httpError(1))
  }

  res.json({
    ok: true,
    students
  })
}

async function get (req, res) {
  let student
  try {
    student = await Student.query().findById(req.params.id)
  } catch (error) {
    logger.error('Unexpected error occurred while fetcing a student')
    logger.error(error)
    return res.status(500).json(httpError(1))
  }
  if (!student) {
    return res.status(404).json({
      ok: false,
      error: {
        code: 'somevalue',
        message: 'This student was not found.'
      }
    })
  }
  res.json({
    ok: true,
    student
  })
}

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
    return res.status(500).json(httpError(1))
  }

  return res.json({
    ok: true,
    student
  })
}

async function destroy (req, res) {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: '`id` parameter must be sent.'
    })
  }
  try {
    await Student.query().deleteById(id)
  } catch (error) {
    logger.error('Unexpected error occurred while deleting a student')
    logger.error(error)
    return res.status(500).json(httpError(1))
  }
  res.json({
    ok: true,
    message: 'Student has been deleted.'
  })
}

module.exports = {
  all,
  get,
  create,
  destroy
}
