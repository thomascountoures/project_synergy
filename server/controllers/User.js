var db = require('../helpers/db_module');

function createUser(req, res) {
	console.dir(req.body);
	console.log('inserting user...');	

	console.dir(db);
	
	db.insertValues('users', req.body)
	.then(function(response) {
		res.send(200);
	}, function(err, status) {
		res.send(401);
	});

};

//Create a new todo
module.exports.createUser = createUser;

