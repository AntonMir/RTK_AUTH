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

        if (!name) return res.status(400).json({ message: 'Укажите имя пользователя', data: null })
        if (!email) return res.status(400).json({ message: 'Введите email', data: null })
        if (!password) return res.status(400).json({ message: 'Введите пароль', data: null })
        if (password !== confirmPassword) return res.status(400).json({ message: 'Пароли не совпадают', data: null })

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return res.status(400).json({ message: `Пользователь с email: ${email} уже существует`, data: null })
        }

        // хешируем пароль с солью 4(4 круга зашифровки)
        const hashPassword = await bcrypt.hash(password, 4)

        // создаем нового пользователя
        const user = await User.create({ name, email, password: hashPassword, role: 'USER' })

        if(!user) return res.status(500).json({ message: 'Внутренняя ошибка сервера', data: null })

        // после регистрации отдаем токены на клиент
        return res.status(201).json({ message: 'Пользователь успешно зарегистрирован', data: null }) 
    }


    // вход
    async login(req, res) {   

        const { email, password } = req.body

        if (!email) return res.status(400).json({ message: 'Введите email', data: null })
        if (!password) return res.status(400).json({ message: 'Введите пароль', data: null })

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: 'Пользователь с таким email отсутствует', data: null })

        const comparePussword = await bcrypt.compareSync(password, user.password) // сравниваем 2 пароля

        if (!comparePussword) return res.status(400).json({ message: 'Пароль введен не верно', data: null })

        // генерим ему токены
        const newTokens = await updateTokens(user.id)

        // не смоги сгенерить токен, отдаем ошибку
        if (!newTokens) return res.status(400).json({ message: 'Ошибка генерации токена', data: null })
        
        // ОК возвращаем токены и тело ответа
        return res
            .status(200)
            .cookie('tokens', newTokens, {
                httpOnly: true,
                secure: false, // true - запрос должен приходить на сервер только по защищённому каналу (https)
                sameSite: 'Strict', // режим настройки: для каких сайтов отдам куки 
                expire: process.env.TOKEN_REFRESH_EXPIRE,
            })
            .json({
                message: 'Вход выполнен',
                data: { 
                    isAuthenticated: true,
                    role: user.role
                }
            })
    }


    // выход
    async logout(req, res) {   

        const tokens = req.cookies.tokens
        
        if(tokens) {

            const { access_token } = tokens

            const access_payload = jwt.decode(access_token, process.env.SECRET_KEY)
            
            const { userId } = access_payload
                            
            // удалим старые токены из базы
            await Token.destroy({ where: { userId } })
        }         

        // ОК удаляем токены и тело ответа
        return res.status(200).clearCookie('tokens').json({ 
            message: 'Успех', 
            data: { isAuthenticated: false } 
        })
    }


    // Рефреш токен
    async refresh(req, res) {

        const { access_token, refresh_token } = req.cookies.tokens

        const access_payload = jwt.decode(access_token, process.env.SECRET_KEY)
        const refresh_payload = jwt.decode(refresh_token, process.env.SECRET_KEY)

        //  если tokenId в базе не совпадает с tokenId принятого рефреш токена. . .
        const refreshTokenFromDB = await Token.findOne({ where: { tokenId: refresh_payload.id } })

        if (!refreshTokenFromDB) return res.status(400).json({ message: 'Refresh токен отсутствует в базе', data: null })

         // генерим ему токены
        const newTokens = await updateTokens(access_payload.userId)

        // не смоги сгенерить токен, отдаем ошибку
        if (!newTokens) return res.status(400).json({ message: 'Ошибка генерации токена', data: null })
        
        // ОК возвращаем токены и тело ответа
        return res
            .status(200)
            .cookie('tokens', newTokens, {
                httpOnly: true,
                secure: false, // true - запрос должен приходить на сервер только по защищённому каналу (https)
                sameSite: 'Strict', // режим настройки: для каких сайтов отдам куки 
                expire: process.env.TOKEN_REFRESH_EXPIRE,
            })
            .json({ 
                message: 'Успех', 
                data: { isAuthenticated: true } 
            })
    }
}

// экспортируем новый экземпляр класса
module.exports = new AuthController();