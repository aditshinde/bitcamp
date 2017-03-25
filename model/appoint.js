var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var appointSchema  = mongoose.Schema({
		_id     : String,
		did  : String,
		pid : String,
		time : String,
		data : String,
		address : Schema.Types.Mixed,
		charge : Number,
		status : String
});

var Appoint    = mongoose.model('Appoint',patientSchema);
module.exports = Appoint;