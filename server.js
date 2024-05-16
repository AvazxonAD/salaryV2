const express = require('express')
const connectDB = require("./config/db")
const errorHandler = require('./middleware/errorHandler')
const colors = require('colors')
const adminKey = require('./utils/create.admin.key')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())

const PORT = process.env.PORT || 3000

connectDB()
adminKey()

app.use('/auth', require('./router/auth.router'))
app.use("/rank", require("./router/rank.router"))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server run on port : ${PORT}`.blue)
})
