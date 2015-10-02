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

		connection.connect(function(err) {
			if(err) {
				console.error('error connection: ' + err.stack);
			} else {
	 			console.log('connected as id ' + connection.threadId);
	 		}
		});

		return connection;
	},

	loginUser: function(table, username, password) {
				console.log("greetings from login user");
				var connection = this.createConnection();

				if(typeof username === 'string' && typeof password === 'string') {
					sql = 'SELECT username, password from ' + table 
						  + ' WHERE username= ' + connection.escape(username) + 
						  ' and password= ' + connection.escape(password);

				  	var defer = Q.defer();

				  	queryCallback = function(err, query_results, fields) {
				  		// error will be an Error if one occurred during the query 
			  			// results will contain the results of the query 
			  			// fields will contain information about the returned results fields (if any) 
			  			if(!err) {
			  				console.log("success! user has good credentials");
			  				console.log(query_results);
			  				defer.resolve(query_results);			  				
			  			} else {
			  				console.error("error: " + err);
			  				defer.reject(err);
			  			}

			  			return defer.promise;
				  	}

					connection.query(sql, queryCallback);
					connection.end();

					return final_result;

				} else {
					console.error("Username or password parameter is not a string. Or both. Newbs. lol");
				}
			},

	selectValue: function(table, columns, item, itemValue) {

					var connection = this.createConnection();

					if(typeof table == 'string' && typeof values == 'object') {
						sql = 'SELECT ' + columns + ' FROM `' + table 
							  + '` WHERE `' + item + '` = '  + itemValue;

					  	var defer = Q.defer();
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

	insertValues: function() {
					//regular insert, no specific columns
					//remember, the '?' is a placeholder for the values parameter. the values
					//parameter is optional and you can just use the query and callback as the
					//query() parameters, just omit the '?'
					if(!columns) {						
						sql = 'INSERT into ' + table + '(' + columns + ') SET ?';
						var results = queryCallback = function(err, results, fields) {
							//no error
							if(!err) {
						 		console.log('success, this is what happened: '+ query.sql);
						 		connection.end();
						 		return results;
						 	} else {
						 		console.error('error, could not insert: ' + err);
						 		connection.end();
						 		return false;		 		
						 	}
				 		}

						query = connection.query(sql, values, queryCallback);

						return results;
						
					//there are specific columns
					} else {
						if(columns instanceof Array) {
							columns = columns.join(", ");
							sql = 'INSERT into ' + table + '(' + columns + ') SET ?';
							var final_result = queryCallback = function(err, results) {
								//no error
								if(!err) {
							 		console.log('success, this is what happened: '+ query.sql);
							 		connection.end();
							 		return;
							 	} else {
							 		console.error('error, could not insert: ' + err);
							 		connection.end();
							 		return;			 		
							 	}
					 		}
							query = connection.query(sql, values, queryCallback);
						}
					}
				}

}

//create a connection from node to the MySQL database
function doDatabaseStuff(queryType, table, values, columns) {
	var queryType  = queryType.toLowerCase(),
		sql,
		values,
		query,
		queryCallback;

	//establish connection to mysql database
	var mysql = require('mysql');
	var connection = mysql.createConnection({
			host: 'localhost',
			user: '',
			password: '',
			database: ''
		});

	connection.connect(function(err) {
		if(err) {
			console.error('error connection: ' + err.stack);
		} else {
 			console.log('connected as id ' + connection.threadId);
 		}
	});
	
	switch(queryType) {

		case 'login':
			QUERY_UTILS.loginUser();
			break;

		case 'insert':
			QUERY_UTILS.insertValues();
			break;

		case 'selectOne':
			QUERY_UTILS.selectValue();
			break;
			

	} //switch
}

//assign functions
module.exports.loginUser = QUERY_UTILS.loginUser;