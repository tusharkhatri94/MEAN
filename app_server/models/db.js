var mongoose = require( 'mongoose' );
const connString='mongodb+srv://DbVesha:riya123@cluster0.apbcc.mongodb.net/AppointmentDB?retryWrites=true&w=majority'

mongoose.connect(connString);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + connString);
   });
   mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
   });
   mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected' +connString);
   }); 
   

   require('./appointment');
   require('./product');