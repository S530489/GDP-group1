var performers;
var performersNames = [];
var performerKeys = [];
var newKey;
$(document).ready(function(){
    // var firebaseRef = firebase.database().ref().child("Events/");
    var firebaseRef = firebase.database().ref();
    firebaseRefperf = firebaseRef.child("performers");
    firebaseRefperf.on('value', function(snapshot){
     performers = snapshot.val();
     for (i = 0; i < performers.length; i++) { 
        if(performers[i].measurements == ""){
            performersNames.push(performers[i].general.Name.First_Name)
            performerKeys.push(i);
        }
    
     }
     getPerformers();
    })
    
   

});



function getPerformers(){
    var modelList = document.getElementById("perfoName");
    while (modelList.options.length - 1) {
        modelList.remove(1);
   }
    if (performersNames) {
        var i;
        for (i = 0; i < performersNames.length; i++) {
            var perf = new Option(performersNames[i], i);
            modelList.options.add(perf);
    }
   }
}


function addrow(){
    
    var s = document.getElementsByName("names")[0];
    if (s.selectedIndex > 0){
    var text = s.options[s.selectedIndex].text;
    console.log(s.selectedIndex)

    
    document.getElementById("inputName").value = text;
    
    newKey = performerKeys[s.selectedIndex-1];
    console.log(newKey)
    document.getElementById("perfoName").selectedIndex = "0";

}
else{
    window.alert("select performer")
}
}

        

 