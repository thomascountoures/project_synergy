//create a connection from node to the MySQL database
var createConnection = function() {
	var mysql	   = require('mysql'),
	connection = mysql.createConnection({
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
};

//insert a value into the MySQL database
var insertValue = function(table, values, columns) {
	console.log('greetings from insert value');
	var values,
		errorName,
		errorMessage;

	//are there specified columns?
	if(columns) {
		try {
			//are columns an array? yes.
			if(columns instanceof Array) {
				columns = columns.join(", ");

				var connection = createConnection(),
				    sql 	   = 'INSERT into ' + table + '(' + columns + ') SET ?';

				var query = connection.query(sql, values, function(err, results) {
					if(err) {
				 		console.error('error, could not insert: ' + err);
				 		connection.end();
				 		return;
				 	} else {
				 		console.log('success, this is what happened: '+ query.sql);
				 		connection.end();
				 		return;
				 	}
			 	});

			//are columns an array? no.
			} else {
				errorName = 'Parameter is not an Array';
				errorMessage = 'The table or column value wasn\'t a string.';
				throw {
					name: errorName,
					message: errorMessage
				}
			}
		} catch(error) {
			if(err.name == errorName) {
				console.error('error: ' + err.message)
			} else {
				throw err;
			}
		}

	//no specific columns
	} else {		
		try {
			//are both the table and values parameter a string? no.
			if(typeof table !== 'string' || typeof values !== 'object') {
				errorName = 'Parameter is not a string';
				errorMessage = 'The table parameter wasn\'t a string, or the column value wasn\'t an object.';

				throw {
					name: errorName,
					message: errorMessage
				}

			} else {
				var connection = createConnection(),
					sql = 'INSERT into ' + table + ' SET ?';

				var query = connection.query(sql, values, function(err, results) {
					if(err) {
				 		console.error('error, could not insert: ' + err);
				 		connection.end();
				 		return;
				 	} else {
				 		console.log('success, this is what happened: '+ query.sql);
				 		connection.end();
				 		return;
				 	}
			 	});
			}
		} catch(err) {
			if(err.name == errorName) {
				console.error('error: ' + err.message);
			} else {
				throw err;
			}
		}
	}	

};

//assign functions
module.exports.createConnection = createConnection;
module.exports.insertValue = insertValue;