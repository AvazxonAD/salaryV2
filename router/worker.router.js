const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {createWorker, getAllWorker, deleteWorker} = require('../controller/worker.controller')


router.get("/get", protect, getAllWorker)
router.post("/create", protect, createWorker)
router.delete("/delete/:id", protect, deleteWorker)


module.exports = router