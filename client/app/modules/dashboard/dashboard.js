(function() {
'use strict';

var DashboardCtrl = function($rootScope, $q, $http, User, userInformation) {

	
	this.user = userInformation;
	console.log("current user from controller: ");
	console.dir(userInformation);

	this.logout = User.logout;
};

angular
	.module('dashboard', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			//child state of 'app'
			.state('app.dashboard', {
				url: '/dashboard',
				params: {'userInformation': null},
				resolve: {
					userInformation: ['$stateParams', function($stateParams) {
						console.log("user information: ");
						console.log($stateParams.userInformation);						
						return $stateParams.userInformation;
					}]
				},
				templateUrl: 'modules/dashboard/dashboard.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard'
			});
	}])

	.controller('DashboardCtrl', ['$rootScope', '$q', '$http', 'User', 'userInformation', DashboardCtrl]);


})();



