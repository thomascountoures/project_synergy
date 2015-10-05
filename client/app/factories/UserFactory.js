(function() {
'use strict';

var UserHelpers = function($http, $q) {

	var User = {};

	User.create = function(user) {
		//get user information, save that user to the REST api (/api/users)		
		
		var defer = $q.defer();

		$http.post('/api/users', user)
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
		console.log("user before stringify");
		console.dir(user);

		// console.log("user after stringify");
		// user = JSON.stringify(user);
		// console.log(user);

		// console.log("user after url encode");
		// user = encodeURIComponent(user);
		// console.log(user);

		
		$http.post('/login', user)
		.success(function(response) {
			defer.resolve(response);
		}, function(err, status) {
			defer.reject(response);
		});

		return defer.promise;

	};

	User.getUsers = function() {
		var defer = $q.defer();

		$http.get('/api/users')
		.success(function(response) {
			defer.resolve(response);
			return response;
		})
		.error(function(err, status) {
			defer.reject(err);
		});
		

		return defer.promise;
	};

	

	return User;

};

angular
	.module('synergyApp')
	.factory('User', ['$http', '$q', UserHelpers]);


})();

