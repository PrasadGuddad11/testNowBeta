const jwt = require('jsonwebtoken');
var admin = require("firebase-admin");

var serviceAccount = require("./fir-js-8156e-firebase-adminsdk-cfpqn-13d7f1c7d7.json");
var apiKey='AIzaSyDGfP5jPSgWZEGVlWBm9Q0m6Y71oC6xra4';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-js-8156e-default-rtdb.firebaseio.com"
});
module.exports.getAuth=()=>{
  return admin.auth();
}
module.exports.getApiKey=()=>{
  return apiKey;
}
module.exports.getDb=()=>{
  return admin.database();
}

const {
JWT_TOKEN_SECRET = '1cab76fdc3a5e26bb1659177bb7efe951493c6f1d52ae9a82ca9313c37c5ca484dae9eb2e1d717936beff7d3026504106b078406ad5c7f5a097d5da10b2e5cc1'
} = process.env

// exporting jwt token generation function
module.exports.generateAccessToken = (username) => {
  return jwt.sign(username, JWT_TOKEN_SECRET, { expiresIn: '1800s' });
}
// exporting authenticateToken function
module.exports.authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, JWT_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      console.log("Authenticated user details : " + JSON.stringify(user));
      next();
    })
  }