var Appoint = require('./appoint');

exports.insert = function(data,callback){
	var appoint = new Appoint(data);
	appoint.save(function(err){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log("Appoint Added.");
			callback(null,data);
		}
	});
}

exports.find = function(callback){
	Appoint.find(function(err,appoint){
		if(err){
			console.log("Error:");
			console.log(err);
		}
		else{
			console.log(appoint);
		}
	});
}

exports.findById = function(data,callback){
	Appoint.find({_id : data},function(err,appoint){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log(appoint);
			callback(null,appoint);
		}
	});
}

exports.findByDid = function(data,flag,callback){
	console.log(data);
	Appoint.find({did : data,status:flag},function(err,appoint){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			console.log(appoint);
			callback(null,appoint);
		}
	});
}

exports.findPass = function(data,callback){
	Appoint.find({email : data},{_id:0,pass:1},function(err,appoint){
		if(err){
			console.log("Error:");
			console.log(err);
			callback(err,null);
		}
		else{
			//console.log(appoint);
			callback(null,appoint);
		}
	});
}

exports.acceptPatient = function(id,flag,callback){
	Appoint.update({_id : id},{$set : {status:flag}},function(err,data){
		if(err){
			console.log(err);
			callback(err,null);
			}
		else{
			console.log('Accepted');
			callback(null,data);
		}
	});
}

exports.rejectPatient = function(id,flag,callback){
	Appoint.update({_id : id},{$set : {status:flag}},function(err,data){
		if(err){
			console.log(err);
			callback(err,null);
			}
		else{
			console.log('Rejected');
			callback(null,data);
		}
	});
}

exports.donePatient = function(id,flag,callback){
	Appoint.update({_id : id},{$set : {status:flag}},function(err,data){
		if(err){
			console.log(err);
			callback(err,null);
			}
		else{
			console.log('Rejected');
			callback(null,data);
		}
	});
}