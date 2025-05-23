require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')

const PORT = process.env.PORT || 5030
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.AUTH_CLIENT_URL // указываем адрес фронтенда с которым будем обмениваться
}));
app.use('/api', router)
app.use(errorMiddleware) // MW обязательно должен идти последним

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`server started at port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()