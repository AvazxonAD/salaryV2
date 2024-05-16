const express = require('express')
const connectDB = require("./config/db")
const errorHandler = require('./middleware/errorHandler')
const colors = require('colors')


const dotenv = require('dotenv')
dotenv.config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

const PORT = process.env.PORT || 3000

connectDB()

app.use('/auth', require('./router/auth.router'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server run on port : ${PORT}`.blue)
})
