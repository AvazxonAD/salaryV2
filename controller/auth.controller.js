const asyncHandler = require('../middleware/async.js')
const ErrorResponse = require('../utils/errorResponse.js')
const Master = require('../models/master.model.js')
const AdminKey = require('../models/admin.status.js')
const Folder = require('../models/folder.model.js')

//register 
exports.register = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        return next(new ErrorResponse('Sorovlar bosh qolishi mumkin emas', 403))
    }
    const test = await Master.findOne({username : username.trim()})
    if(test){
        return next(new ErrorResponse(`Bu nomga ega foydalanuvchi bor iltimos boshqa nomdan foydalaning : ${username}`,403 ))
    }
    //if(password.length < 6){
    //    return next(new ErrorResponse('Password belgilari 6 tadan kam bolmasligi kerak'))
    //}
    const newUser = await Master.create({username, password, passwordInfo : password})
    return res.status(200).json({success : true, data : newUser})
})
// login 
exports.login = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        return next(new ErrorResponse("Sorovlar bosh qolmasligi kerak", 403))
    }
    const user = await Master.findOne({username : username.trim()})
    if(!user){
        return next(new ErrorResponse('Username yoki password hato kiritildi', 403))
    }
    if(user){
        const match = await user.matchPassword(password)
        if(!match){
            return next(new ErrorResponse('Username yoki password hato kiritildi', 403))
        }
    }
    const token = user.jwtToken()
    return res.status(200).json({success : true, data : user, token})
})
// get user open 
exports.userOpen = asyncHandler(async (req, res, next) => {
    let userAdmin
    const user = await Master.findById(req.user.id).select("username passwordInfo adminStatus")
    const folders = await Folder.find({parent : user._id}).sort({name : 1})
    if(user.adminStatus){
        const users = await Master.find({adminStatus : false}).select("username passwordInfo").sort({name : 1})
        return res.status(200).json({success : true, admin : user, users, folders})
    }
    if(!user){
        return next(new ErrorResponse("Server xatolik", 403))
    }
    return res.status(200).json({success : true, data : user, folders})
}) 
// // update password 
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await Master.findById(req.user.id)
    if(!user){
        return next(new ErrorResponse("server xatolik", 500))
    }
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        return next(new ErrorResponse('Sorovlar bosh qolmasligi kerak', 403))
    }
    const match = await user.matchPassword(oldPassword)
    if(!match){
        return next(new ErrorResponse('Password xato kiritildi', 403))
    }
    // if(newPassword.length < 6 ){
    //     return next(new ErrorResponse('Yangi password belgilar soni 6 tadan kam bolmasligi kerak',403))
    // }
    user.passwordInfo = newPassword
    user.password = newPassword
    await user.save()
    return res.status(200).json({success : true, data : user})
})
// status admin 
exports.statusAdmin = asyncHandler(async (req, res, next) => {
    const adminKey = await AdminKey.findOne()
    const {keyPassword} = req.body
    const match = await adminKey.matchPassword(keyPassword.trim())
    if(!match){
        return next(new ErrorResponse('Siz admin parolini notog\'ri kiritdinggiz', 403))
    }
    const master = await Master.findById(req.user.id)
    if(master.adminStatus){
        return next(new ErrorResponse("Siz allaqachon admin bolgansiz", 403))
    }
    master.adminStatus = true
    await master.save()
    const token = master.jwtToken()

    return res.status(200).json({success : true, message : "Siz muvaffiqyatli admin boldinggiz", token})
})
