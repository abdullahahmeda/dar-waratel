const router = require('express').Router()
const AdminsController = require('../controllers/AdminsController')
const requireAdmin = require('../middlewares/requireAdmin')
const csrfProtection = require('../middlewares/csrfProtection')

router.post('/', requireAdmin, csrfProtection, AdminsController.create)

module.exports = {
  path: '/admins',
  router
}
