const Joi = require('joi');
const auth = require('./app_auth_utils');
const axios = require('axios');

module.exports = function(app){
    
    app.get('/listProvinces', function(req, res1){
        /*const JoiSchema = Joi.object().keys({
            Name: Joi.string().required()
        }).options({ abortEarly: false });
        const input = req.query;
        const {error,value} = JoiSchema.validate(input);*/
        try {
          if (typeof error === "undefined"){
            let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Provinces/.json";
            console.log(url);
            auth.getDb().ref("/Provinces").once("value", function(snapshot) {
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

   /* app.get('/assessPlace', function(req, res){
        const JoiSchema = Joi.object().keys({
            lat: Joi.number().required(),
            lng: Joi.number().required()
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            var details = {"zone":"YELLOW","LAT": input.lat,"LNG": input.lng,"rating":4};            
            res.status(200).json(details);
        }else{
            res.status(202).send(error.message);
        }
    });*/
    app.get('/assessPlace', function(req, res1){
      try {
        if (typeof error === "undefined"){
          let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Geolocation/.json";
          console.log(url);
          auth.getDb().ref("/Geolocation").once("value", function(snapshot) {
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
       });     */         
 
});

    app.post('/storePlaceFeedback',function(req,res){
        const JoiSchema = Joi.object().keys({
            placeid: Joi.string().required(),
            consumerid: Joi.number().required(),
            safetyrating: Joi.number().required(),
            hyginetyrating: Joi.number().required()
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            //placeid: Joi.string().required(),   
            try{
              auth.getDb().ref("Establishment_Rating/"+input.placeid.split(".")[0]+"/").set(input)
              res.status(200).send("Establishment_Rating added Successfully")
            } catch (error) {
              res.status(400).send(error);
            }         
           /* axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/Establishment_Rating/'+input.placeid+'/.json', input)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (errorr) {
                console.log(errorr);
              });
          res.status(200).send("Recorded as Place Rating");*///
        }else{
          res.status(401).send(error.message);
        }
    });

}