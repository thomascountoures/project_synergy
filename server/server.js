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
	
	db.login(username, password)
	  .then(function(user) {
	  	//login success
	  	console.log("promise results: ");
	  	console.log("user id: " + user.id);
	  	console.log("user name: " + user.first_name);
	  	console.log("username: " + user.username);
	  	done(null, {id: user.id, username: user.username});
	  }, function(error) {
	  	//login error
	  	console.log("login error");
	  	console.dir(error);
	  	done(null, {message: 'Incorrect username or password.'});
  	});
});

//use local strategy
passport.use(localStrategy);

//serialize user into session
passport.serializeUser(function(user, done) {
	console.log("serialize user: " + user.id);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserializing");
	db.logout(id)
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
	console.log('authentication success');
	console.dir(req.user);
	res.redirect('/dashboard');
});

app.get("/dashboard", function(req, res) {
	console.log("user!");	
	res.sendFile(path.join(__dirname, '../client/app/modules/dashboard', 'dashboard.html'),
	{
		isAuthenticated: req.isAuthenticated(),
		user:req.user
	});
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