const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Master = require('../models/master.model')
const Position = require('../models/position.model')
const Minimum = require('../models/minimum')

// create position 
exports.createPosition = asyncHandler(async (req, res, next) => {
    const {positions} = req.body
    if(!positions || positions.length < 1){
        return next(new ErrorResponse('Sorovlar bosh qolmasligi kerak', 403))
    }
    const minimum = await Minimum.findOne()
    let result = []
    for(let position of positions){
        if(!position.name || !position.percent){
            return next(new ErrorResponse("Sorovlar bosh qolmasligi kerak", 403))
        }
        const test = await Position.findOne({name : position.name, parent : req.user.id})
        if(test){
            return next(new ErrorResponse('Siz bu lavozimni oldin kiritgansiz', 403))
        }
    }
    for(let position of positions){
        const newPosition = await Position.create({
            name : position.name,
            percent : position.percent,
            salary : position.percent * minimum.summa,
            parent : req.user.id
        })
        await Master.findByIdAndUpdate(req.user.id, {$push : {positions : newPosition._id}}, {new : true})
        result.push(newPosition)
    }
    return res.status(200).json({success : true, data : result})
})

