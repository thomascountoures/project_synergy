(function() {
'use strict';

var DashboardCtrl = function($q, $http) {

	this.message = "Welcome to the dashboard!";

};

angular
	.module('dashboard', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/dashboard/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard'
		});
	}])

	.controller('DashboardCtrl', ['$q', '$http', DashboardCtrl]);


})();



