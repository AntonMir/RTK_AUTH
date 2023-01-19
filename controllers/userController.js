const { User } = require('@models/index.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * GET /api/user/profile
 * GET /api/user
 */

class UserController {

    // данные пользователя
    async getUserProfile(req, res) {   
        const { userId } = req.user
        const user = await User.findOne({ where: { id: userId } })
        if (!user) return res.status(404).json({ message: 'Ошибка получения данных пользователя' })
        return res.status(201).json({user}) 
    }

    // данные всех пользователя
    async getAll(req, res) {   
        const user = await User.findAll()
        if (!user) return res.status(404).json({ message: 'Ошибка получения данных пользователя' })
        return res.status(201).json({user}) 
    }

}

// экспортируем новый экземпляр класса
module.exports = new UserController();