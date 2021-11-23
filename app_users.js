const Joi = require('joi');
const auth = require('./app_auth_utils');
const axios = require('axios');
const { date } = require('joi');
const { response } = require('express');
module.exports = function(app){
  
    app.post('/register', function(req, res){
        /*
          validate input for firstname,lastname,gender['Male','Female','Other]',dob,
          email, phoneno, suite,street,stName, city, province,postcode,password
        */
        const JoiSchema = Joi.object().keys({
            firstname: Joi.string().required(),
            lastname:Joi.string().required(),
            gender : Joi.string().valid('Male','Female','Other').required(),
            dob:Joi.date().required(),
            email: Joi.string().email().lowercase().required(),
            phoneno: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            suite: Joi.string().required(),
            street: Joi.string().required(),
            stName: Joi.string().required(),
            city: Joi.string().required(),
            province:Joi.string().required(),
            postcode:Joi.string().required(),
            password:Joi.string().required(),
            userType:Joi.string().required()
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            phoneno: Joi.string().required(),
            auth.getAuth()
            .createUser({
              email: input.email,
              emailVerified: false,
              phoneNumber: input.poneno,
              password: input.password,
              displayName: (input.firstname+" "+input.lastname),
              photoURL: 'https://nourl.png',
              disabled: false,
            })
            .then((userRecord) => {
              try {
                auth.getDb().ref("User/"+input.email.split(".")[0]+"/").set(input)
                res.status(200).send(userRecord)
              } catch (error) {
                res.status(400).send(error);
              }
              // See the UserRecord reference doc for the contents of userRecord.
              /*auth.getDb().ref("User/"+input.email.split(".")[0]+"/").set(
                res.status(200).send(userRecord)//input
                , 
                (error) => {
                  
                  res.status(400).send(error);
                }
              )*/
              //console.log('Successfully created new user:', userRecord.uid);
              /*axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/User/'+input.phoneno+'/.json', input)
              .then(function (response) {
                res.status(200).send(userRecord);
              })
              .catch(function (errorr) {
                res.status(400).send(errorr);
              });*/
              
            })
            .catch((error) => {
              console.log('Error creating new user:', error);
              res.status(401).send(error);
            });            
          //res.status(200).send("Successfully Registered");
        }else{
          res.status(402).send(error.message);
        }
    });
    
    app.get('/getUserDetails', function(req, res1){
        const JoiSchema = Joi.object().keys({
            phoneno: Joi.string().required()
        }).options({ abortEarly: false });
        const input = req.query;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/User/" + input.phoneno + "/.json";
            console.log(url);
            axios.get(url).then
            (res => {

                var userDetails = {
                  "validityClock":"",
                  "name":"Lorem Epsum",
                  "phone" : "1234567890",
                  "email" : "abc@xyz.com",
                  "age" : 38,
                };
                console.log(res);

                let url1 = "";
                if(res.data.userType == "Business")
                {
                  url1 = "https://fir-js-8156e-default-rtdb.firebaseio.com/BoHealth_Check/"+input.phoneno+"/.json";
                } else {
                  url1 = "https://fir-js-8156e-default-rtdb.firebaseio.com/Consumer_Health_Checkup/"+input.phoneno+"/.json";
                }
                
                axios.get(url1).then(
                  response => {
                    // var validityClock = new Date() - new Date(response.data.healthCheckTime);
                    var validityClock = new Date(response.data.healthCheckTime).valueOf();
                    console.log(validityClock);
                    userDetails.validityClock=validityClock.toString();
                    // userDetails.name=res.data.firstname + " " + res.data.lastname;
                    userDetails.name=res.data.firstname + " " + res.data.lastname;
                    userDetails.phone=res.data.phoneno;
                    userDetails.email=res.data.email; 
                    const b=new Date(res.data.dob), mnth = ("0" + (b.getMonth() + 1)).slice(-2),
                    day = ("0" + b.getDate()).slice(-2);
                    var year=b.getFullYear();
                    const c=new Date();
                    const currentyear=c.getFullYear();
                      
                    userDetails.age=currentyear-year;        
                    res1.status(200).json(userDetails);
                  }
                )
            })
        }else{
            res1.status(202).send(error.message);
        }        
    });

    app.post('/updateProfile', function(req, res){
      const JoiSchema = Joi.object().keys({
        firstname: Joi.string().required(),
        lastname:Joi.string().required(),
        gender : Joi.string().valid('Male','Female','Other').required(),
        dob:Joi.date().required(),
        email: Joi.string().email().lowercase().required(),
        phoneno: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        suite: Joi.string().required(),
        street: Joi.string().required(),
        stName: Joi.string().required(),
        city: Joi.string().required(),
        province:Joi.string().required(),
        postcode:Joi.string().required(),
        password:Joi.string().required()
    }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            //vendorid: Joi.string().required(),    
            try{
              auth.getDb().ref("User/"+input.email.split(".")[0]+"/").set(input)
              res.status(200).send("User Updated Successfully")
            } catch (error) {
              res.status(400).send(error);
            }                   
            /*axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/User/' + input.phoneno + '/.json', input)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (errorr) {
                console.log(errorr);
              });
          res.status(200).send("Recorded as business");*/
        }else{
          res.status(401).send(error.message);
        }
    });
}