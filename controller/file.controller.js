const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Folder = require('../models/folder.model')
const File = require('../models/file.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// create new file
exports.createFile = asyncHandler(async (req, res, next) => {
    const folder = await Folder.findById(req.params.id)
    let result = []

    const {files} = req.body
    for(let file of files){
        if(!file.selectPosition || !file.selectSalary || !file.selectPercent || !file.selectLotin || !file.selectKril || !file.selectRank  || !file.selectRegion  || !file.selectType || !file.selectBudget){
            return next(new ErrorResponse("Sorovlar bosh qolmasligi kerak", 402))
        }
        const testLotin = await File.findOne({selectLotin : file.selectLotin, parent : folder._id })
        if(testLotin){
            return next(new ErrorResponse(`Bu malumotdan oldin foydalanilgan : ${testLotin.selectLotin}`))
        }    
        const testKril = await File.findOne({selectKril : file.selectKril, parent : folder._id})
        if(testKril){
            return next(new ErrorResponse(`Bu malumotdan oldin foydalanilgan : ${testKril.selectKril}`))
        }
    }
    for(let file of files){
        const newFile = await File.create({
            selectPosition : file.selectPosition,
            selectSalary : file.selectSalary,
            selectPercent : file.selectPercent, 
            selectLotin : file.selectLotin, 
            selectKril : file.selectKril,
            selectRank : file.selectRank,  
            selectSumma : file.selectSumma,  
            selectRegion : file.selectRegion,
            selectType : file.selectType,
            selectBudget : file.selectBudget,
            parentMaster : req.user.id,
            parent : folder._id
        })
        folder.files.push(file)
        result.push(file)
    }
    await folder.save()
    return res.status(200).json({success : true, data : result})
})