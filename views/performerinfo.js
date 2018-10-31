var all_ids = ["heading","First_name","last_name","age","email","pno1","pno2","add1","add2","add3","cname","allergy","eye","hair","ware"];
var global_key;



$(document).ready(function(){
   
document.getElementById("measure").hidden = true;
document.getElementById("edit").hidden = true;
document.getElementById('profileImage').style.visibility='hidden';
//document.getElementById("profileImage").hidden = true; 
});
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
    disable();
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
    document.getElementById('profileImage').style.visibility='visible';
    //document.getElementById("profileImage").hidden = false;
    document.getElementById('subBtn').style.visibility='hidden';
    document.getElementById('canBtn').style.visibility='hidden';
    for (i = 0; i < all_ids.length; i++){
        document.getElementById(all_ids[i]).contentEditable=false; 
    }
        
    
}

function enable(){
    document.getElementById('subBtn').style.visibility='visible';
    document.getElementById('canBtn').style.visibility='visible';
    for (i = 0; i < all_ids.length; i++){
        document.getElementById(all_ids[i]).contentEditable=true; 
    }
  
}
function getInfo(key){
    console.log(key);
   
     global_key = key;
   
     document.getElementById("profileImage").src = "";
    var firebaseRef = firebase.database().ref().child("performers/"+key);
    firebaseRef.on('value', function(snapshot){
        //console.log(snapshot.val());
        var obj = snapshot.val();
        console.log(obj);
        
        document.getElementById("profileImage").src = obj.general.ProfileImageUrl; 
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
        document.getElementById("height").innerHTML = obj.general.height;
        document.getElementById("weight").innerHTML = obj.general.weight;
        document.getElementById("shirtSize").innerHTML = obj.general.shirtSize;
        disable();

        appendColumn();
        
    })
    /*
    .then(function(){
        window.location.reload();
    }) .catch(function(err){});
    
    
*/
localStorage.setItem("storageName",global_key);
}

function getMeasurements()
{
    localKey=localStorage.getItem("storageName");
    // alert("gotcha"+localKey);
    
    var firebaseRef = firebase.database().ref().child("performers/"+localKey);
   
    firebaseRef.on('value', function(snapshot){
        var obj = snapshot.val();
        // alert(obj.general.Name.First_Name);
        document.getElementById("pname").innerHTML=obj.general.Name.First_Name;
        document.getElementById("perf_name").value = obj.general.Name.Last_Name+", "+obj.general.Name.First_Name;
        document.getElementById("character_name").value = obj.measurements.role;
        document.getElementById("show_title").value = obj.measurements.play_title;
        document.getElementById("head").value = obj.measurements.headCircumference;
        document.getElementById("neck").value = obj.measurements.neck;
        document.getElementById("armscye").value = obj.measurements.armscye;
        document.getElementById("centerBack").value = obj.measurements.centerBackWrist;
        document.getElementById("chest_relaxed").value = obj.measurements.chest;
        document.getElementById("chest_expanded").value = obj.measurements.chest;
        document.getElementById("waist_relaxed").value = obj.measurements.waist;
        document.getElementById("waist_expanded").value = obj.measurements.waist;
        document.getElementById("hip").value = obj.measurements.hip;
        document.getElementById("half_girth").value = obj.measurements.halfGirth;
        document.getElementById("full_girth").value = obj.measurements.fullHip;
        document.getElementById("inseam_ankle").value = obj.measurements.inseam;
        document.getElementById("inseam_floor").value = obj.measurements.outseam;

        noteditable_function();
    })
    
}

function noteditable_function()
{
    document.getElementById('subBtn').style.visibility='hidden';
    document.getElementById('canBtn').style.visibility='hidden';

        document.getElementById("perf_name").readOnly=true;
        document.getElementById("character_name").readOnly = true;
        document.getElementById("show_title").readOnly = true;
        document.getElementById("head").readOnly = true;
        document.getElementById("neck").readOnly = true;
        document.getElementById("armscye").readOnly = true;
        document.getElementById("centerBack").readOnly = true;
        document.getElementById("chest_relaxed").readOnly = true;
        document.getElementById("chest_expanded").readOnly = true;
        document.getElementById("waist_relaxed").readOnly = true;
        document.getElementById("waist_expanded").readOnly = true;
        document.getElementById("hip").readOnly = true;
        document.getElementById("half_girth").readOnly = true;
        document.getElementById("full_girth").readOnly = true;
        document.getElementById("inseam_ankle").readOnly = true;
        document.getElementById("inseam_floor").readOnly = true;
}

function editMeasurements(){

    if(document.getElementById("accesscode").value=="12345")
    {
     enableediting();
     document.getElementById('id02').style.display='none'
    }
    else
    {
        alert("wrong password");
    }

}

function enableediting(){
    document.getElementById('subBtn').style.visibility='visible';
    document.getElementById('canBtn').style.visibility='visible';

        document.getElementById("perf_name").readOnly=false;
        document.getElementById("character_name").readOnly = false;
        document.getElementById("show_title").readOnly = false;
        document.getElementById("head").readOnly = false;
        document.getElementById("neck").readOnly = false;
        document.getElementById("armscye").readOnly = false;
        document.getElementById("centerBack").readOnly = false;
        document.getElementById("chest_relaxed").readOnly = false;
        document.getElementById("chest_expanded").readOnly = false;
        document.getElementById("waist_relaxed").readOnly = false;
        document.getElementById("waist_expanded").readOnly = false;
        document.getElementById("hip").readOnly = false;
        document.getElementById("half_girth").readOnly = false;
        document.getElementById("full_girth").readOnly = false;
        document.getElementById("inseam_ankle").readOnly = false;
        document.getElementById("inseam_floor").readOnly = false;
}

