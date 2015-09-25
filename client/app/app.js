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
		'login'
	])

	.config([
		'$urlRouterProvider',
		function($urlRouterProvider) {
			$urlRouterProvider.otherwise('/home');
		}
	]);

})();

