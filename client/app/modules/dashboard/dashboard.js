(function() {
'use strict';

var DashboardCtrl = function($scope, $q, $http, User, userInformation) {
	
	User.currentUser()
	.then(function(user) {
		this.user = user;
	}, function(err) {
		return err;
	});
	
	console.log("this.user: ");
	console.dir(this.user);

	// $scope.$watch( User.currentUser, function(currentUser) {
	// 	this.user = currentUser;
	// });

	this.logout = User.logout;
};

angular
	.module('dashboard', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			//child state of 'app'
			.state('app.dashboard', {
				url: '/dashboard',
				abstract: true,
				templateUrl: 'modules/dashboard/dashboard-scaffolding.html',
				data: {
					//will apply to all children of 'dashboard'
					requireLogin: true
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



