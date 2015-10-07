(function () {
'use strict';

//signup controller definition
var SignupCtrl = function($http, $q, User, FormTools) {
	
	function submitRegistration() {
		
		//these variables need to be inside the submit function,
		//else they will be undefined
		var firstName 	   = this.firstName,
			lastName  	   = this.lastName,
			username  	   = this.username,
			email	  	   = this.email,
			password  	   = this.password,
			repeatPassword = this.repeatPassword,
			form 	  	   = this.signupForm;			

		//check if the form is valid
		if(form.$valid) {
			console.log("valid");
			console.log("password: " + password + "\nrepeatPassword: " + repeatPassword);
			var user = {
				//reminder: keys must match database column names
				first_name: firstName,
				last_name:  lastName,
				username: username,
				email: email,
				password:  password
			};
			
			if(password === repeatPassword) {
				this.passwordFail == false;
				console.log("creating user");
				User.create(user)
				.then(function(response) {				
					console.log('user saved!');
				}, function(err) {				
					console.error('error, user wasn\'t saved. reason: ' + err);
				});
			} else {
				this.passwordFail = true;
				return false;
			}


		//if the form isn't valid at all
		} else {
			return false;
		}

	}
	
	this.submitRegistration = submitRegistration;	

};


angular
	.module('signup', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('signup', {
				url: '/signup',
				//path relative to index.html
				templateUrl: 'modules/signup/signup.html',
				controllerAs: 'signup',
				controller: 'SignupCtrl'
			});
	}])

	.controller('SignupCtrl', [		
		'$http', 
		'$q', 
		'User', 
		'FormTools',		
		SignupCtrl
	]);

})();

