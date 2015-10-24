(function() {
'use strict';

var ProfileCtrl = function($http) {

	

};

angular
	.module('dashboardProfile', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('app.dashboard.profile', {
				url: '/profile',
				templateUrl: 'modules/dashboard/profile/profile.html',
				controller: 'ProfileCtrl',
				controllerAs: 'profile'
			})
	}])

	.directive('profileHeader', function() {
		return {
			restrict: 'AE',
			templateUrl: 'modules/dashboard/profile/directives/profile-header.html',
			replace: true			
		}
	})

	.directive('profileBody', function() {
		return {
			restrict: 'AE',
			templateUrl: 'modules/dashboard/profile/directives/profile-body.html',
			replace: true
		}
	})

	.controller('ProfileCtrl', ['$http', ProfileCtrl])


})();