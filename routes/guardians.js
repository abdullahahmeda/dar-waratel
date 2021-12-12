const router = require('express').Router()
const GuardiansController = require('../controllers/GuardiansController')
const requireAuth = require('../middlewares/requireAuth')
const csrfProtection = require('../middlewares/csrfProtection')

router.use(requireAuth)

router.get('/', GuardiansController.all)
router.post('/', csrfProtection, GuardiansController.create)
router.delete('/:id', csrfProtection, GuardiansController.destroy)

module.exports = {
  path: '/guardians',
  router
}
