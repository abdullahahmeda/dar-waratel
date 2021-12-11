const router = require('express').Router()
const StudentsController = require('../controllers/StudentsController')
const requireAuth = require('../middlewares/requireAuth')
const csrfProtection = require('../middlewares/csrfProtection')

router.use(requireAuth)

router.get('/', StudentsController.all)
router.get('/:id', StudentsController.get)
router.post('/', csrfProtection, StudentsController.create)
router.delete('/:id', csrfProtection, StudentsController.destroy)

module.exports = {
  path: '/students',
  router
}
