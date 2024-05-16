const jwt = require('jsonwebtoken')
const asyncHandler = require('../middleware/async.js')
const ErrorResponse = require('../utils/errorResponse')

// authorization 
exports.protect = asyncHandler(async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new ErrorResponse('Siz tizimga kirmagansiz', 403))
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

    req.user = decoded
    if(!req.user){
        return next(new ErrorResponse("Siz tizimga kirmagansiz", 403))
    }
    next()
})