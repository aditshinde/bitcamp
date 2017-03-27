var PH = require('./patient_history');

exports.insert = function(data,callback){
	var patient = new PH(data);
	patient.save(function(err){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log("Patient history Added..");
			callback(null,data);
		}
	});
}

exports.find = function(callback){
	PH.find(function(err,patient){
		if(err){
			console.log("Error:");
			console.log(err);
		}
		else{
			console.log(patient);
			callback(patient);
		}
	});
}

exports.findById = function(data,callback){
	PH.find({ pid : data},function(err,patient){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log(patient);
			callback(null,patient);
		}
	});
}

exports.findPass = function(data,callback){
	PH.find({email : data},{_id:0,pass:1},function(err,patient){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			//console.log(patient);
			callback(null,patient);
		}
	});
}