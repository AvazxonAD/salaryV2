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
    const parent = await  Master.findById(req.user.id)
    if(!parent){
        return next(new ErrorResponse('Server xatolik', 403))
    }
    for(let rank of ranks){
        if(!rank.name || rank.summa == null){
            return next(new ErrorResponse('Sorovlar bosh qolmasligi kerak', 403))
        }
        const test = await Rank.findOne({name : rank.name.trim(), parent : req.user.id})
        if(test){
            return next(new ErrorResponse("Bu unvonni oldin kiritgansiz",403))
        }
        const newRank = await Rank.create({name : rank.name, summa : rank.summa, parent : req.user.id})
        parent.ranks.push(newRank._id)
        await parent.save()
        result.push(newRank)
    }
    return res.status(200).json({success : true, data : result})
})
// get all rank 
exports.getAllRank =asyncHandler(async (req, res, next) => {
    const ranks = await Rank.find({parent : req.user.id})
    return res.status(200).json({success : true, data : ranks})

})
// delete ranks
exports.deleteRank = asyncHandler(async (req, res, next) => {
    await Rank.findByIdAndDelete(req.params.id)
    await Master.updateMany({$pull : {ranks : req.params.id}})
    return res.status(200).json({success : true, data : "Delete"})
})