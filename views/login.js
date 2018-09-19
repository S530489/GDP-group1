// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       document.getElementById("userDiv").style.display="initial";
//       document.getElementById("loginDiv").style.display="none";

//     } else {
//       // No user is signed in.
//       document.getElementById("loginDiv").style.display="initial";
//       document.getElementById("userDiv").style.display="none";

      
//     }
//   });
  
// function loginFunction()
// {
//     var userid=document.getElementById("userlogin").value;
//     var userpass=document.getElementById("userpwd").value;

//     //window.alert(userid);

//     firebase.auth().createUserWithEmailAndPassword(userid, userpass).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;

//         window.alert("error:"+errorMessage);
//         // ...
//       });
// }



