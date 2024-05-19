const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Folder = require('../models/folder.model')
const File = require('../models/file.model')

// create new file
exports.createFile = asyncHandler(async (req, res, next) => {
    const {
        selectPosition, 
        selectSalary,
        selectPercent,
        selectLotin,
        selectKril,
        selectRank,
        selectSumma, 
        selectRegion,
        selectType,
        budget,
    } = req.body
    if(!selectPosition || !selectSalary || !selectPercent || !selectLotin || !selectKril || !selectRank  || !selectSumma  || !selectRegion  || !selectType || !budget){
        return next(new ErrorResponse("Sorovlar bosh qolmasligi kerak", 402))
    }
    
})