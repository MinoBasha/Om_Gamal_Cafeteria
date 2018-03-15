var express = require ('express');
var router = express.Router();
var bodyParser = require ('body-parser');
var bodyParserMid = bodyParser.urlencoded();
var multer=require('multer');
var mongoose = require('mongoose');


router.get('/login',function(req,resp){
  resp.render('auth/login',{
    msg:req.flash("msg")
  });
});

router.post('/login',bodyParserMid,function(req,resp){
  var username = req.body.username;
  var pass = req.body.password;
  //static login
  if(username == "mino" && pass == "12345"){
    req.session.username = "mino";
    req.session.password= "12345";
    resp.redirect('/products/list');

  }else{
    req.flash("msg","invalid username or password");
    resp.redirect('/auth/login');
  }

});

router.get('/logout',function (req,resp) {
    req.session.destroy(function () {
        resp.redirect('login');
     })
  });

module.exports = router;
