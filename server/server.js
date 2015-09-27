//define required modules
var express    		 	   = require('express'),
	mysql				   = require('mysql'),
	path 	   		 	   = require('path'),
	passport			   = require('passport'),
	passportLocal		   = require('passport-local'),
	expressSession		   = require('express-session'),
	routes 	   		 	   = require('./routes'),
	bodyParser 		 	   = require('body-parser'),		
	User 				   = require('./controllers/User');

//initialize express
var app = express();	

//express use/mount middleware - default path is "/" if none specified as first parameter in app.use()
app.use(bodyParser.urlencoded({
	extended: false,
	resave: false
}));
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//initalize/on load
app.get("/", function (req, res) {	
	res.sendFile(path.join(__dirname, '../client/app/', 'index.html'),
		{
			isAuthenticated: false,
			user: req.user
		});
	res.status(200);	
});


//mount paths
app.use('/modules', routes.serveModules());
app.use("/assets", routes.serveAssets());
app.use("/factories", routes.serveFactories());
app.use("/views", routes.serveViews());
app.use("/bower_components", routes.serveBowerComponents());
app.use("/app",routes.serveBaseFiles());


//REST API - Users
app.post('/api/users', User.createUser);


//app.post('/api/users', todoRequestsControl)


//note: browserSync from grunt is using port 3000, so use another port
//for the express server!

var port = process.env.PORT || 8000;
app.listen(port, function() {
	console.log("I'm listening");
});	