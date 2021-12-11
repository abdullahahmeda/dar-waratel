const router = require('express').Router()
const GuardiansController = require('../controllers/GuardiansController')
const requireAuth = require('../middlewares/requireAuth')
const csrfProtection = require('../middlewares/csrfProtection')

router.use(requireAuth)

router.get('/', GuardiansController.all)
router.post('/', csrfProtection, GuardiansController.create)

module.exports = {
  path: '/guardians',
  router
}
