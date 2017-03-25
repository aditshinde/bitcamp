var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var appointSchema  = mongoose.Schema({
		_id     : String,
		did  : String,
		pid : String,
		fname : String,
		mname : String,
		lname : String,
		email : String,
		mobile : String,
		time : String,
		date : String,
		address : Schema.Types.Mixed,
		status : String
},{ collection : 'appoint' });

var Appoint    = mongoose.model('appoint',appointSchema);
module.exports = Appoint;