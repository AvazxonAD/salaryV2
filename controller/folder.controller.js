const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Folder = require('../models/folder.model')
const Master = require('../models/master.model')

//create new folder 
exports.createFolder = asyncHandler(async (req, res, next) => {
    parent = null 
    const {name} = req.body
    const folder = await Folder.findById(req.params.id)
    parent = folder 
    if(!parent){
        const master = await  Master.findById(req.params.id)
        parent = master
        if(!parent){
            return next(new ErrorResponse("Server xatolik", 403))
        }
    }
    const newFolder = await Folder.create({name, parent : parent._id})
    parent.folders.push(newFolder._id)
    await parent.save()
    return res.status(200).json({ success : true, data : newFolder})
})
// get folder open 
exports.getOpenFolder = asyncHandler(async (req, res, next) => {
    const parent = await Folder.findById(req.params.id)
    const folders = await Folder.find({_id : {$in : parent.folders}})
    return res.status(200).json({success : true, data : folders})
})



