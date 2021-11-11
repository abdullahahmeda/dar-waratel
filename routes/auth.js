const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const csrfProtection = require('../middlewares/csrfProtection')

router.get('/me', AuthController.me)
router.post('/login', csrfProtection, AuthController.login)

module.exports = {
  path: '/',
  router,
  rootPath: true
}
