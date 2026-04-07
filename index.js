require("dotenv").config();
const express = require('express')
const route = require('./routes/client/index.route.js')
const routeAdmin = require('./routes/admin/index.route.js')
const app = express()
const DatabaseConnect = require('./config/database.js')
const systemConfig = require('./config/system.js')
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')

// npm install cookie-parser express-session
const cookieParser = require('cookie-parser');
const session = require('express-session');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());



app.use(methodOverride('_method'))
DatabaseConnect.connect();

const port = process.env.PORT


//app local variables
app.locals.prefixadmin = systemConfig.prefixadmin

//add __dirname
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`))

route(app)
routeAdmin(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
module.exports = app;