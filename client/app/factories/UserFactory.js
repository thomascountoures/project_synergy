(function() {
'use strict';

var UserHelpers = function($http, $q, $location) {

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
		
		$http.post('/login', user)
		.success(function(response) {
			console.log("post success!");
			console.dir(response);
			defer.resolve(response);
			$location.path('/dashboard');
		}, function(err, status) {
			console.log("no post for you");
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
	.factory('User', ['$http', '$q', '$location', UserHelpers]);


})();

