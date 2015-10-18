(function() {
'use strict';

var DashboardCtrl = function($rootScope, $q, $http, User) {

	
	this.user = User.currentUser;
	console.log("current user from controller: ");
	console.dir(this.user);	

	this.logout = User.logout;
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
				controllerAs: 'dashboard'
			});
	}])

	.controller('DashboardCtrl', ['$rootScope', '$q', '$http', 'User', DashboardCtrl]);


})();



