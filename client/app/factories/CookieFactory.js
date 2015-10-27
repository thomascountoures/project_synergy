(function() {
'use strict';

var CookieCtrl = function($cookies) {

	var Cookie = {};

	Cookie.getSessionCookie = function() {
		return $cookies.get('user');				
	};

	return Cookie;

};



angular
	.module('synergyApp')
	.factory('Cookie', ['$cookies', CookieCtrl]);


})();


