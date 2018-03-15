ongoose.model("orders",orders);

var orders=new Schema({
  id:Number,
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
  }
  products:[{
      type:Number,
      ref:"products"
  }]
});
