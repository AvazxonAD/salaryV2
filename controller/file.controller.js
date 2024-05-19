const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Folder = require('../models/folder.model')
const File = require('../models/file.model')

// create new file
exports.createFile = asyncHandler(async (req, res, next) => {
    const folder = await Folder.findById(req.params.id)
    const {files} = req.body
    for(let file of files){
        if(!file.selectPosition || !file.selectSalary || !file.selectPercent || !file.selectLotin || !file.selectKril || !file.selectRank  || !file.selectSumma  || !file.selectRegion  || !file.selectType || !file.budget){
            return next(new ErrorResponse("Sorovlar bosh qolmasligi kerak", 402))
        }
        const testLotin = await File.findOne({selectLotin, parent : folder._id })
        if(testLotin){
            return next(new ErrorResponse(`Bu malumotdan oldin foydalanilgan : ${testLotin}`))
        }    
        const testKril = await File.findOne({selectKril, parent : folder._id})
        if(testKril){
            return next(new ErrorResponse(`Bu malumotdan oldin foydalanilgan : ${testKril}`))
        }
        const testInn = await File.findOne({inn, parent : folder._id})
        if(testInn){
            return next(new ErrorResponse(`Bu malumotdan oldin foydalanilgan : ${testInn}`))
        }
    }


})