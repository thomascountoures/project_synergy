(function() {
'use strict';

var FormTools = function() {

	var Form = {};
	
	//check if there is two inputs of type password for check password behaviour
	Form.checkForPasswords = function(form, fields, errorMessage) {
		var passwords = [];

		//loop through inputs and see how many password inputs there are
		for(var i = 0, length = fields.length, current, array = [], passCount = 0; i < length; i++) {
			current = fields[i];
			if(current.type === "password") {
				passCount++;
				password.push(current);
			}
			//if there are two password inputs, that must mean there is a check password behaviour
			if(passcount === 2) {
				//if both passwords are the same
				if(passwords[0] === passwords[1]) {
					return true;
				//the passwords aren't the same, show error
				} else {
					var error = document.createElement('span');
					error.className = 'error';
					if(typeof errorMessage === String) {
						error.innerHTML = 'Error, passwords do not match!';
					} else {
						console.error('Third parameter is the password error message, and must be a string!');
					}
					
					//insert after the last input in the form
					error.insertAfter(fields[fields.length - 1]);
					return false;
				}
			}
		}

		if(password.length === 0) {
			return true;
		}

		
	};	

	return Form;

};

angular
	.module('synergyApp')
	.factory('FormTools', FormTools);


})();

