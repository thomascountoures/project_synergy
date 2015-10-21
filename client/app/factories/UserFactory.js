(function() {
'use strict';

var UserHelpers = function($http, $q, $state, $rootScope, Cookie) {

	var User = {};

	User.create = function(user) {
		//get user information, save that user to the REST api (/api/users)		
		
		var defer = $q.defer();

		$http.post('/users', user)
		.success(function(response) {
			defer.resolve(response);
		})
		.error(function(err, status) {
			defer.reject(err);
		});
		
		console.dir(User);
		return defer.promise;		
	};

	User.login = function(user) {
		var defer = $q.defer();			
		
		$http.post('/login', user)
		.success(function(authenticatedUser) {
			console.log("post success!");
			console.dir(authenticatedUser);

			
			
			console.log("outside redirecting to dashboard");
			if(authenticatedUser.redirect && authenticatedUser.username) {
				console.log("redirecting to dashboard");
				//important: set rootscope to contain the created user
				
				$state.go('app.dashboard', {userInformation: authenticatedUser});	
				var cookie = Cookie.getSessionCookie();
				console.log("cookie from user.login : ");
				console.dir(cookie);

				defer.resolve(authenticatedUser);
			}			

		}, function(err, status) {
			console.log("no post for you");
			defer.reject(err);
		});

		return defer.promise;

	};

	User.logout = function() {
		var defer = $q.defer();

		$http.get('/logout')
		.success(function(response) {
			defer.resolve(response);
		}, function(err) {
			defer.reject(err);
		});
	};

	User.getUsers = function() {
		var defer = $q.defer();

		$http.get('/users')
		.success(function(response) {
			defer.resolve(response);
			return response;
		})
		.error(function(err, status) {
			defer.reject(err);
		});
		

		return defer.promise;
	};

	User.currentUser = function() {
		var defer = $q.defer();	

		var user = Cookie.getSessionCookie();

		if(user) {
			defer.resolve(user);
		} else {
			defer.reject();
		}

		return defer.promise;
	};

	

	return User;

};

angular
	.module('synergyApp')
	.factory('User', ['$http', '$q', '$state', '$rootScope', 'Cookie', UserHelpers]);


})();

