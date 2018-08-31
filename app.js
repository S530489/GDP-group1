var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser"); // simplifies access to request body
var app = express();  // make express app
var http = require('http').Server(app);  // inject app into the server


// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify view engine
app.use(express.static(__dirname + '/assets'));
// create an array to manage entries
var entries = [];
app.locals.entries = entries; 

// set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// handle http GET requests (default)
app.get("/", function (request, response) {
   
    response.sendfile(path.join(__dirname +"/views/performerInfo.html"));
});

app.get("/performer", function (request, response) {
   
  response.sendfile(path.join(__dirname +"/views/performerInfo.html"));
});

app.get("/contact", function (request, response) {
  response.render('contact');
});

app.get("/sendform", function (request, response) {
   
  response.sendfile(path.join(__dirname +"/views/sendform.html"));
});


app.post("/sendform", function(request,response){
  console.log("checking mail")
  var api_key = 'key-770c3cc90056cea80af1cafa3f4079cb';
  var domain = 'sandbox520a2a03c8ae42dcb83afd7b3e7ffdad.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'Mail Gun <postmaster@sandbox520a2a03c8ae42dcb83afd7b3e7ffdad.mailgun.org>',
    to: 'S530489@nwmissouri.edu',
    subject: "Mail from Stephie Costume Desinger",

    text : "Hi " +request.body.firstname+" "+request.body.lastname+"\n"
    +"please click the below link and fill the measurement form"+"\n\n"+

    "http://firebase/fillmeasurementform.html"
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error)
      response.send("mail sent sucessfully");
    else
      response.send("mail not sent");

  });
});


  http.listen(8081, function () {
    console.log('App is listening on http://127.0.0.1:8081/');

  });