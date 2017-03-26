var Doctor = require('./doctor');

exports.insert = function(data,callback){
	var doctor = new Doctor(data);
	doctor.save(function(err){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log("Doctor Added.");
			callback(null,data);
		}
	});
}

exports.find = function(callback){
	Doctor.find(function(err,doctor){
		if(err){
			console.log("Error:");
			console.log(err);
		}
		else{
			console.log(doctor);
		}
	});
}

exports.findById = function(data,callback){
	Doctor.find({email : data},function(err,doctor){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log(doctor);
			callback(null,doctor);
		}
	});
}

exports.findPass = function(data,callback){
	Doctor.find({email : data},{_id:0,pass:1},function(err,doctor){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log(doctor);
			callback(null,doctor);
		}
	});
}

exports.findBySpcl = function(data,callback){
	Doctor.find({spcl : data},function(err,doctor){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log(doctor);
			callback(null,doctor);
		}
	});
}