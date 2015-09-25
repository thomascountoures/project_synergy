//define required modules
var express    		 	   = require('express'),
	mysql				   = require('mysql'),
	path 	   		 	   = require('path'),
	routes 	   		 	   = require('./routes'),
	bodyParser 		 	   = require('body-parser'),
	mongoose   		 	   = require('mongoose'),
	Todo 				   = require('./controllers/Todo'),
	User 				   = require('./controllers/User'),	
	//set express to 'app' (not a module addition)...
	app 	   		 	   = express();

//use bodyparser
app.use(bodyParser());


//Each time Express gets an HTTP request, it provides two objects: a request object, and a response object
app.get("/", function (request, response) {
	//dirname resolves to: /Users/Thomas/Desktop/Mano Projects/game_tracker/server
	//path.join resolves to: /Users/Thomas/Desktop/Mano Projects/game_tracker/client/app/views/index.html	
	response.sendFile(path.join(__dirname, '../client/app/', 'index.html'));	

});



//Set/mount paths
app.use('/modules', routes.serveModules());
app.use("/assets", routes.serveAssets());
app.use("/factories", routes.serveFactories());
app.use("/views", routes.serveViews());
app.use("/bower_components", routes.serveBowerComponents());
app.use("/app",routes.serveBaseFiles());


//REST API - Users
app.post('/api/users', User.createUser);

//REST API - Todos
app.post('/api/todos', Todo.createTodo);
app.get('/api/todos', Todo.listTodos);



//app.post('/api/users', todoRequestsControl)


/* REST API AND DATABASE: 

1. You make an object in your code to call the REST method 
2. Call http method 
3. Code inside your REST API queries the database 
4. Database returns some data 
5. REST API code packs up the data into Json and sends it t your client 
6. Client receives Json/XML response 
7. Map response to an object in your code
*/

//set server to listen on port 8000
//note: browserSync from grunt is using port 3000, so use another port
//for the express server!
app.listen(8000, function() {
	console.log("I'm listening");
});	