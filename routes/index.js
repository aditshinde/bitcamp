var express = require('express');
var router = express.Router();
var db = require('../model/db');

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

router.get('/doctor', function(req, res, next) {
res.render('./doctor/index', { title: 'Home' });
});

router.get('/doctor/sch_appointments', function(req, res, next) {
res.render('./doctor/sch_apt', { title: 'Schedule' });
});

module.exports = router;