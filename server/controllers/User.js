var db = require('../helpers/db_module');

function createUser(req, res) {
	console.dir(req.body);
	console.log('inserting user...');	

	console.dir(db);
	
	db.insertValues('Users', req.body)
	.then(function(response) {
		res.send(200);
	}, function(err, status) {
		res.send(401);
	});

};

function login(req, res) {
	var username = req.body.username,
		password = req.body.password;

	//db.loginUser('users', username, password);
}

//Create a new todo
module.exports.login = login;
module.exports.createUser = createUser;

