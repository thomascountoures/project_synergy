(function() {
'use strict';

var CookieCtrl = function($cookies) {

	var Cookie = {};

	Cookie.getSessionCookie = function() {
		var cookie = $cookies.get('user');
		console.log("cookie factory get: ");
		console.dir(cookie);
		return cookie;
	};

	return Cookie;

};



angular
	.module('synergyApp')
	.factory('Cookie', ['$cookies', CookieCtrl]);


})();


