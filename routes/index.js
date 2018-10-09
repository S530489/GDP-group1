const express = require('express');
const router = express.Router();
var firebase = require("firebase");



router.get("/addPerformer", function (req, res) {
  var firebaseRef = firebase.database().ref().child("performers");
    
  firebaseRef.on('value', function(snapshot){
      res.render('addPerformer.ejs',{ performers : snapshot.val()});
    })
 
});




router.get("/designer", function (req, res) {

  var firebaseRef = firebase.database().ref();
    
  firebaseRef.on('value', function(snapshot){
      // console.log(snapshot.val().Events);
      // console.log("testing");
      // console.log(snapshot.val().performers);
      res.render("designerPullList.ejs",{ Events : snapshot.val().Events,performers : snapshot.val().performers});
    })
   
  //response.render("designerPullList.ejs");
});

router.get("/performer", function (request, response) {
   
  response.render("measurementsInfo.ejs");
});

router.get("/viewmeasurement", function (request, response) {
   
  response.render("viewmeasurement.ejs");
});
router.get("/registration", function (request, response) {
   
  response.render("registration.ejs");
});

router.get("/createaccount", function (request, response) {
   
  response.render("createaccount.ejs");
});
router.all("/projectdetails", function (request, response) {
   
  response.render("projectdetails");
});


router.get("/contact", function (request, response) {
  response.render('contact.ejs');
});

router.get("/contactPage", function (request, response) {
   
  response.render('contactPage.ejs');
});

router.get("/sendform", function (request, response) {
   
  response.render("sendform.ejs");
});



router.get("/projects", function (request, response) {

  var firebaseRef = firebase.database().ref();
    
  firebaseRef.on('value', function(snapshot){
      // console.log(snapshot.val().Events);
      // console.log("testing");
      // console.log(snapshot.val().performers);
      response.render("projects.ejs",{ Events : snapshot.val().Events,performers : snapshot.val().performers});
    })
   
  
});

router.get("/login", function (request, response) {
   
  response.render("login.ejs");
});

router.use(function (request, response) {
  response.status(404).render('404.ejs');
});



router.post('/sendToDesigner', (req, res) => {
  const output = `
    <h3>FeedBack and Queries Form </h3>
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
      from: "rka090@gmail.com", // sender address
      to: req.body.emailid, // list of receivers
      subject: 'Feedback from performer', // Subject line
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



router.post("/sendform", function(request,response){
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

module.exports = router
