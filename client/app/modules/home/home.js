(function() {
'use strict';

var HomeCtrl = function($q) {
	
};


angular
	.module('home', [])

	.config(['$stateProvider', 'USER_ROLES', function($stateProvider, USER_ROLES) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/modules/home/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home',
			data: {
				authorizedUsers: [USER_ROLES.all]
			}
		});
	}])

	.controller('HomeCtrl', ['$q', HomeCtrl]);

})();

