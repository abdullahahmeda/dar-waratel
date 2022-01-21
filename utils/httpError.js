const errors = require('../httpErrors.json')

module.exports = function httpError (code, others = {}) {
  if (!errors[code])
    throw Error(`httpErrors.json file does not have response for ${code}`)
  return {
    ok: false,
    error: {
      code,
      ...errors[code],
      ...others
    }
  }
}
