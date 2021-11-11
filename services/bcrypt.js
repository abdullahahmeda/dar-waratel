const { settings } = require('../constants')
const bcrypt = require('bcryptjs')
const { promisify } = require('util')

const _asyncGenSalt = promisify(bcrypt.genSalt)
const _asyncHash = promisify(bcrypt.hash)
const _asyncCompare = promisify(bcrypt.compare)

async function hash (s) {
  const salt = await _asyncGenSalt(settings.bcrypt_salt_rounds)
  const hash = _asyncHash(s, salt)
  return hash
}

function compare (s, hash) {
  return _asyncCompare(s, hash)
}

exports.hash = hash
exports.compare = compare
