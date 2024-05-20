const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {createFile} = require('../controller/file.controller')

router.post("/create/:id", protect, createFile)


module.exports = router

