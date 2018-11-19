var performers;
var performersNames = [];
var performerKeys = [];
var newKey;


document.getElementById('measurementform').addEventListener('submit', submitForm);

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
    swal("select performer");
}
}

function submitForm(){
   
    // console.log("test");

    var head = getInputVal('head');
    var neck = getInputVal('neck');
    var armscye = getInputVal('armscye');
    var cbw = getInputVal('cbw');
    var chestrel = getInputVal('chestrel');
    var chestexp=getRadiochecked("chestexp");
    var waistrel=getInputVal('waistrel');
    var waistexp=getInputVal('waistexp');
    var halfGirth=getInputVal('halfGirth');
    var fullGirth = getCheckedelements('fullGirth');
    var inseam_a=getInputVal('inseam_a');
    var inseam_f=getInputVal('inseam_f');
    var name=getInputVal('inputName');


    saveMessage(head,neck,armscye,cbw,chestrel,chestexp,waistrel,waistexp,halfGirth,fullGirth,inseam_a,inseam_f,name);

        // // Clear form
        // document.getElementById('contactForm').reset();
}

function getInputVal(id){
    return document.getElementById(id).value;
}

var checkedValue=null;
function getCheckedelements(id)
{
    var inputElements = document.getElementsByClassName(id);
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
           checkedValue = inputElements[i].value;
           break;
      }
    }
    return checkedValue;
}

function getRadiochecked(id)
{
    var res="";
    if(document.getElementById(id).value=="Yes")
    {
        res="yes";
    }
    else
    {
        res="no";
    }
    return res;
}

function saveMessage(head,neck,armscye,cbw,chestrel,chestexp,waistrel,waistexp,halfGirth,fullGirth,inseam_a,inseam_f,name){
    console.log("saiii")
    var perfRef = firebase.database().ref().child("performers").child(newKey).child("measurements")
    perfRef.set(
       
        {
                performer_id: "p"+newKey,
                form_id: "Fp1",
                name: name,
                play_title: "Love Story",
                role: "Romeo",
                chest: chestrel,
                chestexp: chestexp,
                waist: waistexp,
                waistrel: waistrel,
                inseam: inseam_a,
                outseam: inseam_f,
                sleeve: 10,
                hip: 15,
                shoeSize: 10,
                headCircumference: head,
                neck: neck,
                armscye: armscye,
                centerBackWrist: cbw,
                fullGirth: fullGirth,
                halfGirth: halfGirth
              
    
}
).then(function(){
    document.getElementById('measurementform').reset();
    document.getElementById("head").innerHTML="";
    document.getElementById("neck").innerHTML="";
    document.getElementById("armscye").innerHTML="";
    document.getElementById("cbw").innerHTML="";
    document.getElementById("chestrel").innerHTML="";
    document.getElementById("chestexp").innerHTML="";
    document.getElementById("waistrel").innerHTML="";
    document.getElementById("waistexp").innerHTML="";
    document.getElementById("fullGirth").innerHTML="";
    document.getElementById("halfGirth").innerHTML="";
    document.getElementById("inseam_a").innerHTML="";
    document.getElementById("inseam_f").innerHTML="";

    console.log("submitted")
});
 }


        

 