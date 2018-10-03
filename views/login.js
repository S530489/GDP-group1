document.getElementById('msgalert').style.display="none";
function cancelFunction(){
  window.alert("test")

}
function closeAlert(){
  document.getElementById('msgalert').style.display="none";
}

function closeAlert1(){
  document.getElementById('msgalert1').style.display="none";
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
        window.alert("user signed out")
        // Sign-out successful.

      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("error:"+errorMessage);
       

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

