const escape = require('escape-html')

const initialOptions = {
  methods: ['POST', 'PUT', 'PATCH'],
  deep: false
}

module.exports = function escapeBody (options) {
  options = { ...initialOptions, ...options }
  return function (req, res, next) {
    if (options.methods.includes(req.method)) req.body = _escapeBody(req.body, options.deep, true)
    next()
  }
}

function _escapeBody (body, deep, firstTime = false) {
  if (typeof body === 'string') return escape(body, deep)
  if (deep || firstTime) {
    let newBody
    if (Array.isArray(body)) {
      newBody = []
      for (const value of body) {
        newBody.push(_escapeBody(value, deep))
      }
    } else if (typeof body === 'object') {
      newBody = {}
      for (const [key, value] of Object.entries(body)) {
        newBody[key] = _escapeBody(value, deep)
      }
    }
    return newBody
  }
  return body
}
