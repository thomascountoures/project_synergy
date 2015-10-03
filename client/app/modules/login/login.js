(function () {
'use strict';

//named controller for more helpful debugging
var LoginCtrl = function($http, $q, User) {

	this.message = "hello world";
	console.dir(this);
	function login() {

		var form = this.loginForm;

		var user = {
			username: this.username,
			password: this.password
		}		
		

		if(form.$valid) {
			User.login(user)
			.then(function(response) {
				console.log("user logged in");
			}, function(err, status) {
				console.error("error, user couldn't login: " + err);
			});
		}
		
	}

	this.login = login.toString();
	
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


