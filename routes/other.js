const router = require('express').Router()
const { settings } = require('../constants')
const csrfProtection = require('../middlewares/csrfProtection')

router.get('/csrf', csrfProtection, (req, res) => {
  return res
    .cookie('XSRF-TOKEN', req.csrfToken(), { maxAge: settings.cookie_max_age })
    .json({
      ok: true,
      csrf: 'CSRF token has been issued.'
    })
})

module.exports = {
  path: '/',
  router,
  rootPath: true
}
