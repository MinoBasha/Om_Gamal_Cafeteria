var express = require('express');
var router = express.Router();
var bodyParser=require('bodyParser');
var bodyParserMid=bodyParser.urlencoded();
var fs=require('fs');
var mongoose = require('mongoose');
var multer=require('multer');
var uploadMid=multer({
    dest:"./public/images"
});
var ProductModel=mongoose.model('products');
var OrderModel=mongoose.model('orders');

/* GET home page. */
router.get('/add', function(req, res, next) {
  if (!req.session.useremail){
      resp.redirect('/login');
  }
  else{
      ProductModel.find({},function(err,products){
      resp.render('orders/add',{products:products});
      });
  }
});

router.post('/add',bodyParserMid, function(req, res, next) {

      var order = new OrderModel({
          id:mongoose.Types.ObjectId(),
          products:req.body.products
          });
      order.save(function (err,doc) {
          if(!err){
               resp.redirect("/products/list");
          }else{
              resp.json(err);
          }
       });
});

router.get('/list', function(req, res, next) {
  res.render('orders/list');
});

router.get('/delete/:id',function (req,resp,next) {
    ProductModel.remove({_id:req.params.id},function (err,result) {
        if(!err){
            req.flash("msg","Done");
            resp.redirect("/products/list");
        }
     })
  });

router.get('/edit/:id',function (req,resp,next) {
      var numberCategories={};
    CategoryModel.find({},function(err,categories){
        numberCategories=categories;
     });

router.post('/edit',bodyParserMid,function (req,resp,next) {
       ProductModel.update({id:req.body.id},
          {"$set":{name:req.body.name,
           price:req.body.price,
           categories:req.body.category}
       }
       ,function (err,doc) {
           console.log(doc);
           if (!err) {
            resp.redirect('/products/list');
           }else{
               resp.json(err);
           }
        });
     });

 ProductModel.findOne({id:req.params.id},function (err,doc) {
             resp.render('products/edit',{obj:doc,categories:numberCategories});
           })
       });

module.exports = router;
