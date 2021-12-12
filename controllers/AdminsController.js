const logger = require('../services/logger')
const Admin = require('../models/admin')
const createAdminSchema = require('../validation/createAdminSchema')
const { hash } = require('../services/bcrypt')
const httpError = require('../utils/httpError')

class AdminsController {
  static async create (req, res) {
    // Validate the data
    let body
    try {
      body = await createAdminSchema.validateAsync(req.body)
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error
      })
    }
  
    // Hash the password
    let hashedPassword
    try {
      hashedPassword = await hash(body.password)
    } catch (error) {
      logger.error('Unexpected error occurred while creating an admin')
      logger.error(error)
      return res.status(500).json(httpError(500))
    }
  
    // Create the admin
    let admin
    try {
      admin = await Admin.query().insert({
        username: body.username,
        password: hashedPassword
      })
    } catch (error) {
      if (error.name === 'UniqueViolationError') {
        return res.status(400).json({
          ok: false,
          error: {
            message: 'An admin already exists with this username.'
          }
        })
      }
      logger.error('Unexpected error occurred while creating a guardian')
      logger.error(error)
      return res.status(500).json(httpError(500))
    }
  
    res.json({
      ok: true,
      admin
    })
  }
}

module.exports = AdminsController
