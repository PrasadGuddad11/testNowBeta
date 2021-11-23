const Joi = require('joi');
const auth = require('./app_auth_utils');
const axios = require('axios');

module.exports = function(app){

    app.post('/signupAsBusiness', function(req, res){
        const JoiSchema = Joi.object().keys({
            userID: Joi.string().required(),
            firstname: Joi.string().required(),
            lastname:Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            phoneno: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            btype:Joi.string().required(),
            startdate :Joi.date().required(),
            suite: Joi.string().required(),
            street: Joi.string().required(),
            stName: Joi.string().required(),
            city: Joi.string().required(),
            province:Joi.string().required(),
            postcode:Joi.string().required(),
            package:Joi.string().required(),
            cardnumber: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
            cardexpmonth: Joi.string().length(2).pattern(/^[0-9]+$/).required(),
            cardexpyear: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
            cardcvv: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            //userID: Joi.string().required(),
            try{
              auth.getDb().ref("Business_Owner/"+input.email.split(".")[0]+"/").set(input)
              res.status(200).send("Business_Owner added Successfully")
            } catch (error) {
              res.status(400).send(error);
            }
            
           /* axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/Business_Owner/'+input.userID+'/.json', input)
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

    app.post('/confirmBusHealthCheck', function(req, res){
        const JoiSchema = Joi.object().keys({
          // phoneno:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
          phoneno:Joi.string().length(10),
          notouch: Joi.boolean().required(),
          lesscontact: Joi.boolean().required(),
          nocontactpos:Joi.boolean().required(),
          cleaningaccess:Joi.boolean().required(),
          sanitycheckobjs:Joi.boolean().required(),
          sharingtools: Joi.boolean().required(),
          staggeredschedules: Joi.boolean().required(),
          hygiene:Joi.boolean().required(),
          hygienesignage:Joi.boolean().required(),
          workplacesanity:Joi.boolean().required(),
          healthCheckTime:Joi.any().required()
        }).options({ abortEarly: false });

        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "/"
          + (currentdate.getMonth()+1)  + "/" 
          + currentdate.getDate() + " "  
          + currentdate.getHours() + ":"  
          + currentdate.getMinutes() + ":" 
          + currentdate.getSeconds(); 

        // const input = req.body;
        console.log("From /'confirmBusHealthCheck/' "+req.body);
        const input = {phoneno:req.body.phoneno, notouch:req.body.notouch, lesscontact:req.body.lesscontact, nocontactpos:req.body.nocontactpos, cleaningaccess:req.body.cleaningaccess, sanitycheckobjs:req.body.sanitycheckobjs, sharingtools:req.body.sharingtools, staggeredschedules:req.body.staggeredschedules, hygiene:req.body.hygiene, hygienesignage:req.body.hygienesignage, workplacesanity:req.body.workplacesanity, healthCheckTime:datetime.toString()};

        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
          try{
            auth.getDb().ref("BoHealth_Check/"+input.phoneno.split(".")[0]+"/").set(input)
            res.status(200).send("confirmBusHealthCheck added Successfully")
          } catch (error) {
            res.status(400).send(error);
          }
           /* axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/BoHealth_Check/'+input.phoneno+'/.json', input)
              .then(function (response) {
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          res.status(200).send("Recorded as business");*/
        }else{
          res.status(401).send(error.message);
        }
    });

    app.post('/rateConsumer',function(req,res){
        const JoiSchema = Joi.object().keys({
            visitorid: Joi.string().required(),
            safetyrate: Joi.number().required(),
            hygenerate:Joi.number().required()
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            //vendorid: Joi.string().required(),
            try{
              auth.getDb().ref("Vendor_Consumer_Rating/"+input.visitorid.split(".")[0]+"/").set(input)
              res.status(200).send("rateConsumer added Successfully")
            } catch (error) {
              res.status(400).send(error);
            }
            
           /* axios.put('https://fir-js-8156e-default-rtdb.firebaseio.com/Vendor_Consumer_Rating/'+input.visitorid+'/.json', input)
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

    app.post('/rateVendor',function(req,res){
        const JoiSchema = Joi.object().keys({
            vendorid: Joi.string().required(),
            safetyrate: Joi.number().required(),
            hygenerate:Joi.number().required()
        }).options({ abortEarly: false });
        const input = req.body;
        const {error,value} = JoiSchema.validate(input);
        if (typeof error === "undefined"){
            //vendorid: Joi.string().required(),
            try{
              auth.getDb().ref("Consumer_Vendor_Rating/"+input.vendorid.split(".")[0]+"/").set(input)
              res.status(200).send("Consumer_Vendor_Rating added Successfully")
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

    app.get('/listMyPlaces', function(req, res1){
        /*const JoiSchema = Joi.object().keys({
            EstablishmentID: Joi.string().required()
        }).options({ abortEarly: false });
        const input = req.query;
        const {error,value} = JoiSchema.validate(input);*/
        try {
          if (typeof error === "undefined"){
            let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Establishment_details";
            console.log(url);
            auth.getDb().ref("/Establishment_details").once("value", function(snapshot) {
              console.log(snapshot.val());
             // res1.status(200).send(snapshot.val())
              var ka=Object.keys(snapshot.val());
              let arr=[];
              for (let i = 0; i < ka.length; i++) {
                arr.push(snapshot.val()[ka[i]]);
              }
                res1.status(200).send(arr);               
            });
          /*  axios.get(url).then(function (response) {
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
              }); */             
        }else{
            res1.status(400).send(error.message);
        }     
        } catch (error) {
          res1.status(401).send(error);
        }           
  });

    app.get('/listVendors', function(req, res1){
        /*const JoiSchema = Joi.object().keys({
            Vid: Joi.string().required()
        }).options({ abortEarly: false });
        const input = req.query;
        const {error,value} = JoiSchema.validate(input);*/
        try {
          if (typeof error === "undefined"){
            let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Vendoor/.json";
            console.log(url);
            auth.getDb().ref("/Vendoor").once("value", function(snapshot) {
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
            });    */        
  });
    app.get('/listVisitors', function(req, res1){
        /*const JoiSchema = Joi.object().keys({
            Vid: Joi.string().required()
        }).options({ abortEarly: false });
        const input = req.query;
        const {error,value} = JoiSchema.validate(input);*/
        /*if (typeof error === "undefined"){
          let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Visitor/.json";
          console.log(url);
          axios.get(url).then(function (response) {
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
            });              
      }else{
          res1.status(202).send(error.message);
      }  */
      try {
        if (typeof error === "undefined"){
          let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Visitor/.json";
          console.log(url);
          auth.getDb().ref("/Visitor").once("value", function(snapshot) {
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
      }); 
}