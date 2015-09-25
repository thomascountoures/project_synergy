(function() {
'use strict';

var UserHelpers = function($http, $q) {

	var User = {};

	User.createUser = function(user) {
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

	User.sayHello = function() {
		alert("Hello!");
	};


	return User;

};

angular
	.module('synergyApp')
	.factory('User', ['$http', '$q', UserHelpers]);


})();

