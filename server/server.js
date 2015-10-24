/* * * * * * * * * * 
 * Required Modules *
 * * * * * * * * * */

var express    		 	   = require('express'),
	mysql				   = require('mysql'),
	passport			   = require('passport'),
	bcryptjs			   = require('bcryptjs'),
	db 					   = require('./helpers/db_module'),
	q 					   = require('q'),
	path 	   		 	   = require('path'),
	passportLocal		   = require('passport-local'),
	expressSession		   = require('express-session'),
	routes 	   		 	   = require('./routes'),
	bodyParser 		 	   = require('body-parser'),
	flash				   = require('connect-flash'),
	User 				   = require('./controllers/User');



/* * * * * * * * * * * * 
 * Initialize Express *
 * * * * * * * * * * * */

var app = express();



/* * * * * * * * * * * * * *
 * Create MySQL connection *
 * * * * * * * * * * * * * */

var connection = db.createConnection();



/* * * * * * * * * * * * * 
 * Passport Configuration *
 * * * * * * * * * * * * * */

//Express Session middleware needs to be configured before passport.session()
app.use(expressSession({ 
	secret: 'lksadfjl2348902340sdfslj3408',
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//use local strategy
passport.use(new passportLocal.Strategy(function(username, password, done) {
	var username = username,
		password = password;

	console.log("local strategy running");	
	
	
	db.login(username, password, connection) //call my db module API and perform login	  
	  .then(function(user) { //the user is sent back as a result of the SQL query from the login() function in the db_module helper
	  	//login success
	  	console.log("promise results: ");
	  	console.log("user id: " + user.id);
	  	console.log("user name: " + user.first_name);
	  	console.log("username: " + user.username);
	  	/* 
		When Passport authenticates a request, it parses the credentials contained in the request. It then 
		invokes the verify callback with those credentials as arguments, in this case username and password. 
		If the credentials are valid, the verify callback invokes done to supply Passport with the user 
		that authenticated. */		
	  	done(null, user);	  	
	  }, function(error) {
	  	//login error
	  	console.log("login error");
	  	console.dir(error);
	  	done(null, false, {message: 'Incorrect username or password.'});
  	});
}));

//serialize user into session - user object passed from 'done' parameter inside local strategy function
passport.serializeUser(function(user, done) {
	console.log("serializing");
	//OKAY. THERE IS NO COOKIE. SESSION IS DONE SERVER SIDE. PASSPORT GIVES YOU ACCESS TO THE SESSION DATA
	//BY ATTACHING A USER OBJECT TO THE CLIENT REQUEST. BUT THERE IS NO CLIENT SIDE SESSION OR COOKIE.
	done(null, user);
});

//called on subsequent requests
passport.deserializeUser(function(user, done) {
	console.log("request being made");
	var id = user.id;
	//perform query to hydrate session object for each request made to express
	connection.query({
		sql: 'SELECT * FROM `users` WHERE `id` = ?',
		timeout: 40000,
		values: [id]
	}, function(error, results) {
		console.log("query callback");
		if(!error) {
			console.log("select results : ");
				console.dir(results);
			var user = results.pop();
			done(null, user);				
		} else {
			done(null, null);
		}
	});


});



/* * * * * * * * * * * * * 
 * Initialize/On Load * *
 * * * * * * * * * * * * */

app.get("/", function(req, res) {	
	res.sendFile(path.join(__dirname, '../client/app/', 'index.html'));	
});


/* * * * * * * * * 
 * Middleware * *
 * * * * * * * */
 
//express use/mount middleware - default path is "/" if none specified as first parameter in app.use()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(flash());

//mount paths for files
app.use('/modules', routes.serveModules());
app.use("/assets", routes.serveAssets());
app.use("/factories", routes.serveFactories());
app.use("/views", routes.serveViews());
app.use("/bower_components", routes.serveBowerComponents());
app.use("/app",routes.serveBaseFiles());



/* * * * * * * * * * 
 * CRUD Operations * 
 * * * * * * * * * * */

 /* "Applications use APIs like humans use websites." */

app.post('/users', User.createUser);

app.get('/users', function(req, res, next) {
	console.log("query id: " + req.query.userID);
	//query object represented as req.query
	var user = connection.query({
		sql: 'SELECT * FROM `users` WHERE `id`= ?',
		timeout:40000,
		values: [req.query.userID]
	}, function(error, results) {
		if(!error) {
			var user = results.pop();
			console.log("get users success: ");
			console.dir(user.first_name);
			return user;
		} else {
			console.error(error);
		}
	});
	console.log("user thing: ");
	console.dir(user);
	next();
	return user;
	
});

app.post('/login', passport.authenticate('local'), function(req, res, next) {
	if(req.user) { //req.user holds the returned session object from the local strategy authentication
		console.log('authentication success');		

		var username  = req.user.username;
		var firstname = req.user.first_name;
		var lastname  = req.user.last_name;
		var userID	  = req.user.id;

		var user = {
			username: username,
			firstname: firstname,
			lastname: lastname
		};
		
		console.log("user: ");
		console.dir(req.user);

		res.cookie('user', user, { httpOnly: false, maxAge: 40000 }); //need to set HTTP only to false in order for client to access server side cookie

		res.json({
			redirect: true,			
			username: username,
			firstname: firstname,
			lastname: lastname 
		});
	}	
});

app.use('/logout', function(req, res, next) {
	console.log("logging out...");
	req.logout();	
	res.clearCookie('user'); //make sure to clear cookie set when user logged in, otherwise pages that require login can still be accessed
	res.redirect('/#/app/login');
	res.end();	
});







/* * * * * * * * * * * * * * * * * 
 * Set up server port and server *
 * * * * * * * * * * * * * * * * * */

//note: browserSync from grunt is using port 3000, so use another port
//for the express server!

var port = process.env.PORT || 8000;
app.listen(port, function() {
	console.log("I'm listening");
});	