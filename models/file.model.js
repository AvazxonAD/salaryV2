const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
    selectPosition : {
        type : String,
        required : true,
        trim : true
    },
    selectSalary : {
        type : Number,
        required : true
    },
    selectPercent : {
        type : Number,
        required : true
    },
    selectLotin : {
        type : String,
        required : true,
        trim : true
    },
    selectKril : {
        type : String,
        required : true, 
        trim : true
    },
    selectRank : {
        type : String,
        required : true, 
        trim : true
    },
    selectSumma : {
        type : Number,
        required : true
    },
    selectRegion : {
        type : String,
        required : true,
        trim : true
    },
    selectType : {
        type : String,
        required : true,
        trim : true
    },
    budget : {
        type : String,
        required : true,
        trim : true
    }
})