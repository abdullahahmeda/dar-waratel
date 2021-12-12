const Guardian = require('../models/guardian')
const createGuardianSchema = require('../validation/createGuardianSchema')
const logger = require('../services/logger')
const { hash } = require('../services/bcrypt')
const httpError = require('../utils/httpError')
const Joi = require('joi')

class GuardiansController {
  static async all (req, res) {
    let guardians = Guardian.query()
    if (req.query.page) guardians.page(req.query.page, req.query.page_size || 10)
    try {
      guardians = await guardians
    } catch (error) {
      logger.error('Unexpected error occurred while creating a student')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
  
    res.json({
      ok: true,
      guardians
    })
  }

  static async create (req, res) {
    // Validate the data
    let body
    try {
      body = await createGuardianSchema.validateAsync(req.body)
    } catch (error) {
      return res.status(400).json(httpError(error.details[0].message))
    }
  
    // Hash the password
    let hashedPassword
    try {
      hashedPassword = await hash(body.password)
    } catch (error) {
      logger.error('Unexpected error occurred while creating a guardian')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
  
    // Create the guardian
    delete body.password_confirmation
    let guardian
    try {
      guardian = await Guardian.query().insert({ ...body, password: hashedPassword })
    } catch (error) {
      if (error.name === 'UniqueViolationError') {
        return res.status(400).json(httpError(290))
      }
      logger.error('Unexpected error occurred while creating a guardian')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
  
    res.json({
      ok: true,
      guardian
    })
  }

  static async destroy (req, res) {
    const { id } = req.params
    try {
      Joi.assert(id, Joi.number().integer().positive())
    } catch (error) {
      return res.status(400).json(httpError(291))
    }
    try {
      await Guardian.query().deleteById(id)
    } catch (error) {
      logger.error('Unexpected error occurred while deleting a guardian')
      logger.error(error)
      return res.status(500).json(httpError(1))
    }
    res.json({
      ok: true,
      message: 'Guardian has been deleted.'
    })
  }
}

module.exports = GuardiansController
