(function() {
'use strict';

var DashboardCtrl = function($rootScope, $q, $http, User) {

	this.message = "Welcome to the dashboard!";

};

angular
	.module('dashboard', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			//child state of 'app'
			.state('app.dashboard', {
				url: '/dashboard',
				templateUrl: 'modules/dashboard/dashboard.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard',
				data: {
					requireLogin: true
				}
			});
	}])

	.controller('DashboardCtrl', ['$rootScope', '$q', '$http', 'User', DashboardCtrl]);


})();



