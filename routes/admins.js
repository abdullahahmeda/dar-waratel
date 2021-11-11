const router = require('express').Router()
const AdminsController = require('../controllers/AdminsController')

router.post('/', AdminsController.create)

module.exports = {
  path: '/admins',
  router
}
