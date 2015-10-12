(function () {
'use strict';

//named controller for more helpful debugging
var LoginCtrl = function($http, $q, User) {		

	function login() {
		console.log("login");
		var form = this.loginForm;

		var user = {
			username: this.username,
			password: this.password
		}		
		
		if(form.$valid) {
			console.log("valid form");
			console.dir(user);
			User.login(user)
			.then(function(response) {
				console.dir(response);
				console.log(response.message);
				console.log("user logged in");
				return response;
			}, function(err, status) {
				console.error("error, user couldn't login: " + err);
			});
		}
		
	}

	this.login = login;

};

angular
	.module('login', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				//path relative to index.html
				templateUrl: 'modules/login/login.html',
				controllerAs: 'login',
				controller: 'LoginCtrl'
			});
	}])

	.controller('LoginCtrl', ['$http','$q', 'User', LoginCtrl]);


})();


