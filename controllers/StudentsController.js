const httpError = require('../utils/httpError')
const Class = require('../models/class')
const Student = require('../models/student')
const logger = require('../services/logger')
const createStudentSchema = require('../validation/createStudentSchema')
const Joi = require('joi')

class StudentsController {
  static async all (req, res) {
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
  
  static async get (req, res) {
    let student
    try {
      student = await Student.query().findById(req.params.id)
    } catch (error) {
      logger.error('Unexpected error occurred while fetcing a student')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
    if (!student) {
      return res.status(404).json(httpError(391))
    }
    res.json({
      ok: true,
      student
    })
  }
  
  static async create (req, res) {
    // Validate the data
    let body
    try {
      body = await createStudentSchema.validateAsync(req.body)
    } catch (error) {
      return res.status(400).json(httpError(error.details[0].message))
    }
  
    // Create the student
    let student
    try {
      student = await Student.query().insert({
        name: body.name,
        guardian_id: body.guardian_id
      })
    } catch (error) {
      if (error.name === 'ForeignKeyViolationError') {
        return res.status(400).json(httpError(390))
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
  
  static async destroy (req, res) {
    const { id } = req.params
    try {
      Joi.assert(id, Joi.number().integer().positive())
    } catch (error) {
      return res.status(400).json(httpError(392))
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
}

module.exports = StudentsController
