var obj;
var exi;
var newacc;
var confacc;

function resetAccessCode()
{
    var firebaseRef = firebase.database().ref().child("AccessCode");
    // alert(firebaseRef);
    firebaseRef.on('value', function(snapshot){
        obj = snapshot.val();
        // alert(obj);
    exi = document.getElementById("existing").value;
    newacc = document.getElementById("newaccess").value;
    confacc = document.getElementById("confirmnew").value;
    
    if(exi!="" || newacc!="" || confacc!="")
    {
    if(exi!=obj)
    {
        alert("access code doesnot match the existing one matches");
    }

    if(newacc!=confacc)
    {
        alert("the new access code and confirm access code doesn't match");
    }
    }

    if(exi == obj && newacc == confacc && newacc!="")
    {
        firebase.database().ref().child("AccessCode").set(newacc);
        document.getElementById("existing").value="";
        document.getElementById("newaccess").value="";
        document.getElementById("confirmnew").value="";
    }

});

}