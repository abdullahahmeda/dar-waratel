const authRoutes = require('./auth')
const guardiansRoutes = require('./guardians')
const studentsRoutes = require('./students')
const classesRoutes = require('./classes')
const sessionsRoutes = require('./sessions')
const adminsRoutes = require('./admins')
const gradesRoutes = require('./grades')
const otherRoutes = require('./other')

module.exports = [
  authRoutes,
  guardiansRoutes,
  studentsRoutes,
  classesRoutes,
  sessionsRoutes,
  adminsRoutes,
  gradesRoutes,
  otherRoutes
]
