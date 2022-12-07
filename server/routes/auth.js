const Router = require('express')
const router = new Router()
const authController = require('@controllers/authController.js')
const checkRefreshToken = require('@middleware/checkRefreshToken.js')

// Регистрация
router.post('/registration', authController.registration)
// вход
router.post('/login', authController.login)
// проверка JWT и отправка нового
router.post('/refresh', checkRefreshToken, authController.refresh)

module.exports = router