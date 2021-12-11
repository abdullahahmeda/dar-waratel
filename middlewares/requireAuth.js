module.exports = function requireAuth (req, res, next) {
  if (req.session.user) next()
  else res.status(403).json({
    ok: false,
    error: {
      message: 'You are not allowed to process this request.'
    }
  })
}
