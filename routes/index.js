var express = require('express');
var router = express.Router();
var db = require('../model/db');
var emailjs       = require("emailjs");
var doctor       = require('../model/docDAO');
var patient       = require('../model/patDAO');
var appoint = require('../model/appDAO');
var patient_history = require('../model/patient_historyDAO');

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
res.render('./doctor/index', { title: 'Home'});
});

router.get('/doctor/patient_history', function(req, res, next) {
  res.render('./doctor/p_history', { title: 'History'});
});

router.post('/doctor/getDoctor', function(req, res, next) {
  console.log(req.body.str);
  doctor.findBySpcl(req.body.str,function(err,data){
    if(err){
      res.redirect('/doctor');
    }
    else{
      res.send(data);
    }
  });
});

router.post('/show_p_his', function(req, res, next) {
  patient_history.findById(req.body.no,function(err,patient){
    if(err)
    {
      console.log("Error! Wrong retrive in p_history !!");
      res.redirect('./');
    }
    console.log('history-> '+patient[0]);
    res.send(patient);
  });
  
});

router.get('/patient/history', function(req, res, next) {
//console.log('user->'+req.session.user._id);
patient_history.findById(req.session.user._id,function(err,patient){
if(err)
{
console.log("Error! Wrong insertion in p_history !!");
res.redirect('./');
}
console.log('history-> '+patient[0]);
res.render('./patient/p_history', { title: 'History',history: patient });
});
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
          res.render('./doctor/sch_apt', { title: 'Home',user: req.session.user, app : data, alert1: null });
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

router.post('/doctor/sch_appointments/presc', function(req, res, next) {
  var pid = req.body.pid;
  var did = req.body.did;
  var presc = req.body.presc;
  var disease = req.body.disease;
  var bill = req.body.bill;
  console.log(pid);
    appoint.findById(req.query.aid,function(err,patient){
      if(err)
      {
      console.log("Error! Wrong insertion in p_history !!");
      res.redirect('./');
      }
      else
      {
        var data = {};
        var date_now = new Date();
        console.log(patient[0]);
        data["_id"] = date_now/1000;
        data["pid"] = patient[0]._id;
        data["fname"] = patient[0].fname;
        data["mname"] = patient[0].mname;
        data["lname"] = patient[0].lname;
        data["mob"] = patient[0].mob;
        data["email"] = patient[0].email;
        data["fadhaar"] = patient[0].fadhaar;
        data["madhaar"] = patient[0].madhaar;
        data["age"] = patient[0].age;
        data["weight"] = patient[0].weight;
        data["date"] = date_now;
        data["doc_id"] = req.body.did;
        data["disease"] = req.body.disease;
        data["prescription"] = req.body.prescription;
        data["bill"] = req.body.bill;
        patient_history.insert(data,function(err){
                if(err)
                {
                  console.log("Error inserting Patient History data !");
                  res.send('Error inserting Patient History data !');
                }
                else{
                  console.log("Patient History inserted.");
                  appoint.donePatient(req.query.aid,'DONE',function (err, data){
                      if(err){
                            res.redirect('/doctor');
                          }
                          else{
                            res.render('./doctor/sch_apt', { title: 'Home', app : data });
                          }
                        
                      
                  });
                  res.redirect('/doctor/sch_appointments');
                }
        });
      }
    });
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
                  sendSMS(req.session.user.fname,req.session.user.lname);
                  res.render('./doctor/pen_apt', { title: 'Home', app : data });
                }
          });
        }
  });
});

function sendSMS(fname,lname){
  console.log('sending sms...');
  var twilio = require('twilio');
 
                  // Find your account sid and auth token in your Twilio account Console.
                  var client = twilio('AC633b1cda4b11ce6814b778251f817d44','17b8b974800bcd8d88551d40c2439474');
                   
                  // Send the text message.
                  client.sendMessage({
                    to: '+919768652121',
                    from: '+12017304043',
                    body: 'Your appointment with DR.'+fname+' has been accepted'
                  });
             console.log('sms sent');     
}

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
  res.render('./patient/appointment', { title: 'Appointment' , status : "0"});
});

router.post('/patient/request_appoint',function(req,res,next){
  var data = {};
  data["_id"]= Date.now()/1000;
                data["pid"] = req.session.user._id;
                data["did"] = req.body.doc;
                data["fname"] = req.session.user.fname;
                data["mname"] = req.session.user.mname;
                data["lname"] = req.session.user.lname;
                data["email"] = req.session.user.email;
                data["mobile"] = req.session.user.mobile;
                data["address"] = req.session.user.address;
                data["time"] = req.body.timeS;
                data["date"] = req.body.dateS;
                data["status"] = "PENDING";
  appoint.insert(data,function (err,data){
    if(err){
      res.redirect('/patient');
    }
    else{
      res.render('./patient/appointment', { title: 'Appointment' , status : "1" });
    }
  });
});

router.get('/patient/profile', function(req, res, next) {
  res.render('./patient/profile', { title: 'Profile',user: req.session.user });
});
module.exports = router;