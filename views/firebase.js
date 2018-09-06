var name  = document.getElementsByName("f1n")[0].value;
var charname  = document.getElementById("charName1").value;

function submitToFirebase() {
    /*firebase.database().ref('performers/').set({
        Name: name.value,
        CharName: charname.value
      });*/
      var name  = document.getElementsByName("f1n")[0].value;
      var charname  = document.getElementById("charName1").value;
    window.alert(name);

    var firebaseRef = firebase.database().ref();
    
   
    
    firebaseRef.child(name).set(charname);

    window.alert("added to database");

}