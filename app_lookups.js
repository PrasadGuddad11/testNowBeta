const Joi = require('joi');
const auth = require('./app_auth_utils');
const axios = require('axios');

module.exports = function(app){   

    app.get('/listBusinessType', function(req, res1){
      try {        
        if (typeof error === "undefined"){
          let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Business_Types/.json";
          console.log(url);
          console.log(url);
          auth.getDb().ref("/Business_Types").once("value", function(snapshot) {
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
              // res1.status(200).send({" data":response});
              var ka=Object.keys(response.data);
              let arr=[];
              for (let i = 0; i < ka.length; i++) {
                arr.push(response.data[ka[i]]);
              }
                res1.status(200).send(arr);            
              })
              .catch(function (errorr) {
                console.log(errorr);
              });*/
              //res1.status(200).send("sucess");
         
    });
    
    app.get('/listPackages', function(req, res1){
      try {
        if (typeof error === "undefined"){
          let url = "https://fir-js-8156e-default-rtdb.firebaseio.com/Package__Type/.json";
          console.log(url);
          auth.getDb().ref("/Package__Type").once("value", function(snapshot) {
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
       
           /* axios.get(url).then(function (response) {
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
              });  */            
            
    });
}