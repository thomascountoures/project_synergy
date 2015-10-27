(function () {
'use strict';

//named controller function for more helpful debugging
var LoginCtrl = function($rootScope, $scope, $http, User, $state, AUTH_EVENTS) {

	var that = this;	
	var loginFailed = false;

	this.credentials = {
		username: '',
		password: ''
	};	

	function login(credentials) {
		var form = this.loginForm;

		if(form.$valid) {			
			User
			.login(credentials)
			.then(function(credentials) {				
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$scope.setCurrentUser(credentials);				
			}, function(err, status) {
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);				
			});
		}	
	}

	$scope.$on(AUTH_EVENTS.loginFailed, function(event) {
		loginFailed = true;
	});

	$scope.$on(AUTH_EVENTS.loginSuccess, function(event) {
		$state.go('app.dashboard.main', {});
	});

	$scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
		event.preventDefault();		
	});

	$scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
		event.preventDefault();
		$state.go('app.login');
	});

	this.login = login;

};

angular
	.module('login', [])

	.config(['$stateProvider', 'USER_ROLES', function($stateProvider, USER_ROLES) {
		$stateProvider
			.state('app.login', {
				url: '/login',
				//path relative to index.html
				templateUrl: 'modules/login/login.html',
				controllerAs: 'login',
				controller: 'LoginCtrl',
				data: {
					authorizedRoles: [USER_ROLES.all]
				}				
			});
	}])

	.controller('LoginCtrl', [
		'$rootScope', 
		'$scope', 
		'$http', 
		'User', 
		'$state',
		'AUTH_EVENTS',
		LoginCtrl
	]);


})();


