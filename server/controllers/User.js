var db = require('../helpers/db_module');

//Create a new todo
module.exports.createUser = function (req, res) {
	console.dir(req.body);
	console.log('inserting user...');	

	console.dir(db);
	
	db.insertValue('Users', req.body);
	res.send(200);

};
