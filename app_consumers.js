const Joi = require('joi');
const auth = require('./app_auth_utils');
const axios = require('axios');

//exposes services to gneral users
module.exports = function(app){
    app.post('/confirmConsumerHealthCheck', function(req, res){
          const JoiSchema = Joi.object().keys({  
            phoneno:Joi.string().length(10).pattern(/^[0-9]+$/).required(),                      
            nottravelled: Joi.boolean().required(),
            nosymptoms: Joi.boolean().required(),
            nocontact:Joi.boolean().required(),
            notouch:Joi.boolean().required(),
            sanitycheck:Joi.boolean().required(),
            healthCheckTime:Joi.any().required()
        }).options({ abortEarly: false });

        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "/"
          + (currentdate.getMonth()+1)  + "/" 
          + currentdate.getDate() + " "  
          + currentdate.getHours() + ":"  
          + currentdate.getMinutes() + ":" 
          + currentdate.getSeconds();   

        const input ={phoneno:req.body.phoneno, nottravelled:req.body.nottravelled, nosymptoms:req.body.nosymptoms, nocontact:req.body.nocontact, notouch:req.body.notouch, sanitycheck:req.body.sanitycheck, healthCheckTime:datetime.toString()};
        const {error,value} = JoiSchema.validate(input);
        console.log("validated");
        if (typeof error === "undefined"){
          try{
            auth.getDb().ref("Consumer_Health_Checkup/"+input.phoneno.split(".")[0]+"/").set(input)
            res.status(200).send("confirmConsumerHealthCheck added Successfully")
          } catch (error) {
            res.status(400).send(error);
          }         
         /* axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/Consumer_Health_Checkup/'+input.phoneno+'/.json', input)
              .then(function (response) {
                console.log(response.data);
              })
              .catch(function (errorr) {
                console.log(errorr);
              });
          res.status(200).send("Recorded as business");*/
        }else{
          res.status(401).send(error.message);
        }
    });

    app.post('/storeConsumerFeedback', function(req, res){
        const JoiSchema = Joi.object().keys({
            vendorid: Joi.number().required(),
            safetyrating: Joi.number().required(),
            hyginetyrating: Joi.number().required()
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            //vendorid: Joi.string().required(),
            try{
              auth.getDb().ref("Consumer_Vendor_Rating/"+input.vendorid.split(".")[0]+"/").set(input)
              res.status(200).send("storeConsumerFeedback added Successfully")
            } catch (error) {
              res.status(400).send(error);
            }         
           /* axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/Consumer_Vendor_Rating/'+input.vendorid+'/.json', input)
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

    
    app.get('/searchSafeVendors', function(req, res1){
        /*const JoiSchema = Joi.object().keys({
            EstablishmentID: Joi.string().required()
        }).options({ abortEarly: false });
        const input = req.query;
        const {error,value} = JoiSchema.validate(input);*/
        try {
          if (typeof error === "undefined"){
            let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Establishment_details/.json";
            console.log(url);
            auth.getDb().ref("/Establishment_details").once("value", function(snapshot) {
              console.log(snapshot.val());           
              var ka=Object.keys(snapshot.val());
                let arr=[];
                for (let i = 0; i < ka.length; i++) {
                  arr.push(snapshot.val()[ka[i]]);
                }
                  res1.status(200).send(arr);        
            });
          }else{
            res1.status(400).send(error.message);
        }     
        } catch (error) {
          res1.status(401).send(error);
        }
        
          /*axios.get(url).then(function (response) {
              console.log(response.data);            
            var ka=Object.keys(response.data);
            let arr=[];
            for (let i = 0; i < ka.length; i++) {
              arr.push(response.data[ka[i]]);
            }
              res1.status(200).send(arr);            
            })
            .catch(function (errorr) {
              console.log(errorr);
            });      */        
       
  });
}