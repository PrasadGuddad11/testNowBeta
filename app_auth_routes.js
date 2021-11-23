
const Joi = require('joi');
const auth = require('./app_auth_utils');
const axios = require('axios');

module.exports = function(app){

    app.post('/login', function(req,res1){
      //validate input for userID,password,loginAs
      const JoiSchema = Joi.object().keys({
          userID: Joi.string().required(),
          password:Joi.string().required(),
          //loginAs : Joi.string().valid('Business','User').required()
      }).options({ abortEarly: false });

      const input = req.body;
      const {error,value} = JoiSchema.validate(input);
      if (typeof error === "undefined"){
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+auth.getApiKey(),
          {
            email:input.userID,
            password:input.password,
            returnSecureToken:true
          }
        ).then(res=>{
          /*auth.getDb().ref("User/"+input.userID+"/").once("value", function(snapshot) {
            console.log(snapshot.val());
            res1.status(200).send(snapshot.val())
          });*/
          auth.getAuth()
          .verifyIdToken(res.data.idToken)
          .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log(decodedToken)
            res1.status(200).json(res.data)
            // ...
          })
          .catch((error) => {
            // Handle error
          });


          
          
        }).catch((error) => {
          console.log(error)
          res1.status(401).json(error)
        })
    }else{
      res1.status(401).json(error);
    }
  });

    app.post('/resetPwdRequest', function(req, res){
        // validate input for email
        const JoiSchema = Joi.object().keys({
            email: Joi.string().email().lowercase().required()
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
          res.status(200).send("Reset Password request accepted");
        }else{
          res.status(202).send(error.message);
        }
    });

    app.post('/logoutJWT',auth.authenticateToken,function(req, res){
        req.session.destroy(null);
        res.clearCookie('sid');
        res.redirect('/');
    });

    app.post('/logoutSession',function(req, res){
      req.session.destroy(null);
      res.clearCookie('sid');
      res.redirect('/');
  });

}