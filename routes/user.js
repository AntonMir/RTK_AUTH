const Router = require('express')
const router = new Router()
const userController = require('@controllers/userController.js')
const checkAccessToken = require('@middleware/checkAccessToken.js')

// Данные пользователя
router.get('/profile', checkAccessToken,  userController.getUserProfile)
router.get('/',checkAccessToken, userController.getAll)

module.exports = router