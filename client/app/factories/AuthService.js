(function() {
'use strict';

var AuthService = function($http, Session) {
	var authService = {};

	authService.login = function(credentials) {
		
		$http
		.post('/login', credentials)
		.success(function(user) {
			Session.create(user.id, user.first_name, user.last_name, user.username, user.email);	
			if(user.redirect && user.username) {
				console.log("redirecting to dashboard");
				$state.go('app.dashboard.main');
				return user;
			}			

		}, function(err, status) {
			console.log("no post for you");
		});

		
	};

	authService.isAuthenticated = function() {
		return !!Session.userID;
	};

	authService.isAuthorized = function(authorizedRoles) {
		if(!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.userRole) !== -1);
	};

	return authService;

};


angular
	.module('synergyApp')
	.factory('AuthService', ['$http', 'Session', AuthService])


})();