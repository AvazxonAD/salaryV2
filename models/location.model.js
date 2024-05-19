const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    type : {
        type : String,
        required : true,
        trim : true
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Master"
    },
    date : {
        type : String,
        required : true
    }
}, {timestamps : true})


module.exports = mongoose.model("Location", locationSchema)