var mongoose=require('mongoose');
const { text } = require('express');
var prodSchema = new mongoose.Schema({
  productName:{type:
          String,
        required:true,
        minlength:3
   },
   type:{
    type: String,
    required:true,
   },
   price: {
     type:String,
     required:true
   },
   benefit: {
     type: String,
     required:true
   }
});
mongoose.model('products',prodSchema);