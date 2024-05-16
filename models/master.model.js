const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const masterSchema = new mongoose.Schema({
    username : {
        type :String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        //minlength : 6,
        trim : true
    },
    passwordInfo : {
        type : String,
        required : true
    },
    adminStatus : {
        type : Boolean,
        default : false
    },
    ranks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Rank"
    }]
}, {timestamps : true})

// Parolni hashlash
masterSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { // Faqatgina "password" maydoni o'zgartirilganda
        return next();
    }
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Parolni solishtirish
masterSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// JWT belgisini olish
masterSchema.methods.jwtToken = function() {
    return jwt.sign({id: this._id, name: this.name}, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};


module.exports = mongoose.model("Master", masterSchema)
