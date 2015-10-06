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
 * Initialize/On Load * *
 * * * * * * * * * * * * */

app.get("/", function (req, res) {	
	res.sendFile(path.join(__dirname, '../client/app/', 'index.html'),
		{
			//passport adds .isAutheticated method to the request object
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	res.status(200);	
});




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

function localStrategyConfig(username, password, done) {
	var username = username,
		password = password;

	console.log("local strategy running");
	console.dir(db);

	db.loginUser('users', username, password)
	  .then(function(res) {
	  	//login success
	  	return done(null, {username: username});
	  }, function(err) {
	  	//login error
	  	return done(null, null);
  	});
}

var localStrategy = new passportLocal.Strategy(localStrategyConfig);
passport.use(localStrategy);




/* * * * * * * * * * * * * * * 
 * REST API / CRUD Operations * 
 * * * * * * * * * * * * * *  */

app.post('/api/users', User.createUser);
app.post('/login', passport.authenticate('local'), function(req, res) {
	console.log(req.body);
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