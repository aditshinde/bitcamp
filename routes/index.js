var express = require('express');
var router = express.Router();
var db = require('../model/db');
var emailjs       = require("emailjs");
var doctor       = require('../model/docDAO');
var patient       = require('../model/patDAO');
var departmentDAO = require('../model/appDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Home' , err : 0 });
});


//Login doctor & patient
router.post('/verify', function (req, res, next) {
  var uid = req.body.uid;
  var pass = req.body.pass;
  if(req.body.user_type == 'doc')
  {
    doctor.findById(uid,function(err,data){
            if(err)
            {
              console.log("Error! check db connection !!");
              res.redirect('./');
            }
            else
            {
              if(data[0] != undefined && pass === data[0]['pass'])
              {
                req.session.user = data[0];
                //req.session.doctor_logged_in = true;
                console.log(req.session.user._id+' logged in');
                  //doctor.updateOnlineStatus(req.session.user._id,true);
                res.render('./doctor',  { title: 'Doctor-Home'});
              }
              else
              {
                console.log("Error! No such user exist !!");
                res.render('index', { title: 'Home' , err : '1' });
              }
            }
    });
  }
  else
  {
    //console.log('patient login request called');
    patient.findById(uid,function(err,data){
            if(err)
            {
              console.log("Error! check db connection !!");
              res.redirect('./');
            }
            else
            {
              if(data[0] != undefined && pass === data[0]['pass'])
              {
                req.session.user = data[0];
                req.session.doctor_logged_in = false;
                console.log(req.session.user._id+' logged in');
                res.render('./patient', { title: 'Patient-Home'});
              }
              else
              {
                console.log("Error! No such user exist !!");
                res.render('index', { title: 'Home' , err : '1' });
              }
            }
    });
  }
});


router.get('/doctor', function(req, res, next) {
res.render('./doctor/index', { title: 'Home' });
});

router.get('/doctor/sch_appointments', function(req, res, next) {
res.render('./doctor/sch_apt', { title: 'Schedule' });
});

module.exports = router;