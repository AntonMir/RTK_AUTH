const Router = require('express')
const router = new Router()
const auth = require('@routes/auth.js')
const user = require('@routes/user.js')


router.use('/auth', auth)
router.use('/user', user)

module.exports = router