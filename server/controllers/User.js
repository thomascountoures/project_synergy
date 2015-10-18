var db = require('../helpers/db_module');

function createUser(req, res, next) {
	console.dir(req.body);
	console.log('inserting user...');	

	console.dir(db);
	
	db.insertValues('users', req.body)
	.then(function(response) {		
		return next(response);
	}, function(err, status) {		
		return next(err);
	});



};

//Create a new todo
module.exports.createUser = createUser;

