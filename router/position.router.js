const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {createPosition} = require('../controller/position.controller')

router.post('/create', protect, createPosition)

module.exports = router
