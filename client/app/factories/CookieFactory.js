(function() {
'use strict';

var CookieCtrl = function($cookies) {

	var Cookie = {};

	Cookie.getSessionCookie = function() {
		var cookie = $cookies.get('userID');
		console.log("cookie: ");
		console.dir(cookie);
		return cookie;
	};

	return Cookie;

};



angular
	.module('synergyApp')
	.factory('Cookie', ['$cookies', CookieCtrl]);


})();


