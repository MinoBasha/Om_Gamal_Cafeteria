var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var products=new Schema({
  //_id:ObjectId,
  _id:Number,
  proname:String,
  price:Number,
  category:String,
  // category:{
  //   type:ObjectId,
  //   ref:"category"
  // }
  proimg:String

});
mongoose.model("products",products);
