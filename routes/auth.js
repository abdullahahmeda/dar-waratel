const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const csrfProtection = require('../middlewares/csrfProtection')

router.get('/me', AuthController.me)
router.post('/login', csrfProtection, AuthController.login)
router.post('/logout', csrfProtection, AuthController.logout)

module.exports = {
  path: '/',
  router,
  rootPath: true
}
