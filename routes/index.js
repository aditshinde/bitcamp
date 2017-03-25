var express = require('express');
var router = express.Router();
var db = require('../model/db');
var emailjs       = require("emailjs");
var doctor       = require('../model/docDAO');
var patient       = require('../model/patDAO');
var appoint = require('../model/appDAO');

/**----------------------------------------------------------------------------------**/
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Home' , err : 0 });
});

//Logout session
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.redirect('./');
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

router.get('/doctor/profile', function(req, res, next) {
  res.render('./doctor/profile', { title: 'Profile',user: req.session.user });
});

router.get('/doctor/sch_appointments', function(req, res, next) {
  if(!req.session.user)
    {
      res.redirect('/doctor');

    }
    else
    {
      appoint.findByDid(req.session.user._id,'ACCEPTED',function (err,data){
        if(err){
          res.redirect('/doctor');
        }
        else{
          res.render('./doctor/sch_apt', { title: 'Home', app : data });
        }
      });
    }

  //res.render('./doctor/sch_apt', { title: 'Schedule' });
});

router.get('/doctor/pen_appointments', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/doctor');

    }
    else
    {
      appoint.findByDid(req.session.user._id,'PENDING',function (err,data){
        if(err){
          res.redirect('/doctor');
        }
        else{
          res.render('./doctor/pen_apt', { title: 'Home', app : data });
        }
      });
    }
});

router.get('/doctor/accept', function (req, res, next) {
  appoint.acceptPatient(req.query.id,'ACCEPTED',function (err, data){
    if(err){
          res.redirect('/doctor');
        }
        else{
          appoint.findByDid(req.session.user._id,'PENDING',function (err,data){
                if(err){
                  res.redirect('/doctor');
                }
                else{
                  res.render('./doctor/pen_apt', { title: 'Home', app : data });
                }
          });
        }
  });
});

router.get('/doctor/reject', function (req, res, next) {
  appoint.rejectPatient(req.query.id,'REJECTED',function (err, data){
    if(err){
          res.redirect('/doctor');
        }
        else{
          appoint.findByDid(req.session.user._id,'PENDING',function (err,data){
        if(err){
          res.redirect('/doctor');
        }
        else{
          res.render('./doctor/pen_apt', { title: 'Home', app : data });
        }
      });
    }
  });
});

/**----------------------------------------------------------------------------------**/
router.get('/patient', function(req, res, next) {
  res.render('./patient/index', { title: 'Home' });
});

router.get('/patient/take_appointment', function(req, res, next) {
  res.render('./patient/appointment', { title: 'Appointment' });
});

router.get('/patient/profile', function(req, res, next) {
  res.render('./patient/profile', { title: 'Profile',user: req.session.user  });
});
module.exports = router;