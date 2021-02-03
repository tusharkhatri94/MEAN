var express = require('express');
var router = express.Router();
var ctrlAbout = require('../controllers/appointment');
var ctrlMain = require('../controllers/main');


/* GET home page. */
router.get('/', ctrlAbout.homelist);
router.get('/about', ctrlAbout.aboutSite);
router.get('/display',ctrlAbout.display);
router.get('/appointments/:appointmentid', ctrlAbout.appointmentInfo);
router.route('/new')
        .get(ctrlAbout.addNewAppointment)
        .post(ctrlAbout.doAddNewAppointment)
module.exports = router;
