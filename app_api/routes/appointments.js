var express = require('express');
var router = express.Router();

const ctrlAppoint=require('../controllers/appointment');
 
router
     .route('/appointments')
     .get(ctrlAppoint.getAppointment)
     .post(ctrlAppoint.createAppointment);
     
router
    .route('/appointments/:appointmentid')
    .get(ctrlAppoint.getSingleAppointment)
    .put(ctrlAppoint.updateAppointment)
    .delete(ctrlAppoint.deleteAppointment);

    module.exports=router;