function submit_to_firebase(){
    
    document.getElementById('subBtn').style.visibility='hidden';
    document.getElementById('canBtn').style.visibility='hidden';

    var c_pname =  document.getElementById("perf_name").value;
    var c_charname =  document.getElementById("character_name").value;
    var c_showtitle =  document.getElementById("show_title").value;
    var c_head =  document.getElementById("head").value;
    var c_neck =  document.getElementById("neck").value ;
    var c_armscye =  document.getElementById("armscye").value ;
    // alert(c_armscye);
    var c_cbw = document.getElementById("centerBack").value;
    var c_chestrel =  document.getElementById("chest_relaxed").value;
    var c_exp  =  document.getElementById("chest_expanded").value;
    var c_wrel= document.getElementById("waist_relaxed").value;
    var c_wexp = document.getElementById("waist_expanded").value;
    var c_hip =  document.getElementById("hip").value;
    var c_halfgirth = document.getElementById("half_girth").value;
    var c_fullgirth= document.getElementById("full_girth").value;
    var c_ankle= document.getElementById("inseam_ankle").value;
    var c_floor= document.getElementById("inseam_floor").value;

    localKey=localStorage.getItem("storageName");

    // alert(localKey);
   
    firebase.database().ref().child("performers").child(localKey).child("measurements").set({        
        performer_id: "p"+global_key,
        form_id: "Fp1",
        name: c_pname,
        play_title: c_showtitle,
        role: c_charname,
        chest: c_chestrel,
        chestexp: c_exp,
        waist: c_wexp,
        waistrel: c_wrel,
        inseam: c_ankle,
        outseam: c_floor,
        sleeve: 10,
        hip: c_hip,
        shoeSize: 10,
        headCircumference: c_head,
        neck: c_neck,
        armscye: c_armscye,
        centerBackWrist: c_cbw,
        fullGirth: c_fullgirth,
        halfGirth: c_halfgirth
            
      });


        document.getElementById("perf_name").readOnly=true;
        document.getElementById("character_name").readOnly = true;
        document.getElementById("show_title").readOnly = true;
        document.getElementById("head").readOnly = true;
        document.getElementById("neck").readOnly = true;
        document.getElementById("armscye").readOnly = true;
        document.getElementById("centerBack").readOnly = true;
        document.getElementById("chest_relaxed").readOnly = true;
        document.getElementById("chest_expanded").readOnly = true;
        document.getElementById("waist_relaxed").readOnly = true;
        document.getElementById("waist_expanded").readOnly = true;
        document.getElementById("hip").readOnly = true;
        document.getElementById("half_girth").readOnly = true;
        document.getElementById("full_girth").readOnly = true;
        document.getElementById("inseam_ankle").readOnly = true;
        document.getElementById("inseam_floor").readOnly = true;
}

function cancelFunction()
{
    document.getElementById('subBtn').style.visibility='hidden';
    document.getElementById('canBtn').style.visibility='hidden';

        document.getElementById("perf_name").readOnly=true;
        document.getElementById("character_name").readOnly = true;
        document.getElementById("show_title").readOnly = true;
        document.getElementById("head").readOnly = true;
        document.getElementById("neck").readOnly = true;
        document.getElementById("armscye").readOnly = true;
        document.getElementById("centerBack").readOnly = true;
        document.getElementById("chest_relaxed").readOnly = true;
        document.getElementById("chest_expanded").readOnly = true;
        document.getElementById("waist_relaxed").readOnly = true;
        document.getElementById("waist_expanded").readOnly = true;
        document.getElementById("hip").readOnly = true;
        document.getElementById("half_girth").readOnly = true;
        document.getElementById("full_girth").readOnly = true;
        document.getElementById("inseam_ankle").readOnly = true;
        document.getElementById("inseam_floor").readOnly = true;

        getMeasurements();
}

function remove()
{
var index, table = document.getElementById('myTable');
for(var i = 1; i < table.rows.length; i++)
{
    table.rows[i].cells[1].onclick = function()
    {
        var c = confirm("Are you sure, you want to delete this row?");
        if(c === true)
        {
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
        }   
    };  
}

        document.getElementById("heading").innerHTML = "Performer's "+"Information";
        document.getElementById("First_name").innerHTML = "";
        document.getElementById("last_name").innerHTML = "";
        document.getElementById("age").innerHTML = "";
        document.getElementById("email").innerHTML = "";
        document.getElementById("pno1").innerHTML = "";
        document.getElementById("pno2").innerHTML = "";
        document.getElementById("add1").innerHTML = "";
        document.getElementById("add2").innerHTML = "";
        document.getElementById("add3").innerHTML = "";
        document.getElementById("cname").innerHTML = "";
        document.getElementById("allergy").innerHTML = "";
        document.getElementById("eye").innerHTML = "";
        document.getElementById("hair").innerHTML = "";
        document.getElementById("ware").innerHTML = "";
}

function removeVisiblity()
{
    var count = $('#myTable tr').length;
                    for(var i=1;i<count;i++){
                    document.getElementById("myTable").rows[i].cells[1].style.visibility="visible";
                    }
}