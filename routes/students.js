const router = require('express').Router()
const StudentsController = require('../controllers/StudentsController')

router.post('/', StudentsController.create)

module.exports = {
  path: '/students',
  router
}
