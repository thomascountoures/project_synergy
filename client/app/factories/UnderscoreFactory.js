(function() {
'use strict';	

/* putting underscore into its own module to keep in line with angular dependency injection practices */

var underscore = function() {
	return window._;
}

angular
	.module('underscore', [])
	.factory('_', underscore);

})();


