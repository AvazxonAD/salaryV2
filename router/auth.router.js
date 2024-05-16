const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {register, login, userOpen, updatePassword} = require('../controller/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/open/:id', userOpen)
router.put('/update/:id', updatePassword)

module.exports = router
