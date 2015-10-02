//error object for try-catch blocks
var throwError = function(errorName, errorMessage) {
	var errorObject = {
		name: errorName,
		message: errorMessage
	};
	throw errorObject;
};

//Assign functions
module.exports.throwError = throwError;