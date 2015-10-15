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




/* * * * * * * * * 
 * Middleware * *
 * * * * * * * */
 
//express use/mount middleware - default path is "/" if none specified as first parameter in app.use()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(flash());


//mount paths
app.use('/modules', routes.serveModules());
app.use("/assets", routes.serveAssets());
app.use("/factories", routes.serveFactories());
app.use("/views", routes.serveViews());
app.use("/bower_components", routes.serveBowerComponents());
app.use("/app",routes.serveBaseFiles());




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

//define passport local strategy
var localStrategy = new passportLocal.Strategy(function(username, password, done) {
	var username = username,
		password = password;

	console.log("local strategy running");
	console.dir(db);
	
	//call my db module API and perform login
	db.login(username, password)
	  //the user is sent back as a result of the SQL query from the login() function in the db_module helper
	  .then(function(user) {
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
	  	return done(null, user);	  	
	  }, function(error) {
	  	//login error
	  	console.log("login error");
	  	console.dir(error);
	  	return done(null, false, {message: 'Incorrect username or password.'});
  	});
});

//use local strategy
passport.use(localStrategy);

//serialize user into session - user object passed from 'done' parameter inside local strategy function
passport.serializeUser(function(user, done) {
	console.log("serialize user: " + user.id);
	console.log("serialized user first name: " + user.first_name);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserializing");
	db.deserialize(id)
	.then(function(user) {
		done(null, user);
	}, function(error) {
		done(null, {message: error});
	});
});




/* * * * * * * * * * * * * 
 * Initialize/On Load * *
 * * * * * * * * * * * * */

app.get("/", function(req, res) {	
	res.sendFile(path.join(__dirname, '../client/app/', 'index.html'));
	res.status(200);	
});


/* * * * * * * * * * * * * * * 
 * REST API / CRUD Operations * 
 * * * * * * * * * * * * * *  */

app.post('/api/users', User.createUser);

app.post('/login', passport.authenticate('local'), function(req, res) {
	//req.user holds the returned session object from the local strategy authentication
	console.log('authentication success');
	console.log(req.user.first_name);
	console.log(req.user.message);	
	res.json({
		redirect: true,
		user: req.user
	});
	res.status(200);
});

app.get('/dashboard', function(req, res) {
	console.log("dashboard!");	
	console.log(req.user.first_name);	
	//res.sendFile(path.join(__dirname, '../client/app/modules/dashboard', 'dashboard.html'));
	if(!req.user.id) {
		console.log("not authenticated");
		res.redirect('/login');
	} else {
		res.json({
			user: req.user
		});
	}
	
	//console.dir(user.first_name);
	res.status(200);
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