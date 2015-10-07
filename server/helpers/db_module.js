var q 	  = require('../node_modules/q'),
	error = require('./error_module');

//writing some custom QUERY_UTILS API to handle server to database stuffz
var QUERY_UTILS = {

	createConnection: function() {
		//establish connection to mysql database
		var mysql = require('mysql');
		var connection = mysql.createConnection({
				host: 'localhost',
				user: '',
				password: '',
				database: ''
			});

		console.log("creating connection...");
		connection.connect(function(err) {
			if(err) {
				console.error('error connection: ' + err.stack);
			} else {
	 			console.log('connected as id ' + connection.threadId);
	 		}
		});

		return connection;
	},

	//note: assumes database table is called 'users'
	loginUser: function(username, password) {
		console.log("greetings from login user");		
		console.log("username: " + username);
		console.log("password: " + password);

		var connection = QUERY_UTILS.createConnection();

		if(typeof username === 'string' && typeof password === 'string') {
			var sql = 'SELECT * FROM `users` WHERE `username`= ? and `password` = ?';

			//Set up promise
		  	var defer = q.defer();

		  	//Do the actual query
		  	connection.query({
		  		sql: sql,
		  		timeout: 40000,
		  		values: [username, password]
		  	}, function(error, results) {		  		
	  			if(!error) {
	  				console.log("success! user has good credentials");
	  				console.log(results);
	  				defer.resolve(results);
	  			} else {
	  				console.error("bad credentials: " + error);
	  				console.log(results);
	  				defer.reject(error);
	  			}
		  	});

			//End connection
			connection.end();

			return defer.promise;

		} else {
			console.error("Username or password parameter is not a string. Or both. Newbs. lol");
		}
	},

	selectValue: function(table, columns, item, itemValue) {

		var connection = this.createConnection();

		if(typeof table == 'string' && typeof values == 'object') {
			var sql = 'SELECT ' + columns + ' FROM `' + table 
				  + '` WHERE `' + item + '` = '  + itemValue;

		 	//Set up promise
		  	var defer = q.defer();

			queryCallback = function(err, query_results, fields) {
				if(!err) {
					defer.resolve(query_results);
				} else {
					console.error('error, could not select: ' + err);
					defer.reject(err);
				}
			}
		} else {
			console.error('Table or Value parameter is not a valid type.');
		}
	},

	insertValues: function(table, values, columns) {
		var connection = QUERY_UTILS.createConnection();
		console.log(values);
		//regular insert, no specific columns
		//remember, the '?' is a placeholder for the values parameter. the values
		//parameter is optional and you can just use the query and callback as the
		//query() parameters, just omit the '?'
		if(!columns) {						
			var sql = 'INSERT into ' + table + ' SET ?';

			var defer = q.defer();

			queryCallback = function(err, results, fields) {
				//no error
				if(!err) {
			 		console.log('success, this is what happened: '+ query.sql);
			 		connection.end();
			 		defer.resolve(results);
			 		return results;
			 	} else {
			 		console.error('error, could not insert: ' + err);
			 		connection.end();
			 		defer.reject(err);
			 		return false;		 		
			 	}
	 		}

			query = connection.query(sql, values, queryCallback);

			return defer.promise;
			
		//there are specific columns
		} else {
			if(columns instanceof Array) {

				columns = columns.join(", ");
				var sql = 'INSERT into ' + table + '(' + columns + ') SET ?';

				var defer = q.defer();

				queryCallback = function(err, results) {
					//no error
					if(!err) {
				 		console.log('success, this is what happened: '+ query.sql);
				 		connection.end();
				 		defer.resolve(results);
				 		return;
				 	} else {
				 		console.error('error, could not insert: ' + err);
				 		connection.end();
				 		defer.reject(err);
				 		return;			 		
				 	}
		 		}
				query = connection.query(sql, values, queryCallback);
			}
		}
	}

}

//assign functions
module.exports.loginUser = QUERY_UTILS.loginUser;
module.exports.insertValues = QUERY_UTILS.insertValues;


