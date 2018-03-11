var express = require ('express');
var router = express.Router();
var bodyParser = require ('body-parser');
var bodyParserMid = bodyParser.urlencoded();

router.get('/login',function(req,resp){
  resp.render('auth/login');

});

router.post('/login',bodyParserMid,function(req,resp){

});


module.exports = router;
