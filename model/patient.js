var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var patientSchema  = mongoose.Schema({
		_id     : String,
		fname   : String,
		mname   : String,
		lname   : String,
		mobile  : String,
		fadhaar : String,
		madhaar : String,
		age     : Number,
		weight  : Number,
		ancd    : Schema.Types.Mixed,
		pastd   : Schema.Types.Mixed,
		allergy : Schema.Types.Mixed,
		pastm   : Schema.Types.Mixed,
		currm   : Schema.Types.Mixed,
		email   : String,
		pass    : String,
		address : Schema.Types.Mixed,
		occupation : String
});

var Patient    = mongoose.model('Patient',patientSchema);
module.exports = Patient;