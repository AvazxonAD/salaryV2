const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {register, login, userOpen, updatePassword, statusAdmin} = require('../controller/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/open',protect, userOpen)
router.put('/update',protect, updatePassword)
router.put("/admin",protect, statusAdmin)


module.exports = router
