var express = require ('express');
var router = express.Router();
var bodyParser = require ('body-parser');
var bodyParserMid = bodyParser.urlencoded();
var fs = require('fs');

var multer = require('multer');
var uploadMid = multer({
  dest:"./public/images"
});

router.get('/add',function(req,resp){
  resp.render('products/add');
});

router.post('/add',uploadMid.single('proimg'),function(req,resp){
  //resp.render('products/add');
  fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
  resp.json(req.file);

});

router.get('/list',function(req,resp){
  resp.render('products/list');

});


module.exports = router;
