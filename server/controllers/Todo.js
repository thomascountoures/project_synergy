var TodoModel = require('../models/todoModel');

//Create a new todo
module.exports.createTodo = function (req, res) {
	console.dir(req.body);
	console.log(req.route.path);
	console.log("req name" + req.body.name);
	console.log("req status" + req.body.status);
	var todoModel = new TodoModel({
		name: req.body.name,
		status: req.body.status
	});

	todoModel.save(function (err, todo) {
		
		if (err) return console.error(err);
		console.log("todo added!");

		//server response - sends json back to the client
		res.json(201, todo);
		
	});

}

//List all todos
module.exports.listTodos = function (req, res) {

	TodoModel.find(function (err, todos) {

		if (err) return console.error(err);
		res.json(todos);

	});

}

