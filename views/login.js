//document.getElementById('msgalert').style.display="none";
function recoverPassword(){
 var resetEmail = document.getElementById("resetEmail").value;
 swal(resetEmail)
 firebase.auth().sendPasswordResetEmail(resetEmail).then(function() {
   swal("Check inbox for email");
}).catch(function(error) {
  swal("something went wrong");
});
}

function logintest(){
        document.getElementById("msgLogin").innerHTML = " Success!!!  User Logged Out";
        document.getElementById("td1").innerHTML = "&times;";
        document.getElementById('msgAlertLogin').style.backgroundColor="LightGreen ";
        document.getElementById('msgAlertLogin').style.display="block";

}
function cancelFunction(){
  window.location.href = "http://127.0.0.1:8081/";

}
function backtologin(){
  window.location.href = "http://127.0.0.1:8081/";

}
function closeAlert(){
  document.getElementById('msgalert').style.display="none";
}

function closeAlert1(){
  document.getElementById('msgAlertLogin').style.display="none";
}


function createAccount(){
  var email=document.getElementById("new_emailid").value;
  var password=document.getElementById("new_passw").value;
  var repassword=document.getElementById("new_repeatpassw").value;
  if(email.indexOf("@") == -1){
    document.getElementById("msg").innerHTML = " WARNING!!!    Invalid Email Format"
    document.getElementById('msgalert').style.backgroundColor="Tomato ";
    document.getElementById('msgalert').style.display="block";
    
    document.getElementById("createUser").reset();
  }
  else if(password!=repassword){
    document.getElementById("msg").innerHTML = " WARNING!!!    Password Missmatch Enter Again"
    document.getElementById('msgalert').style.backgroundColor="Tomato  ";
    document.getElementById('msgalert').style.display="block";
    
    document.getElementById("createUser").reset();
  }
  else{
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  }).then(function(){
    document.getElementById("msg").innerHTML = " Success!!!  User has been created"
    document.getElementById('msgalert').style.backgroundColor="LightGreen";
    document.getElementById('msgalert').style.display="block";

    document.getElementById("createUser").reset();
    
  });

}

  
}
function loginFunction()
{
   
    var userid=document.getElementById("userlogin").value;
    var userpass=document.getElementById("userpwd").value;

    // window.alert(userid);
    // window.alert(userpass);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(userid, userpass);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("error:"+errorMessage);
  }).then(function(){
    initApp();
    
  });
      
}
// firebase.auth().signInWithEmailAndPassword(userid, userpass).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...

//   window.alert("error:"+errorMessage);
// }).then(function(){
//   initApp();
  
// });



function logout(){
    
    firebase.auth().signOut().then(function() {
        // Sign-out successful.

      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        swal("error:"+errorMessage);
       

      }).then(function(){
        
        window.location.href = "http://127.0.0.1:8081/";
        swal("User Successfully logged out")
        logintest();    
      });
      
}

function initApp(){
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.

    console.log(user);
    console.log(name)
  }
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      swal(user);
     document.getElementById("loginMsg").innerHTML = 'User Logged IN';
     window.location.href = "http://127.0.0.1:8081/addPerformer"


    } else {
      // No user is signed in.
     document.getElementById("loginMsg").innerHTML = '';

      
    }
  });
}

