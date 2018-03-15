var express = require ('express');
var router = express.Router();
var bodyParser = require ('body-parser');
var bodyParserMid = bodyParser.urlencoded();
var fs = require('fs');
var mongoose = require('mongoose');
var ObjectID = mongoose.Types.ObjectId();
var flash = require('connect-flash');



var CategoryModel = mongoose.model('category');


router.get('/add',function(req,resp){
  resp.render('category/add');
});

router.post('/add',bodyParserMid,function(req,resp){
  //resp.render('products/add');
  // fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
  var category = new CategoryModel({
    catname : req.body.catname,
   _id :ObjectID ,
  })
  product.save(function(err,doc){
    if(!err){
      resp.redirect("/category/list");
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
      resp.render('category/list',{data:result,msg:req.flash('msg')})
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
      resp.redirect("/category/list");
    }
  });
});

router.get('/edit/:id',function(req,resp){
  ProductModel.findOne({_id:req.params.id},function(err,doc){
    resp.render('category/edit',{obj:doc});
  });
});

router.post('/edit/:id',bodyParserMid,function(req,resp){
  CategoryModel.update({_id:req.params.id},{
    catname : req.body.catname,
  },function(err,doc){
    resp.redirect('category/list');
  });
});


module.exports = router;
