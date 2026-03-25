const dashboradRoutes = require('./dashboard.route')
const productRoutes = require('./product.route')
const systemConfig = require('../../config/system')
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixadmin;
    
    app.use(PATH_ADMIN + '/dashboard', dashboradRoutes)
    app.use(PATH_ADMIN + '/products', productRoutes)

}