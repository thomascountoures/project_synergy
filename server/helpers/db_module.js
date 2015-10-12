var q 	  = require('../node_modules/q'),
	error = require('./error_module'),
	_ 	  = require('../node_modules/underscore');


var AUTH = {

	//note: assumes database table is called 'users'
	login: function(username, password) {
		console.log("greetings from login user");		
		console.log("username: " + username);
		console.log("password: " + password);

		var connection = QUERY.createConnection();

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
	  				//note: results will only be populated if there is a query match in the database
	  				//there will 'be no error' when the the .query API makes a successful connection
	  				//with the database. error is NOT checking for matching results!
	  				console.log("looking for results");
	  				console.dir(results);	  	
	  				var results = results;

	  				//should only return one match
	  				if(results.length === 1) {
	  					console.log("getting results");
	  					var user = results.pop();
	  					if(username === user.username.toString() && user.password.toString() ) {
	  						console.log("success! user has good credentials");	  						

	  						//authetication success
	  						defer.resolve(user);
	  						//connection.end();

	  					} else {
	  						error.throwError("bad credentials", "user has bad credentials");
	  						connection.end();
	  						return defer.reject(user);	  						
	  					}
  					//no users found - bad credentials
	  				} else {
	  					return defer.reject(results);	  					
	  				}	  					  				
	  			} else {
	  				console.error("error, could not connect to database: " + error);
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

	deserialize: function(id) {		
		var defer = q.defer();
		console.log("logout id: " + id);
		QUERY.select('*', 'users', '`id`', id)
		.then(function(user) {
		 	defer.resolve(user);
		}, function(error) {
		 	defer.reject(error);
		});

	 	return defer.promise;
	}


};

//writing some custom QUERY API to handle server to database stuffz
var QUERY = {

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

	insert: function(table, values, columns) {
		var connection = QUERY.createConnection();
		console.log(values);
		//regular insert, no specific columns
		//remember, the '?' is a placeholder for the values parameter. the values
		//parameter is optional and you can just use the query and callback as the
		//query() parameters, just omit the '?'
		if(!columns) {						
			var sql = 'INSERT into ? SET ?';

			var defer = q.defer();

			connection.query({
				sql: sql,
				timeout: 40000,
				values: [table, values],
				function(error, results) {
					if(!error) {
						console.log('success, this is what happened: '+ query.sql);
						defer.resolve(results);
					} else {
						defer.reject(error);
						error.throwError('connnection error', 'could not connect to database');
					}
				}
			});			

			return defer.promise;
			
		//there are specific columns
		} else {
			if(columns instanceof Array) {

				columns = columns.join(", ");
				var sql = 'INSERT into ? ( ? ) SET ?';

				var defer = q.defer();

				connection.query({
					sql: sql,
					timeout: 40000,
					values: [table, columns, values],
					function(error, results) {
						if(!error) {
							defer.resolve(results);
						} else {
							error.throwError("connection problem", "error, could not connect to database: " + error);
							defer.reject(error);
						}
					}
				});				
			}
		}
	},

	select: function(columns, table, item, itemValue) {

		var connection = QUERY.createConnection();

		if(typeof table == 'string' && typeof item == 'string') {
			var sql = "SELECT " + columns + " FROM " + table + " WHERE " + item + " = ?",
				itemValue = itemValue.toString();			

		 	//Set up promise
		  	var defer = q.defer();

		  	console.log("selecting value...");
		  	connection.query({
		  		sql: sql,
		  		timeout: 40000,
		  		values: [itemValue],
		  		function(error, results) {		  			
		  			if(!error) {
		  				var results = results;
		  				//results is an array of JSON objects (database rows)
		  				if(results.length > 0) {
		  					defer.resolve(results);		  					
		  				}
		  			} else {
		  				defer.reject(error);
		  			}
		  		}
		  	});
			
		} else {
			console.log("select else");
			error.throwError('TypeError', 'Table or Value parameter is not a valid type.');
		}

		return defer.promise;
	}

}

//assign functions
module.exports.login = AUTH.login;
module.exports.deserialize = AUTH.deserialize;
module.exports.insert = QUERY.insert;


