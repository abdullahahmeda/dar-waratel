const router = require('express').Router()
const csrfProtection = require('../middlewares/csrfProtection')
const GradesController = require('../controllers/GradesController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.post('/', csrfProtection, GradesController.create)
router.get('/:sessionId/:studentId', GradesController.get)

module.exports = {
  path: '/grades',
  router
}
