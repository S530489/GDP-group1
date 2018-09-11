function getInfo(key, performer ){
    console.log(key);
    var database = firebase.database();
    var firebaseRef = firebase.database().ref().child("performers/"+key);
    firebaseRef.on('value', function(snapshot){
        //console.log(snapshot.val());
        var obj = snapshot.val();
        console.log(obj);
        document.getElementById("heading").innerHTML = "Hello World!";
    }).then(function(){
        window.location.reload()
    }).catch(function(err){});
    


   
    


}