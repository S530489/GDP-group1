var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser"); // simplifies access to request body
var app = express();  // make express app
var firebase = require("firebase");
var http = require('http').Server(app);  // inject app into the server
const nodemailer = require('nodemailer');


var config = {
  apiKey: "AIzaSyCYsx1EG2B-MqFLy_h9yew6uxb77ZS5aos",
  authDomain: "costume-designing-system.firebaseapp.com",
  databaseURL: "https://costume-designing-system.firebaseio.com",
  projectId: "costume-designing-system",
  storageBucket: "costume-designing-system.appspot.com",
  messagingSenderId: "923569045734"
};
firebase.initializeApp(config);

var database = firebase.database();

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, 'css'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, 'js'), { maxAge: 31557600000 }));
// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify view engine

app.use(express.static(__dirname + '/views'));

var entries = [];
app.locals.entries = entries; 

// set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(function(req, res, next) {
  console.log("in req.next")
  console.log(typeof req.next);

  next();
});

app.all("/", function (request, response) {
     response.render('login.ejs');
});



app.use(function(req, res, next) {
  console.log("in req.next")
  console.log(typeof req.next);

  next();
});
// handle http GET requests (default)

app.post("/sendabc", function(req, res){
  console.log("dauifkasi")
  const output = `
    <h3>Actor contact and Basic Form. </h3>
    <ul>  
      <p>Hi ${req.body.firstname},</p>
      <p>Please fill the form provided in the below link. This must be completed
      before you visit the office. <a href="http://127.0.0.1:8081/contact"> Click here </a></p>
    </ul>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'projectteam01gdp02@gmail.com', // generated user
        pass: 'project01team'  // generated password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: "rapolushireesha@gmail.com", // sender address
      to: req.body.emailid, // list of receivers
      subject: 'Actor Information form', // Subject line
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.send("Mail sent successfully");
    });
  });


  app.post('/sendfeed', (req, res) => {
    console.log("sending mail")
    var api_key = 'key-770c3cc90056cea80af1cafa3f4079cb';
  var domain = 'sandbox520a2a03c8ae42dcb83afd7b3e7ffdad.mailgun.org';
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
  
    var data = {
      from: req.body.email,
      to: 'S530489@nwmissouri.edu',
      subject: "Mail to Stephie Costume Desinger",
      text: req.body.comments
    };
  
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      if (!error)
        res.send("mail sent sucessfully");
      else
        res.send("mail not sent");
  
    });
  });
  
  const routes = require('./routes/index.js');
  app.use('/', routes);

  http.listen(8081, function () {
    console.log('App is listening on http://127.0.0.1:8081/');

  });

  