const { User, Token } = require('@models/index.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { updateTokens } = require('@helpers/authHelpers.js')

/**
 * POST /api/auth/registration
 * POST /api/auth/login
 * POST /api/auth/refresh
 */

class AuthController {

    // регистрация
    async registration(req, res) {

        const { name, email, password, confirmPassword } = req.body

        if (!name) return res.status(400).json({ message: 'Укажите имя пользователя' })
        if (!email) return res.status(400).json({ message: 'Введите email'})
        if (!password) return res.status(400).json({ message: 'Введите пароль' })
        if (password !== confirmPassword) return res.status(400).json({ message: 'Пароли не совпадают' })

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return res.status(400).json({ message: `Пользователь с email: ${email} уже существует` })
        }

        // хешируем пароль с солью 4(4 круга зашифровки)
        const hashPassword = await bcrypt.hash(password, 4)

        // создаем нового пользователя
        const user = await User.create({ name, email, password: hashPassword })

        // генерим ему токены
        // const newTokens = await updateTokens(user.id)

        // после регистрации отдаем токены на клиент
        return res.status(201).json({ message: "Пользователь успешно зарегистрирован" }) 
        // return res.status(201).json({ 
        //     tokens: newTokens, 
        //     email: user.email, 
        //     name: user.name, 
        //     message: "Пользователь успешно зарегистрирован" 
        // }) 
    }


    // вход
    async login(req, res) {   

        const { email, password } = req.body

        if (!email) return res.status(400).json({ message: 'Введите email' })
        if (!password) return res.status(400).json({ message: 'Введите пароль' })

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: 'Пользователь с таким email отсутствует' })

        const comparePussword = await bcrypt.compareSync(password, user.password) // сравниваем 2 пароля

        if (!comparePussword) return res.status(400).json({ message: 'Пароль введен не верно' })

        // генерим ему токены
        const newTokens = await updateTokens(user.id)

        // отправляем куки клиенту
        // при повторном запросе проверяем на валидность
        return res
            .status(200)
            .cookie('tokens', newTokens, {
                httpOnly: true,
                secure: false, // true - запрос должен приходить на сервер только по защищённому каналу (https)
                sameSite: 'Strict', // None - куки передаются во всех запросах, Lax - более безопасный метод, 
                expire: process.env.TOKEN_REFRESH_EXPIRE,
            })
            .json({
                message: 'Вход выполнен',
                isAuthenticated: true
            })
            

        // после регистрации отдаем токены на клиент
        return res.status(201).json({ 
            message: 'Вход выполнен',
            access_token: newTokens.access_token
        })
    }


    // Рефреш токен
    async refresh(req, res) {

        const { refreshToken } = req.cookies.refresh_token
        let decodedJwt;
        try {
            // расшифровка
            decodedJwt = jwt.verify(refreshToken, process.env.SECRET_KEY)

            if (decodedJwt.type !== 'refresh') return res.status(400).json({ message: 'Тип токена отличается от \'refresh\'' })

            //  если tokenId в базе не совпадает с tokenId принятого рефреш токена. . .
            const tokenFromDB = await Token.findOne({ where: { tokenId: decodedJwt.id } })

            if (!tokenFromDB) return res.status(400).json({ message: 'Невалидный Refresh токен!' })

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ message: 'Время жизни Refresh токена истекло' })
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({ message: 'Невалидный Refresh токен!' })
            }
        }
        const token = await Token.findOne({ tokenId: decodedJwt.id })

        if (!token) return res.status(404).json({ message: 'Refresh токен отсутствует в базе' })

        const newTokens = await updateTokens(token.userId)

        if (!newTokens) return res.status(404).json({ message: 'Ошибка генерации токенов' })

        return res.status(200).json({ 
            message: 'Новая пара токенов получена',
            tokens: newTokens,
        })
    }
}

// экспортируем новый экземпляр класса
module.exports = new AuthController();