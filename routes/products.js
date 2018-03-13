var express = require ('express');
var router = express.Router();
var bodyParser = require ('body-parser');
var bodyParserMid = bodyParser.urlencoded();

router.get('/add',function(req,resp){
  resp.render('products/add');
});

router.post('/add',bodyParserMid,function(req,resp){
  resp.render('products/add');

});

router.get('/list',function(req,resp){
  resp.render('products/list');

});


module.exports = router;
