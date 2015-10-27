//global app configuration for project_synergy

(function() {
'use strict';

var ApplicationCtrl = function($scope, AuthService, USER_ROLES) {

	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;

	//method available globally since I'm defining this on the top-level controller
	$scope.setCurrentUser = function(user) {
		$scope.currentUser = user;
	};

};

angular
	.module('synergyApp', [
		//all main app module dependencies
		'ngResource',
		'ngCookies',
		'ui.router',
		'CONSTANTS',
		'underscore',
		'home',
		'signup',
		'login',
		'dashboard',
		'dashboardProfile'
	])	

	.controller('ApplicationCtrl', ['$scope', 'AuthService', 'USER_ROLES', ApplicationCtrl])

	.config([
		'$urlRouterProvider',
		'$httpProvider',
		'$stateProvider',		
		function($urlRouterProvider, $httpProvider, $stateProvider) {

			//redirect user back home if no such requested page exists
			$urlRouterProvider
				.otherwise('/home');


			 $stateProvider			 	
			 	.state('app', {
					/*An abstract state can have child states but cannot get activated itself. An 'abstract' state is simply a state 
					that can't be transitioned to. It is activated implicitly when one of its descendants are activated.*/
					url: '/app',
					abstract: true,
					template: '<div ui-view />',
					controller: ApplicationCtrl					
				 });

	//If session expires and user gets 401, or not authenticated error.
	//The interceptors are service factories that are registered with the $httpProvider by adding them to the 
	//$httpProvider.interceptors array. The factory is called and injected with dependencies (if specified) 
	//and returns the interceptor. Alternatively you can register the interceptor via an anonymous factory.*/
	//$httpProvider.interceptors.push(['$rootScope', '$q', 'AUTH_EVENTS', AuthInterceptor]);	
	}])

	.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function($rootScope, $q, AUTH_EVENTS) {

		var handler = {};

		handler.responseError = function(response) {
			$rootScope.$broadcast({
				401: AUTH_EVENTS.notAuthenticated,
				403: AUTH_EVENTS.notAuthorized,
				419: AUTH_EVENTS.sessionTimeout,
				440: AUTH_EVENTS.sessionTimeout
			}[response.status], response); // if this syntax looks weird, it's just using array notation to access the object's properties (obj[prop] instead of obj.prop)
			return $q.reject(response);
		};

		return handler;

	}])

	.run([
		'$rootScope',
		'AUTH_EVENTS',
		'AuthService',
		'USER_ROLES',
		'$state',		
		function($rootScope, AUTH_EVENTS, AuthService, USER_ROLES, $state) {
			$rootScope.$state = $state;
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
				var requested_state = toState.name;
				//user is not logged in
				if(!AuthService.isAuthenticated()) {
					if(toState.name !== 'app.login') {
						$state.go('app.login');
					}					
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				} else {
					var authorized_roles = toState.data.authorizedRoles;
					//there is a session
					if(AuthService.isAuthorized(authorized_roles)) {						
						$state.go(requested_state);
					} else {
						event.preventDefault();
						$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
					}
				}
								
			});
		}
	]);

})();

