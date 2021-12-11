module.exports = function requireAdmin (req, res, next) {
  if (req.session.user && req.session.user.type === 'admin') next()
  else res.status(403).json({
    ok: false,
    error: {
      message: 'You are not allowed to process this request.'
    }
  })
}
