const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Folder"
    },
    parentHead : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Master"
    }
})