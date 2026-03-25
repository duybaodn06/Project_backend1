require("dotenv").config();
const express = require('express')
const route = require('./routes/client/index.route.js')
const routeAdmin = require('./routes/admin/index.route.js')
const app = express()
const DatabaseConnect = require('./config/database.js')
const systemConfig = require('./config/system.js')

DatabaseConnect.connect();

const port = process.env.PORT


//app local variables
app.locals.prefixadmin = systemConfig.prefixadmin


app.set('views', 'views')
app.set('views engine', 'pug')
app.use(express.static('public'))

route(app)
routeAdmin(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})