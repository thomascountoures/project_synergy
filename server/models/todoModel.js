var mongoose   = require('mongoose'),

	//define todo schema
	todoSchema = mongoose.Schema({

		name: String,
		status: String

	});

/*IMPORTANT: the name in the first parameter is the collection it will go to.
Mongoose automatically looks for the plural version of your model name. */
module.exports = mongoose.model('Todo', todoSchema);