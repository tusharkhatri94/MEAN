var mongoose=require('mongoose');
const { text } = require('express');
var appointSchema = new mongoose.Schema({
  customerName:{type:
          String,
        required:true,
        minlength:3
   },
   emailid:{
    type: String,
    required:true,
   },
   appointmentDate: {
     type:Date,
     required:true
   },
   contactNo: {
     type: Number,
     required:true
   },
   treatment: {
     type: String,
     required:true
   }
});
mongoose.model('appointments',appointSchema);