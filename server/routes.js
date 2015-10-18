var express = require('express'),
	path 	= require('path');


module.exports.serveFactories = function(req, res, next) {
	return express.static(path.join(__dirname, '../client/app/factories'));
	next();
}

module.exports.serveModules = function (req, res, next) {	
	return express.static(path.join(__dirname, '../client/app/modules'));
	next();
}

module.exports.serveBowerComponents = function(req, res, next) {
	return express.static(path.join(__dirname, '../bower_components'));
	next();
}

module.exports.serveAssets = function(req, res, next) {
	return express.static(path.join(__dirname, '../client/app/assets'));
	next();
}

module.exports.serveViews = function(req, res, next) {
	return express.static(path.join(__dirname, '../client/app/views'));
	next();
}

module.exports.serveBaseFiles = function(req, res, next) {
	return express.static(path.join(__dirname, '../client/app'));
	next();
}

