const express = require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

//create express object
const app = express();

//prepare constants
const oneDay = 1000 * 60 * 60 * 24;
//env variables 
const {
  PORT = 4000,
  SESSION_LIFETIME = oneDay,
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'thisismysecrctekeyfhrgfgrfrty84fwir767'
} = process.env

//session middleware
app.use(sessions({
  name:SESSION_NAME,
  secret: SESSION_SECRET,
  saveUninitialized:false,
  cookie: { maxAge: SESSION_LIFETIME },
  resave: false
}));


// parse application/x-www-form-urlencoded
app.use(express.urlencoded())
// parse application/json
app.use(express.json())
// cookie parser middleware
app.use(cookieParser());
//serving public file
app.use(express.static(__dirname + '/public'));

//application core routes
require('./app_auth_routes')(app);
require('./app_consumers')(app);
require('./app_geolocations')(app);
require('./app_users')(app);
require('./app_vendors')(app);
require('./app_lookups')(app);

//testing routes for session
require('./app_auth_test_routes')(app);


//start server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })