(function() {
'use strict';

//main app configuration
angular
	.module('synergyApp', [
		//all main app module dependencies
		'ngResource',
		'ui.router',
		'underscore',
		'home',
		'signup',
		'login',
		'dashboard'
	])

	.config([
		'$urlRouterProvider',
		'$httpProvider',
		'$stateProvider',		
		function($urlRouterProvider, $httpProvider, $stateProvider) {
			$urlRouterProvider
				.otherwise('/home');

			$stateProvider
				.state('app', {
					/*An abstract state can have child states but cannot get activated itself. An 'abstract' state is simply a state 
					that can't be transitioned to. It is activated implicitly when one of its descendants are activated.*/
					abstract: true,
					data: {
						//will apply to all children of 'app'
						requireLogin: true
					}
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

	.run([
		'$rootScope',
		'$location',
		'$state',
		function($rootScope, $location, $state) {
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
				//get requireLogin data from state (data object is configured in each controller in stateProvider.state)
				var requireLogin = toState.data.requireLogin;
				console.dir($rootScope.currentUser);												
				/*if the user had previously requested to go to a page but wasn't logged in, take them there.
				because this always fires when states change, when the user logs in they can be taken back
				to where they previously requested, instead of to the dashboard*/
				if($rootScope.requested_page) {
					if(typeof $rootScope.currentUser !== 'undefined') {
						$state.go($rootScope.requested_page, toParams);
						
					}
					//important: get rid of property, not needed anymore. will cause weird routing loops if not deleted
					delete $rootScope.requested_page;
				}

				//if the user visits a page that requires a login (authentication) and isn't logged in
				if(requireLogin === true && typeof $rootScope.currentUser === 'undefined') {
					event.preventDefault();
					//store the requested page user wanted for later
					$rootScope.requested_page = toState.name;
					console.log("user is not logged in");
					$state.go('login');
					console.dir($rootScope);
				} else if (requireLogin === false || typeof requireLogin === 'undefined') {
					console.log("require login is false");
					//$state.go(toState.name, toParams);
				} 
				
				

				console.log("from state: " + fromState.name);
				console.log("to state: " + toState.name);
				
			});
		}
	]);

})();

