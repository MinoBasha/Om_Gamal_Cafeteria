var express = require ('express');
var router = express.Router();
var bodyParser = require ('body-parser');
var bodyParserMid = bodyParser.urlencoded();
var fs = require('fs');
var mongoose = require('mongoose');
var ObjectID = mongoose.Types.ObjectId();
var flash = require('connect-flash');

var multer = require('multer');
var uploadMid = multer({
  dest:"./public/images"
});


var ProductModel = mongoose.model('products');


router.get('/add',function(req,resp){
    mongoose.model('product').find({},function(err,users){
        resp.render('product/add',{product:product});
  resp.render('products/add');
});

router.post('/add',uploadMid.single('proimg'),function(req,resp){
  //resp.render('products/add');
  // fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
  var product = new ProductModel({
    proname : req.body.proname,
  //  _id :ObjectID ,
    _id:req.body._id,
    price : req.body.price,
    category : req.body.category,
    proimg : req.file.filename
  })
  product.save(function(err,doc){
    if(!err){
      resp.redirect("/products/list");
    }else{
      resp.json(err);
    }

    //resp.json(doc);
  });
  //resp.json(req.body);
  // mongoose.model('products').collection.insert({
  //     proname : req.body.proname,
  //     _id : req.body._id,
  //     price : req.body.price,
  //     category : req.body.category
  //   },function(err,doc){
  //     resp.json(doc);
  // })
});

router.get('/list',function(req,resp){
  //resp.render('products/list');
  ProductModel.find({},function(err,result){
    if(!err){
      resp.render('products/list',{data:result,msg:req.flash('msg')})
      //resp.json(result);
    }else{
      resp.json(err);
    }
  })
});

router.get('/delete/:id',function(req,resp){
  ProductModel.remove({_id:req.params.id},function(err,result){
    if(!err){
      req.flash("msg","Done");
      resp.redirect("/products/list");
    }
  });
});

router.get('/edit/:id',function(req,resp){
  ProductModel.findOne({_id:req.params.id},function(err,doc){
    resp.render('products/edit',{obj:doc});
  });
});

router.post('/edit/:id',bodyParserMid,function(req,resp){
  ProductModel.update({_id:req.params.id},{
    "$set":{
    proname : req.body.proname,
    price : req.body.price,
    category : req.body.category,
    
  },function(err,doc){
    resp.redirect('products/list');
  });
});


module.exports = router;
