
function createAccount(){
  var email=document.getElementById("new_emailid").value;
  var password=document.getElementById("new_passw").value;
  window.alert(email);
  window.alert(password);
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  }).then(function(){
    window.alert("entered")
    
  });

  window.alert("notttt")
  
}
function loginFunction()
{
   
    var userid=document.getElementById("userlogin").value;
    var userpass=document.getElementById("userpwd").value;

    // window.alert(userid);
    // window.alert(userpass);
    firebase.auth().signInWithEmailAndPassword(userid, userpass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("error:"+errorMessage);
      }).then(function(){
        initApp();
        
      });
      
}

function logout(){
    
    firebase.auth().signOut().then(function() {
        window.alert("user signed out")
        // Sign-out successful.

      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("error:"+errorMessage);
        window.location.href = "login.ejs";

      });
}

function initApp(){
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     document.getElementById("loginMsg").innerHTML = 'User Logged IN';
     window.location.href = "http://127.0.0.1:8081/addPerformer"


    } else {
      // No user is signed in.
     document.getElementById("loginMsg").innerHTML = '';

      
    }
  });
}

