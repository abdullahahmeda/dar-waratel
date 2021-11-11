const path = require('path')

const paths = {
  database_ssl: path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem')
}

const userRoles = ['admin', 'guardian']
const gradeTypes = ['حفظ', 'مراجعة']

const settings = {
  bcrypt_salt_rounds: 10,
  cookie_max_age: 1000 * 60 * 60 * 24,
  routes_prefix: '/api'
}

exports.paths = paths
exports.userRoles = userRoles
exports.gradeTypes = gradeTypes
exports.settings = settings
