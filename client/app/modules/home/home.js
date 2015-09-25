(function() {
'use strict';

var HomeCtrl = function($q) {
	
};


angular
	.module('home', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/modules/home/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		});
	}])

	.controller('HomeCtrl', ['$q', HomeCtrl]);

})();

