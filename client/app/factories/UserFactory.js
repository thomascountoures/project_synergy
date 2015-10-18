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
		.success(function(response) {
			console.log("post success!");
			console.dir(response);

			
			
			console.log("outside redirecting to dashboard");
			if(response.redirect && response.userID) {
				console.log("redirecting to dashboard");
				//important: set rootscope to contain the created user
				
				$state.go('app.dashboard');	
				var cookie = Cookie.getSessionCookie();
				console.log("cookie from user.login : ");
				console.dir(cookie);

				defer.resolve(response);
			}			

		}, function(err, status) {
			console.log("no post for you");
			defer.reject(response);
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
		var userID = Cookie.getSessionCookie();

		console.log("getting current user");
		$http.get('/users/:userID')
		.then(function(user) {
			console.log("got current user!");
			defer.resolve(user);
		}, function(err) {
			defer.reject(err);			
		});

		return defer.promise;
	};

	

	return User;

};

angular
	.module('synergyApp')
	.factory('User', ['$http', '$q', '$state', '$rootScope', 'Cookie', UserHelpers]);


})();

