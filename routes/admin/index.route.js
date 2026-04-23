const dashboradRoutes = require('./dashboard.route')
const productRoutes = require('./product.route')
const productCategoryRoutes = require('./product-category.route')
const roleRoutes = require('./role.route')
const systemConfig = require('../../config/system')
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixadmin;
    
    app.use(PATH_ADMIN + '/dashboard', dashboradRoutes)
    app.use(PATH_ADMIN + '/products', productRoutes)
    app.use(PATH_ADMIN + '/products-category',productCategoryRoutes)
    app.use(PATH_ADMIN + '/roles',roleRoutes)
}