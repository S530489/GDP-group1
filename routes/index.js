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
   
  response.render("projects.ejs");
});

router.get("/login", function (request, response) {
   
  response.render("login.ejs");
});

router.use(function (request, response) {
  response.status(404).render('404.ejs');
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
