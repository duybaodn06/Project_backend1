const ProductRouter = require("./products.route.js")
const HomeRouter = require("./home.route.js")

module.exports = (app) => {
    app.use('/', HomeRouter)
    app.use('/products',ProductRouter)
}