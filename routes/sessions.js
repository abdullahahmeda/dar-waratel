const router = require('express').Router()
const SessionsController = require('../controllers/SessionsController')
const csrfProtection = require('../middlewares/csrfProtection')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', SessionsController.all)
router.get('/:id', SessionsController.get)
router.post('/', csrfProtection, SessionsController.create)
router.delete('/:id', csrfProtection, SessionsController.destroy)

module.exports = {
  path: '/sessions',
  router
}
