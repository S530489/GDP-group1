var all_ids = ["heading","First_name","last_name","age","email","pno1","pno2","add1","add2","add3","cname","allergy","eye","hair","ware"];
var global_key;

document.getElementById("measure").hidden = true;
document.getElementById("edit").hidden = true;
document.getElementById('subBtn').style.visibility='hidden';
//document.getElementById("subBtn").hidden = true;
document.getElementById('canBtn').style.visibility='hidden';;


function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

function SubmitToFirebase(){
    
    document.getElementById('subBtn').style.visibility='hidden';
   
    var c_fname =  document.getElementById("First_name").innerHTML;
    var c_lname =  document.getElementById("last_name").innerHTML;
    var c_age =  document.getElementById("age").innerHTML;
    var c_email =  document.getElementById("email").innerHTML;
    var c_pno1 =  document.getElementById("pno1").innerHTML ;
    var c_pno2 =  document.getElementById("pno2").innerHTML ;
    var  c_add1 = document.getElementById("add1").innerHTML;
    var c_add2  =  document.getElementById("add2").innerHTML;
    var c_add3  =  document.getElementById("add3").innerHTML;
    var c_cname= document.getElementById("cname").innerHTML;
    var c_allergy = document.getElementById("allergy").innerHTML;
    var c_eye =  document.getElementById("eye").innerHTML;
    var c_hair = document.getElementById("hair").innerHTML;
    var c_ware= document.getElementById("ware").innerHTML;

    // var PerfId = parseInt(global_key)+1;
    // window.alert(PerfId)
   
    firebase.database().ref().child("performers").child(global_key).child("general").set({
        // username: name,
        // email: email,
        // profile_picture : imageUrl

        
            Performer_Id:"p"+global_key,
            Name:{
              First_Name: c_fname,
              Last_Name:c_lname
            },
            Phone:[c_pno1,c_pno2],
            Email:c_email,
            Character_Name:c_cname,
            Age:c_age,
            Address:{
              Address_line1:c_add1,
              Address_line2:c_add2,
              Country:c_add3
              },
              Allergies:c_allergy,
              HairColor:c_hair,
              EyeColor:c_eye,
              EyeWare:c_ware,
              Medications:"",
              Suggestions:""
            
      });
}

function Cancel(){
    document.getElementById('subBtn').style.visibility='hidden';
    document.getElementById('canBtn').style.visibility='hidden';
   
    }


function edit(){

    if(document.getElementById("accesscode").value=="12345")
    {
     enable();
     document.getElementById('id01').style.display='none'
    }
    else
    {
        alert("wrong password");
    }

}

function disable(){
    document.getElementById("measure").hidden = false;
    document.getElementById("edit").hidden = false;
    document.getElementById('subBtn').style.visibility='hidden';
    document.getElementById('canBtn').style.visibility='hidden';
    for (i = 0; i < all_ids.length; i++){
        document.getElementById(all_ids[i]).contentEditable=false; 
    }
}

function enable(){
    //document.getElementById("FullName").disabled = false;
    document.getElementById('subBtn').style.visibility='visible';
    document.getElementById('canBtn').style.visibility='visible';
    for (i = 0; i < all_ids.length; i++){
        document.getElementById(all_ids[i]).contentEditable=true; 
    }
  
   
}
function getInfo(key ){
    console.log(key);
   
     global_key = key;
   
    
    var firebaseRef = firebase.database().ref().child("performers/"+key);
    firebaseRef.on('value', function(snapshot){
        //console.log(snapshot.val());
        var obj = snapshot.val();
        console.log(obj);
        
        document.getElementById("heading").innerHTML = obj.general.Name.First_Name + "'s "+"Information";
        document.getElementById("First_name").innerHTML = obj.general.Name.First_Name;
        document.getElementById("last_name").innerHTML = obj.general.Name.Last_Name;
        document.getElementById("age").innerHTML = obj.general.Age;
        document.getElementById("email").innerHTML = obj.general.Email;
        document.getElementById("pno1").innerHTML = obj.general.Phone[0]+", ";
        document.getElementById("pno2").innerHTML = obj.general.Phone[1];
        document.getElementById("add1").innerHTML = obj.general.Address.Address_line1;
        document.getElementById("add2").innerHTML = obj.general.Address.Address_line2;
        document.getElementById("add3").innerHTML = obj.general.Address.Country;
        document.getElementById("cname").innerHTML = obj.general.Character_Name;
        document.getElementById("allergy").innerHTML = obj.general.Allergies;
        document.getElementById("eye").innerHTML = obj.general.EyeColor;
        document.getElementById("hair").innerHTML = obj.general.HairColor;
        document.getElementById("ware").innerHTML = obj.general.EyeWare;
        disable();
        //window.location.reload();
    })
    /*
    .then(function(){
        window.location.reload();
    }) .catch(function(err){});
    
*/



   
    


}