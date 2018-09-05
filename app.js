var path = require("path");

var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser"); // simplifies access to request body
var app = express();  // make express app
var http = require('http').Server(app);  // inject app into the server



// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify view engine
app.use(express.static(__dirname + '/views'));
// create an array to manage entries
var entries = [];
app.locals.entries = entries; 

// set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./routes/index.js');
app.use('/', routes);


// handle http GET requests (default)



  http.listen(8081, function () {
    console.log('App is listening on http://127.0.0.1:8081/');

  });