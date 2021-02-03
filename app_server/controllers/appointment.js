
const aboutSite = function (req, res) {
    res.render('about', {
        title: 'About my salon site'
    });
};
const display=function(req,res){    
    res.render('display',{title:'Display'});
};



const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const _randerHomepage = function (req, res, responseBody) {
    res.render('list_display', {
        appointments: responseBody
    });
};

const homelist = function (req, res) {
    const path = '/api/appointments';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(
        requestOptions,
        (err, response, body) => {
            _randerHomepage(req, res, body);
        }
    );
};

const _randerDetailPage = function (req, res, responseBody) {
    res.render('appointment-info', {
        currentAppointment: responseBody
    });
};

const appointmentInfo = function (req, res) {
    const path = `/api/appointments/${req.params.appointmentid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _randerDetailPage(req, res, body);
        }
    );
};


const _renderCreatePage = function (req, res) {
    res.render('create-new-appointment', {
        title: "Create New Appointment"
    });
};

const addNewAppointment = function (req, res) {
    _renderCreatePage(req, res);
};
const doAddNewAppointment = function (req, res) {

    const path = '/api/appointments';
    const postdata = {
       customerName: req.body.customerName,
       emailid: req.body.emailid,
       appointmentDate: req.body.appointmentDate,
       contactNo: req.body.contactNo,
       treatment:req.body.treatment
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions, (err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect('/');
            } else {
                console.log(response)
            }
        }
    );
};

const deleteAppointment = function (req, res) {
    _renderdetailPage(req, res);
};
const dodeleteAppointment = function (req, res) {

    const path = `/api/appointments/${req.params.appointmentid}`;
//    const postdata = {
//        customerName: req.body.customerName,
//        emailid: req.body.emailid,
//        appointmentDate: req.body.appointmentDate,
//        contactNo: req.body.contactNo,
//        treatment:req.body.treatment
//
//    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'DELETE',
        json: {}
    };
    request(
        requestOptions, (err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect('/list');
            } else {
                console.log(response)
            }
        }
    );
};

module.exports = {
    aboutSite,
    _randerHomepage,
    homelist,
    _randerDetailPage,
    appointmentInfo,
    _renderCreatePage,
    addNewAppointment,
    doAddNewAppointment,
    display,
    deleteAppointment,
    dodeleteAppointment
};
