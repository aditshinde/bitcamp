var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var patient_hisSchema  = mongoose.Schema({
		_id     : String,
		pid     : String,
		fname   : String,
		mname   : String,
		lname   : String,
		mobile  : String,
		email   : String,
		fadhaar : String,
		madhaar : String,
		age     : Number,
		weight  : Number,
		date	: String,
		doc_id	: String,
		disease	: String,
		prescription : String,
		bill	: Number
},{ collection : 'patient_history' });

var patient_history  = mongoose.model('patient_history',patient_hisSchema);
module.exports = patient_history;