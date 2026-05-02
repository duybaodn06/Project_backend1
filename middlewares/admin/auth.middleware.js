const systemConfig = require('../../config/system')
const roles = require('../../models/roles.model')
const accounts = require('../../models/accounts.model')
module.exports.requireAuth = async (req,res,next) => {
    if (!req.cookies.token){
        res.redirect(`${systemConfig.prefixadmin}/auth/login`)
    } else {
        const user = await accounts.findOne({ token: req.cookies.token }).select('-password')
        if (!user){
            res.redirect(`${systemConfig.prefixadmin}/auth/login`)
        } else {
            const role = await roles.findOne({
                _id: user.role_id
            }).select('title permissions')
            res.locals.role = role 
            res.locals.user = user
            next()
        }
        
    }
    
}