(function() {
'use strict';

var Session = function() {
	//var this = {};
	this.create = function(userid, first_name, last_name, email, username) {
		this.userId = userid;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.username = username;		
	};
	this.destroy = function() {
		this.userId = null;
		this.first_name = null;
		this.last_name = null;
		this.email = null;
		this.username = null;
	};
	//return this;
};

angular
	.module('synergyApp')
	.service('Session', Session);


})();



