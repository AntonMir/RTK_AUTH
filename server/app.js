require('dotenv').config()
require('module-alias/register')
const express = require('express')
const sequelize = require('@root/db.js')
const models = require('@models/index.js')
const cors = require('cors')
const routes = require('@routes/index.js')
const logger = require('@utils/customLogger.js')
const cookieParser = require('cookie-parser')

const app = express()

const PORT = process.env.PORT || 5000


// app.use(cors())

app.use(cors({
    origin: [
        'http://localhost:3000', 
        "http://127.0.0.1:3000",
        'http://192.168.1.4:3000',
        'http://192.168.0.6:3000'
    ],
    credentials: true,
    optionsSuccessStatus: 200
}));


app.use(cookieParser(process.env.COOKIE_SECRET_KEY))

app.use(express.json())

app.use('/', logger)

app.use('/api', routes)



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log('!!!', 'Error:', error.message);
    }
}

start() // запуск сервера с подключением