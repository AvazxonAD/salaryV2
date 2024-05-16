const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Master = require('../models/master.model')
const Rank = require('../models/rank.model')

// create new rank 
exports.createRank = asyncHandler(async (req, res, next) => {
    const {ranks} = req.body
    if(!ranks || ranks.length < 1){
        return next(new ErrorResponse("Sorovlar bosh qolmasligi kerak", 403))
    }
    let result = []
    for(let rank of ranks){
        if(!rank.name || rank.summa == null){
            return next(new ErrorResponse('Sorovlar bosh qolmasligi kerak', 403))
        }
        const test = await Rank.findOne({name : rank.name.trim(), parent : req.user.id})
        if(test){
            return next(new ErrorResponse("Bu unvonni oldin kiritgansiz",403))
        }
    }
    for(let rank of ranks){
        const newRank = await Rank.create({name : rank.name, summa : rank.summa, parent : req.user.id})
        await Master.findByIdAndUpdate(req.user.id, {$push : {ranks : newRank._id}})
        result.push(newRank)
    }
    return res.status(200).json({success : true, data : result})
})
// get all rank 
exports.getAllRank =asyncHandler(async (req, res, next) => {
    const ranks = await Rank.find({parent : req.user.id}).sort({name : 1})
    return res.status(200).json({success : true, data : ranks})

})
// delete ranks
exports.deleteRank = asyncHandler(async (req, res, next) => {
    const rank = await Rank.findByIdAndDelete(req.params.id)
    if(!rank){
        return next(new ErrorResponse("Unvon topilmadi", 403))
    }
    const master = await Master.updateMany({$pull : {ranks : req.params.id}}, {new : true})
    if(master)
    return res.status(200).json({success : true, data : "Delete"})
})