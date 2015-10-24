(function() {
'use strict';

var UserHelpers = function($http, $q, $state, $rootScope, Cookie) {

	var User = {};

	User.create = function(user) {
		//get user information, save that user to the REST api (/api/users)		
		
		var deferred = $q.defer();

		$http.post('/users', user)
		.success(function(response) {
			deferred.resolve(response);
		})
		.error(function(err, status) {
			deferred.reject(err);
		});
		
		console.dir(User);
		return deferred.promise;		
	};

	User.login = function(user) {
		var deferred = $q.defer();			
		
		$http.post('/login', user)
		.success(function(authenticatedUser) {
			console.log("post success!");
			console.dir(authenticatedUser);

			
			
			console.log("outside redirecting to dashboard");
			if(authenticatedUser.redirect && authenticatedUser.username) {
				console.log("redirecting to dashboard");
				console.log("authenticated user: ");
				console.dir(authenticatedUser);
				//important: store current user
				User.currentUser(authenticatedUser);
				var newUser = User.currentUser();
				console.log("new set user: ");
				console.dir(newUser);
				deferred.resolve(authenticatedUser);
				$state.go('app.dashboard.main');								
			}			

		}, function(err, status) {
			console.log("no post for you");
			deferred.reject(err);
		});

		return deferred.promise;

	};

	User.logout = function() {
		var deferred = $q.defer();

		$http.get('/logout')
		.success(function(response) {
			deferred.resolve(response);
		}, function(err) {
			deferred.reject(err);
		});
	};

	User.getUsers = function() {
		var deferred = $q.defer();
		var users = [];

		$http.get('/users')
		.success(function(response) {
			users.push(response);
			deferred.resolve(users);			
		})
		.error(function(err, status) {
			deferred.reject(err);
		});
		
		return users;

		return deferred.promise;
	};

	User.currentUser = function(setUser) {
		console.log("user.currentUser: ");
		console.dir(setUser);
		var deferred = $q.defer();
		var user = [];

		if(setUser) {
			console.log("setting user...");
			user.push(setUser);
			console.log(user);
			deferred.resolve(user);			
		} else {
			if(user) {
				deferred.resolve(user);
			} else {
				deferred.reject();
			}
		}

		return deferred.promise;
	};

	

	return User;

};

angular
	.module('synergyApp')
	.factory('User', ['$http', '$q', '$state', '$rootScope', 'Cookie', UserHelpers]);


})();

