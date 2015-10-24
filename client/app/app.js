(function() {
'use strict';

//main app configuration
angular
	.module('synergyApp', [
		//all main app module dependencies
		'ngResource',
		'ngCookies',
		'ui.router',
		'underscore',
		'home',
		'signup',
		'login',
		'dashboard',
		'dashboardProfile'
	])	

	.config([
		'$urlRouterProvider',
		'$httpProvider',
		'$stateProvider',		
		function($urlRouterProvider, $httpProvider, $stateProvider) {

			//redirect user back home if no such requested page exists
			$urlRouterProvider
				.otherwise('/home');

			var AppCtrl = function() {

				this.currentUser = null;				

				this.setCurrentUser = function(user) {
					this.currentUser = user;
				};

			}

			 $stateProvider			 	
			 	.state('app', {
					/*An abstract state can have child states but cannot get activated itself. An 'abstract' state is simply a state 
					that can't be transitioned to. It is activated implicitly when one of its descendants are activated.*/
					url: '/app',
					abstract: true,
					template: '<div ui-view />'									
				 });

			/*If session expires and user gets 401, or not authenticated error.

			The interceptors are service factories that are registered with the $httpProvider by adding them to the 
			$httpProvider.interceptors array. The factory is called and injected with dependencies (if specified) 
			and returns the interceptor. Alternatively you can register the interceptor via an anonymous factory.*/
			$httpProvider.interceptors.push([
				'$timeout', 
				'$q', 
				'$injector',
				'$location', 
				function($timeout, $q, $injector, $location) {
					var $http,
						$state;
					
					//trick to not receive 'uncaught error: [$injector:cdep] circular dependency found'			
					$timeout(function() {
						$http = $injector.get('$http');
						$state = $injector.get('$state');
					});

					return {
						responseError: function(rejection) {
							var deferred = $q.defer();
							if(rejection.status == 401) {
								$state.go('login');								
								deferred.resolve();
							} else {
								return rejection;
							}
							return deferred.promise;
						}
					}

				}
			]);
		}
	])

	// .controller('MainCtrl', [		
	// 	'User', 
	// 	function(User) {
	// 		this.$watch()
	// 	}
	// ])

	.run([
		'$rootScope',
		'$location',
		'$state',
		'Cookie',
		function($rootScope, $location, $state, Cookie) {
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
				$rootScope.$state = $state;
				//get requireLogin data from state (data object is configured in each controller in stateProvider.state)
				var requireLogin = toState.data.requireLogin;
				var user = Cookie.getSessionCookie();
				console.log('session cookie: ');
				console.dir(user);

				//if the user visits a page that requires a login (authentication) and isn't logged in
				if(requireLogin === true && typeof user == 'undefined') {
					console.log('you are undefined');
					event.preventDefault();
					$state.go('app.login', {});
				} 
				
				

				console.log("from state: " + fromState.name);
				console.log("to state: " + toState.name);
				
			});
		}
	]);

})();

