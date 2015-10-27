(function() {
'use strict';

var DashboardCtrl = function($scope, $q, $http, User) {
		
	this.logout = User.logout;

	this.user = $scope.currentUser;
};

angular
	.module('dashboard', [])

	.config(['$stateProvider', 'USER_ROLES', function($stateProvider, USER_ROLES) {
		$stateProvider
			//child state of 'app'
			.state('app.dashboard', {
				url: '/dashboard',
				abstract: true,
				templateUrl: 'modules/dashboard/dashboard-scaffolding.html',
				data: {
					//will apply to all children of 'dashboard'
					authorizedRoles: [USER_ROLES.admin, USER_ROLES.registered]
				}					
			})
			.state('app.dashboard.main', {
				url: '/main',								
				templateUrl: 'modules/dashboard/dashboard-main.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard'						
			})			
	}])

	//remember: directives present inside a controller will use that controller's
	//scope. so these directives, being inside the dashboard, will inherit the dashboard
	//controller's scope and all values.	

	.directive('dashboardBody', function() {
		return {
			scope: true,
			restrict: 'AE',
			templateUrl: 'modules/dashboard/directives/dashboard-body-directive.html',
			replace: true
		}
	})

	.controller('DashboardCtrl', ['$scope', '$q', '$http', 'User', DashboardCtrl]);


})();



