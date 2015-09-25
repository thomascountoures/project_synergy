var mongoose = require('mongoose'),

	userSchema = mongoose.Schema({

		firstName: String,
		lastName: String,
		password: String

	});


module.exports = mongoose.model('User', userSchema);