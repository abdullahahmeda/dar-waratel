const router = require('express').Router()
const GuardiansController = require('../controllers/GuardiansController')

router.get('/', GuardiansController.all)
router.post('/', GuardiansController.create)

module.exports = {
  path: '/guardians',
  router
}
