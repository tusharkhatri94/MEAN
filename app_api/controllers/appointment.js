const mongoose = require('mongoose');
const Appointment = mongoose.model('appointments');


const getAppointment = function (req, res) {
    Appointment.find().exec(function (err, appointmentdata) {
        if (err) {
            res.status(404)
                .json(err);
            return;
        }
        res.status(200).json(appointmentdata);

    });
}

const createAppointment = function (req, res) {
    Appointment.create({
        customerName: req.body.customerName,
        emailid: req.body.emailid,
        appointmentDate: req.body.appointmentDate,
        contactNo: req.body.contactNo,        
        treatment: req.body.treatment
        
    }, (err, appointmentdata) => {
        if (err) {
            res.status(400)
                .json(err);
        } else {
            res.status(201)
                .json(appointmentdata);
        }
    });
}
const getSingleAppointment = function (req, res) {
    if (req.params && req.params.appointmentid) {
        Appointment.findById(req.params.appointmentid)
            .exec((err, appointmentdata) => {
                if (!appointmentdata) {
                    res.status(404)
                        .json({
                            "message": "appointmentid not found"
                        });
                    return;
                } else if (err) {
                    res.status(404)
                        .json(err);
                    return;
                }
                res.status(200)
                    .json(appointmentdata);
            });
    } else {
        res.status(404)
            .json({
                "message": "no appointmentid in request"
            });
    }
}
const updateAppointment = function (req, res) {
    if (!req.params.appointmentid) {
        res.
        status(404)
            .json({
                "message": "Not found, appointmentlist is required"
            });
        return;
    }
    Appointment.findById(req.params.appointmentid)
        .exec((err, appointmentdata) => {
            if (!appointmentdata) {
                res
                    .json(404)
                    .status({
                        "message": "appointmentid not found"
                    });
                return;
            } else if (err) {
                res.status(400)
                    .json(err);
                return;
            }

            appointmentdata.customerName = req.body.customerName;
            appointmentdata.emailid = req.body.emailid;
            appointmentdata.appointmentDate = req.body.appointmentDate;
            appointmentdata.contactNo = req.body.contactNo;
            appointmentdata.treatment = req.body.treatment;
            appointmentdata.save((err, appointmentdata) => {
                if (err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(appointmentdata);
                }

            });
        });
}
const deleteAppointment = function (req, res) {
    const appointmentid = req.params.appointmentid;

    if (appointmentid) {
        Appointment
            .findByIdAndRemove(appointmentid)
            .exec((err, appointmentdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res.status(204)
                    .json(null);

            });
    } else {
        res.status(404)
            .json({
                "message": "No appointmentid"
            });
    }
}

module.exports = {
    getAppointment,
    createAppointment,
    getSingleAppointment,
    updateAppointment,
    deleteAppointment
};
