var path = require("path");

var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser"); // simplifies access to request body
var app = express();  // make express app
var http = require('http').Server(app);  // inject app into the server
const nodemailer = require('nodemailer');


//var nStatic = require('node-static');
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify view engine
//var publicDir = path.join(__dirname, '/public');
//app.use(express.static(publicDir));
app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/public/images'));
//app.use(express.static(__dirname + '/assets'));
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

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.firstname}</li>
      <li>Company: ${req.body.lastname}</li>
      <li>Email: ${req.body.emailid}</li>
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
    });
  });



  http.listen(8081, function () {
    console.log('App is listening on http://127.0.0.1:8081/');

  });