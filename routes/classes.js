const router = require('express').Router()
const ClassesController = require('../controllers/ClassesController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', ClassesController.all)
router.post('/', ClassesController.create)
router.delete('/:id', ClassesController.destroy)

module.exports = {
  path: '/classes',
  router
}
