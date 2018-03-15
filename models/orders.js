var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var orders=new Schema({
  _id:Number,
  orderDate:String,
  action:String,
  status:String,
  component:[],
  price:String,
  name:String,
  rooms:String,
  comments:String,
  image:String,
  time:{
    type:Date,
    default:Date.now
  },
  // FK
  user:{
    type:Number,
    ref:"users"
  },
  products:[{
      type:Number,
      ref:"products"
  }]
});
mongoose.model("orders",orders);
