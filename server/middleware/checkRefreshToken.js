
const jwt = require('jsonwebtoken')

/**
 * 1. decoded JWT - refresh token
 * 2. check validate token
 * 3. next()
 */
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        // Если параметр запроса отличается от GET, POST, PUT, DELETE, то возвращаем ошибку
        return res.status(400).json({
            message: 'Метод запроса отилчается от доступного. Доступные метода: GET, POST, PUT, DELETE'
        })
    }

    try {

        const refresh_token = req.cookies.tokens.refresh_token // берем тело токена из cookies

        if (!refresh_token) {
            // если токена нет, отдаем ошибку
            return res.status(401).json({ message: 'Не валидный Refresh токен' })
        }

        // Если токен есть, надо расшифровать
        jwt.verify(refresh_token, process.env.SECRET_KEY)
        next()

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Время жизни Refresh токена истекло' })
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Невалидный Refresh токен!' })
        }
        return res.status(401).json({ message: 'Не авторизован' })
    }
}