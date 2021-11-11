const logger = require('../services/logger')
const Admin = require('../models/admin')
const loginSchema = require('../validation-schemas/login')
const { compare } = require('../services/bcrypt')
const Guardian = require('../models/guardian')
const httpError = require('../httpError')

async function me (req, res) {
  return res.json({
    ok: true,
    user: req.session.user || null
  })
}

async function login (req, res) {
  // validate the body
  let body
  try {
    body = await loginSchema.validateAsync(req.body)
  } catch (error) {
    return res.status(400).json(httpError(error.details[0].message))
  }

  // Fetch the user
  let user
  try {
    if (body.type === 'admin') user = await Admin.query().findOne({ username: body.username })
    else if (body.type === 'guardian') user = await Guardian.query().findOne({ username: body.username })
  } catch (error) {
    logger.error('Unexpected error occurred while logging in')
    logger.error(error)
    return res.status(500).json(httpError(1))
  }
  if (!user) {
    return res.status(401).json(httpError(190))
  }

  // Check the password
  let isPasswordCorrect
  try {
    isPasswordCorrect = await compare(body.password, user.password)
  } catch (error) {
    logger.error('Unexpected error occurred while logging in')
    logger.error(error)
    return res.status(500).json(httpError(1))
  }
  if (!isPasswordCorrect) {
    return res.status(401).json(httpError(190))
  }

  // Password is correct, save user to session
  req.session.user = { id: user.id, username: user.username, type: body.type }
  res.json({
    ok: true,
    user: req.session.user
  })
}

module.exports = {
  me,
  login
}
