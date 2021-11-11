const router = require('express').Router()
const SessionsController = require('../controllers/SessionsController')

router.post('/', SessionsController.create)

module.exports = {
  path: '/sessions',
  router
}
