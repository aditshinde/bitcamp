var Patient = require('./patient');

exports.insert = function(data,callback){
	var patient = new Patient(data);
	patient.save(function(err){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log("Patient Added.");
			callback(null,data);
		}
	});
}

exports.find = function(callback){
	Patient.find(function(err,patient){
		if(err){
			console.log("Error:");
			console.log(err);
		}
		else{
			console.log(patient);
		}
	});
}

exports.findById = function(data,callback){
	Patient.find({email : data},function(err,patient){
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
	Patient.find({email : data},{_id:0,pass:1},function(err,patient){
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