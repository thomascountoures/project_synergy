(function () {
'use strict';

//named controller for more helpful debugging
var LoginCtrl = function($resource, $q, User) {



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

	.controller('LoginCtrl', ['$resource','$q', 'User', LoginCtrl]);


})();


