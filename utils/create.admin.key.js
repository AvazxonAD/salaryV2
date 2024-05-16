const AdminStatus = require('../models/admin.status')
async function generateAdminKey() {
    const adminKey = await AdminStatus.findOne()
    if(!adminKey){
        await AdminStatus.create({password : process.env.Admin_KEY})
        return;
    }
    return;
}

module.exports = generateAdminKey