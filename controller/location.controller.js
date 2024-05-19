const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Master = require('../models/master.model')
const Location = require('../models/location.model')


// create location
exports.createLocation = asyncHandler(async (req, res, next) => {
    const {locations} = req.body
    let result = []
    if(!locations || locations.length < 1){
        return next(new ErrorResponse('Sorovlar bosh qolishi mumkin emas', 403))
    }
    for(let location of locations){
        if(!location.name || !location.type){
            return next(new ErrorResponse('Sorovlar bosh qolmasligi kerak', 403))
        }
        const test = await Location.findOne({name : location.name.trim(), type : location.type.trim(), parent : req.user.id})
        if(test){
            return next(new ErrorResponse('Bu joylashuvda ushbu faoliyat avval kiritilgan', 403))
        }
    }
    for(let location of locations){
        const newLocation = await Location.create({
            name : location.name,
            type : location.type,
            parent : req.user.id
        })
        await Master.findByIdAndUpdate(req.user.id, {$push : {locations : newLocation._id}})
        result.push(newLocation)
    }
    return res.status(200).json({success : true, data : result})
})
//get all location 
exports.getAllLocation = asyncHandler(async (req, res, next) => {
    const locations = await Location.find({parent : req.user.id}).sort({name : 1})
    return res.status(200).json({success : true, data : locations})
})
// delete locations 
exports.deleteLocation = asyncHandler(async (req, res, next) => {
    const location = await Location.findByIdAndDelete(req.params.id)
    if(!location){
        return next(new ErrorResponse("Joylashuv topilmadi", 403))
    }
    const master = await Master.findByIdAndUpdate(req.user.id, {locations : req.params.id}, {$pull : {locations : req.params.id}}, {new : true})
    if(!master){
        return next(new ErrorResponse('Foydalanuvchi topilmadi', 403))
    }
    return res.status(200).json({success : true, data : "Delete"})
})