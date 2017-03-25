var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var doctorSchema  = mongoose.Schema({
		_id     : String,
		fname   : String,
		mname   : String,
		lname   : String,
		mobile  : String,
		degree  : String,
		uni     : String,
		year    : String,
		rating  : String,
		charge  : Number,
		email   : String,
		pass    : String,
		address : Schema.Types.Mixed,
		exp		: String,
		spcl    : String,
		status	: String  
});

var Doctor    = mongoose.model('Doctor',doctorSchema);
module.exports = Doctor;