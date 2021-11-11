const errors = require('./errors.json')

module.exports = function httpError (code, others = {}) {
  if (!errors[code]) throw Error(`errors.json file does not have response for ${code}`)
  return {
    ok: false,
    error: {
      code,
      ...errors[code],
      ...others
    }
  }
}
