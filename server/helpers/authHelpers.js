const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const { Token } = require('@models/index.js')



function generateAccessToken(userId) {
    const payload = {
        userId,
        type: 'access'
    }
    const secret = process.env.SECRET_KEY
    const expires = { expiresIn: process.env.TOKEN_ACCESS_EXPIRE }

    return jwt.sign(payload, secret, expires)
}

function generateRefreshToken() {
    const payload = {
        id: uuidv4(),
        type: 'refresh'
    }
    const secret = process.env.SECRET_KEY
    const expires = { expiresIn: process.env.TOKEN_REFRESH_EXPIRE }

    // return {
    //     id: payload.id,
    //     token: jwt.sign(payload, secret, expires)
    // }
    return jwt.sign(payload, secret, expires)
}

const replaceDbRefreshToken = (tokenId, userId) =>
    Token.destroy({ where: { userId } })
        .then(() => Token.create({ tokenId, userId }))


const updateTokens = (userId) => {
    const access_token = generateAccessToken(userId)
    const refresh_token = generateRefreshToken()

    return replaceDbRefreshToken(refresh_token.id, userId)
        .then(() => ({
            access_token,
            refresh_token
        }))
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
    updateTokens
}