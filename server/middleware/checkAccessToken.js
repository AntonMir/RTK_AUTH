
const jwt = require('jsonwebtoken')

/**
 * 1. decoded JWT - access token
 * 2. check validate token
 * 3. get user data from token
 * 4. put user data to req.user
 * 5. next()
 */
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        // Если параметр запроса отличается от GET, POST, PUT, DELETE, то возвращаем ошибку
        return res.status(400).json({
            message: 'Метод запроса отилчается от доступного. Доступные метода: GET, POST, PUT, DELETE'
        })
    }

    try {

        const access_token = req.cookies.tokens.access_token // берем тело токена из cookies
        // const accessToken = req.headers.authorization.split(" ")[1] // старый запрос из header
        
        if (!access_token) {
            // если токена нет, отдаем ошибку
            return res.status(401).json({ message: 'Не авторизован' })
        }

        // Если токен есть, надо расшифровать
        const payload = jwt.verify(access_token, process.env.SECRET_KEY)

        // payload - оъект с данными пользователя: email, id, role
        // эти данные полуили из JWT
        // функцией next() передаем их в следующую мидлвару
        req.user = payload
        next()

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Время жизни Access токена истекло' })
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Невалидный Access токен!' })
        }
        return res.status(401).json({ message: 'Не авторизован' })
    }
}