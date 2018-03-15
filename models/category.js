var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var category = new Schema({
  _id:ObjectId,
  catname:String,
});
mongoose.model("category",category);
