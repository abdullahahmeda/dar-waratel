const router = require('express').Router()
const ClassesController = require('../controllers/ClassesController')

router.post('/', ClassesController.create)

module.exports = {
  path: '/classes',
  router
}
