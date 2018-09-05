var name  = document.getElementById("name");
var charname  = document.getElementById("charName");
function submitToFirebase() {

    /*firebase.database().ref('performers/').set({
        Name: name.value,
        CharName: charname.value
      });*/
    

    var firebaseRef = firebase.database().ref();
    var nametext = name.value;
    console.log(nametext);
    firebaseRef.push().set(nametext);

}