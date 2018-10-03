document.getElementById('msgalert').style.display="none";


function logintest(){
        document.getElementById("msgLogin").innerHTML = " Success!!!  User Logged Out";
        document.getElementById("td1").innerHTML = "&times;";
        document.getElementById('msgAlertLogin').style.backgroundColor="LightGreen ";
        document.getElementById('msgAlertLogin').style.display="block";

}
function cancelFunction(){
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
        // Sign-out successful.

      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("error:"+errorMessage);
<<<<<<< HEAD
=======
       
>>>>>>> 86fb69fdda0baf1bfc0174e7009dd0e82395cb00

      }).then(function(){
        
        window.location.href = "http://127.0.0.1:8081/";
        window.alert("User Successfully logged out")
        logintest();    
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

