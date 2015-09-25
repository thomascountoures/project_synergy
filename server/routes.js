var express = require('express'),
	path 	= require('path');


module.exports.serveFactories = function() {
	return express.static(path.join(__dirname, '../client/app/factories'));
}

module.exports.serveModules = function (req, res, next) {	
	return express.static(path.join(__dirname, '../client/app/modules'));
}

module.exports.serveBowerComponents = function() {
	return express.static(path.join(__dirname, '../bower_components'));
}

module.exports.serveAssets = function() {
	return express.static(path.join(__dirname, '../client/app/assets'));
}

module.exports.serveViews = function() {
	return express.static(path.join(__dirname, '../client/app/views'));
}

module.exports.serveBaseFiles = function() {
	return express.static(path.join(__dirname, '../client/app'));
}

