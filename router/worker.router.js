const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {createWorker, getAllWorker, deleteWorker, updateWorker} = require('../controller/worker.controller')


router.get("/get", protect, getAllWorker)
router.post("/create", protect, createWorker)
router.delete("/delete/:id", protect, deleteWorker)
router.put("/update/:id", protect, updateWorker)

module.exports = router