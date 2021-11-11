const router = require('express').Router()
const GradesController = require('../controllers/GradesController')

router.post('/', GradesController.create)

module.exports = {
  path: '/grades',
  router
}
