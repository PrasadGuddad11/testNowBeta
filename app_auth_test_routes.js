const Joi = require('joi')

module.exports = function(app){
    app.get('/',function(req,res){
        //Generate token used in process.env.JWT_TOKEN_SECRET
        //console.log(require('crypto').randomBytes(64).toString('hex'));
        var session = req.session;
        console.log('Processing root request');
        console.log(session);
        
        if (typeof session.userID === "number"){
            res.sendFile("public/logout.html",{root:__dirname});
        }else{
            res.sendFile('public/welcome.html',{root:__dirname})
        }
    });
}