(function () {
'use strict';

//named controller function for more helpful debugging
var LoginCtrl = function($rootScope, $http, $q, User) {		

	function login() {
		
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
				console.log("user logged in");				
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
			.state('app.login', {
				url: '/login',
				//path relative to index.html
				templateUrl: 'modules/login/login.html',
				controllerAs: 'login',
				controller: 'LoginCtrl',
				data: {
					requireLogin: false
				}
			});
	}])

	.controller('LoginCtrl', ['$rootScope', '$http', '$q', 'User', LoginCtrl]);


})();


