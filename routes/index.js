const express = require('express');
const router = express.Router();
var firebase = require("firebase");



router.get("/addPerformer", function (req, res) {
  console.log("user is " + firebase.auth().currentUser);
  var user = firebase.auth().currentUser;
  if (user) {
    var firebaseRef = firebase.database().ref().child("performers");

    firebaseRef.once('value', function (snapshot) {
      res.render('addPerformer.ejs', { performers: snapshot.val() });
    })
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }

});

router.get("/designer", function (req, res) {

  var user = firebase.auth().currentUser;
  if (user) {
    var firebaseRef = firebase.database().ref();

    firebaseRef.once('value', function (snapshot) {
      // console.log(snapshot.val().Events);
      // console.log("testing");
      // console.log(snapshot.val().performers);
      // var size = Object.keys(snapshot.val().ShopPullList).length;
      var shoplist;
      if (snapshot.val().ShopPullList == null) {
        console.log("obj is null")
        shoplist = {};
      }
      else {
        shoplist = snapshot.val().ShopPullList;
      }
      res.render("designerPullList.ejs", { Events: snapshot.val().Events, performers: snapshot.val().performers, ShopPullList: shoplist });
    })

    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


  //res.render("designerPullList.ejs");
});


router.get("/performer", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    res.render("measurementsInfo.ejs");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});

router.get("/accesscode", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    res.render("accesscode.ejs");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});

router.get("/viewmeasurement", function (req, res) {

  var user = firebase.auth().currentUser;
  if (user) {
    res.render("viewmeasurement.ejs");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});
router.get("/registration", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    res.render("registration.ejs");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});


router.get("/createaccount", function (req, res) {

  var user = firebase.auth().currentUser;
  if (user) {
    res.render("createaccount.ejs");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});

router.all("/projectdetails", function (req, res) {

  var user = firebase.auth().currentUser;
  if (user) {
    res.render("projectdetails");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }

});

router.all("/projectdetails/:id", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    console.log(req.params.id)
    res.render("projectdetails");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});


router.get("/contact", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    res.render('contact.ejs');
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});

router.get("/contactPage", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    res.render('contactPage.ejs');
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});

router.all("/forgotpassword", function (req, res) {


  res.render('forgotpassword.ejs');
});
router.get("/sendform", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    res.render("sendform.ejs");
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }


});



router.get("/projects", function (req, res) {
  var user = firebase.auth().currentUser;
  if (user) {
    var firebaseRef = firebase.database().ref();

    firebaseRef.once('value', function (snapshot) {
      // console.log(snapshot.val().Events);
      // console.log("testing");
      // console.log(snapshot.val().performers);
      res.render("projects.ejs", { Events: snapshot.val().Events, performers: snapshot.val().performers });
    })
    user = null;
  }
  else {

    console.log(user);
    res.render("login.ejs");

  }
});


router.post("/performersInfo", function (req, res) {

  console.log("came here")
  var userid = req.body.UserId;
  var userpass = req.body.UserPassword;
  console.log(userid + " " + userpass);
  var count = 0;
 
  firebase.auth().onAuthStateChanged(function (user) {
    console.log("user is "+user);
    if (user) {
      if (count == 0) {
        console.log("logged in");
        count = 1;
        var firebaseRef = firebase.database().ref().child("performers");

        firebaseRef.once('value', function (snapshot) {
          res.render('addPerformer.ejs', { performers: snapshot.val() });
        });
        console.log(count);
      }
    }
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(function () {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(userid, userpass);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error:" + errorMessage);
    })

})

router.all("/logout", function (req, res) {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.

  }).catch(function (error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    console.log("error:" + errorMessage);


  }).then(function () {

    res.render('login.ejs');
    console.log("User Successfully logged out")

  });
})

router.get("/login", function (req, res) {

  res.render("login.ejs");
});

router.use(function (req, res) {
  res.status(404).render('404.ejs');
});






router.post('/sendToDesigner', (req, res) => {
  console.log("sending mail")
  var api_key = 'key-770c3cc90056cea80af1cafa3f4079cb';
  var domain = 'sandbox520a2a03c8ae42dcb83afd7b3e7ffdad.mailgun.org';
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: req.body.email,
    to: 'S530747@nwmissouri.edu',
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

router.post("/sendform", function (req, res) {
  console.log("checking mail")
  var api_key = 'key-770c3cc90056cea80af1cafa3f4079cb';
  var domain = 'sandbox520a2a03c8ae42dcb83afd7b3e7ffdad.mailgun.org';
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: 'Mail Gun <postmaster@sandbox520a2a03c8ae42dcb83afd7b3e7ffdad.mailgun.org>',
    to: 'S530489@nwmissouri.edu',
    subject: "Mail from Stephie Costume Desinger",

    text: "Hi " + req.body.firstname + " " + req.body.lastname + "\n"
      + "please click the below link and fill the measurement form" + "\n\n" +

      "http://firebase/fillmeasurementform.html"
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if (!error)
      res.send("mail sent sucessfully");
    else
      res.send("mail not sent");

  });
});

module.exports = router
function newFunction() {
  return "forgotpassword.ejs";
}

