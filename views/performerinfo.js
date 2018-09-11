function getInfo(key, performer ){
    console.log(key);
    var database = firebase.database();
    var firebaseRef = firebase.database().ref().child("performers/"+key);
    firebaseRef.on('value', function(snapshot){
        //console.log(snapshot.val());
        var obj = snapshot.val();
        console.log(obj);
        document.getElementById("heading").innerHTML = obj.general.Name.First_Name + "'s "+"Information";
        document.getElementById("FullName").innerHTML = obj.general.Name.First_Name + " "+ obj.general.Name.Last_Name;
        document.getElementById("age").innerHTML = obj.general.Age;
        document.getElementById("email").innerHTML = obj.general.Email;
        document.getElementById("pno").innerHTML = obj.general.Phone[0]+", "+obj.general.Phone[1];
        document.getElementById("add1").innerHTML = obj.general.Address.Address_line1+ " " +obj.general.Address.Address_line2;
        document.getElementById("add2").innerHTML = obj.general.Address.City+", "+obj.general.Address.State+", "+obj.general.Address.Zip;
        document.getElementById("add3").innerHTML = obj.general.Address.Country;
        document.getElementById("cname").innerHTML = obj.general.Character_Name;
        document.getElementById("allergy").innerHTML = obj.general.Allergies;
        document.getElementById("eye").innerHTML = obj.general.EyeColor;
        document.getElementById("hair").innerHTML = obj.general.HairColor;
        document.getElementById("ware").innerHTML = obj.general.EyeWare;
        //window.location.reload();
    })
    /*
    .then(function(){
        window.location.reload();
    }) .catch(function(err){});
    
*/

   
    


}