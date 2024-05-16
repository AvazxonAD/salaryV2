const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminKeySchema = new mongoose.Schema({
    password : {
        type : String,
    }
})

// Parolni hashlash
adminKeySchema.pre('save', async function(next) {
    if (!this.isModified('password')) { // Faqatgina "password" maydoni o'zgartirilganda
        return next();
    }
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Parolni solishtirish
adminKeySchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('Admin_Key', adminKeySchema)