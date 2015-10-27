(function() {
'use strict';

var UserHelpers = function($http, $q, $state, Cookie, Session, $rootScope) {

	var User = {};

	User.create = function(user) {
		//get user information, save that user to the REST api (/api/users)		
		
		var deferred = $q.defer();

		$http
		.post('/users', user)
		.success(function(response) {
			deferred.resolve(response);
		})
		.error(function(err, status) {
			deferred.reject(err);
		});
				
		return deferred.promise;		
	};

	User.login = function(user) {
		var deferred = $q.defer();			
		
		$http
		.post('/login', user)
		.success(function(response) {			
			if(response.redirect && response.username) { //post success
				response.userRole = 'registered';
				Session.create(response.userID, 
										response.first_name,
										response.last_name,
										response.email,
										response.username);				
				deferred.resolve(response);
			}			

		}, function(err, status) {			
			deferred.reject(err);
		});

		return deferred.promise;

	};

	User.logout = function() {
		var deferred = $q.defer();

		$http
		.get('/logout')
		.success(function(response) {
			deferred.resolve(response);
			Session.destroy();
		}, function(err) {
			deferred.reject(err);
		});
	};

	User.getUsers = function() {
		var deferred = $q.defer();
		var users = [];

		$http
		.get('/users')
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
	.factory('User', ['$http', '$q', '$state', 'Cookie', 'Session', '$rootScope', UserHelpers]);


})();

