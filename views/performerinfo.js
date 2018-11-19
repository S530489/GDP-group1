var all_ids = ["heading", "First_name", "last_name", "age", "email", "pno1", "pno2", "add1", "add2", "add3", "cname", "allergy", "eye", "hair", "ware"];
var global_key;
var cnt = 0;
var performers = [];
var events = [];
var event_names = [];

$(document).ready(function () {

    document.getElementById("measure").hidden = true;
    document.getElementById("edit").hidden = true;
    document.getElementById('profileImage').style.visibility = 'hidden';

    var firebaseRef = firebase.database().ref();
    firebaseRefperf = firebaseRef.child("performers");
    firebaseRefperf.on('value', function (snapshot) {
        performers = snapshot.val();
        console.log(performers);
    });

    firebaseRefEvent = firebaseRef.child("Events");
    firebaseRefEvent.on('value', function (snapshot) {
        events = snapshot.val();
        console.log(events);
    });
    //document.getElementById("profileImage").hidden = true;
});

function CanRemove(rowkey) {
    var remPerformerId = performers[parseInt(rowkey)].general.Performer_Id;
    console.log(remPerformerId);
    for(i=0;i<events.length;i++){
        var curEvent = events[i]
      for(j=0;j<curEvent.Performers.length;j++){
          if(curEvent.Performers[j] == remPerformerId){
              event_names.push(curEvent.Name);
          }
      }
    }
    console.log(event_names);
    if(event_names.length>0)
        return false;
    else{
    return true;
    }
}

function remove(rowKey) {
    // console.log(rowKey);
    // if (CanRemove(rowKey)) {
    //     var index, table = document.getElementById('myTable');
    //     for (var i = 1; i < table.rows.length; i++) {
    //         table.rows[i].cells[1].onclick = function () {
    //             var c = confirm("Are you sure, you want to delete this row?");
    //             if (c === true) {
    //                 index = this.parentElement.rowIndex;
    //                 console.log("index is " + index)
    //                 table.deleteRow(index);
    //                 console.log("rowkey is " + rowKey);
    //                 console.log("performers are ");
    //                 console.log(performers);
    //                 for (j = parseInt(rowKey); j < performers.length - 1; j++) {
    //                     performers[j] = performers[j + 1];
    //                 }
    //                 performers.pop();
    //                 firebase.database().ref().child("performers/").set(performers).then(function () {
    //                     location.reload();
    //                 });
    //             }
    //         };
    //     }
    // }
    // else{
    //     window.alert("Cannot Delete: performer is acting in"+ event_names);
    // }

    if (CanRemove(rowKey)) {
            var index, table = document.getElementById('myTable');
            for (var i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[1].onclick = function () {
                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this performer!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {

                            index = this.parentElement.rowIndex;
                            console.log("index is " + index)
                            table.deleteRow(index);
                            console.log("rowkey is " + rowKey);
                            console.log("performers are ");
                            console.log(performers);
                            for (j = parseInt(rowKey); j < performers.length - 1; j++) {
                                performers[j] = performers[j + 1];
                            }
                            performers.pop();
                            firebase.database().ref().child("performers/").set(performers).then(function () {
                                location.reload();
                            });
                          swal("The selected performer has been deleted!", {
                            icon: "success",
                          });
                        }
                      });
                    };
                }
            }

            else
            {
                swal("Cannot delete!!", "Because the performer is acting in the palys: "+event_names);
            }

}

function removeVisiblity() {
    cnt = parseInt(cnt) + parseInt(1);
    var count = $('#myTable tr').length;
    if (cnt % 2 == 0) {
        for (var i = 1; i < count; i++) {
            document.getElementById("myTable").rows[i].cells[1].style.visibility = "hidden";
        }
    }
    else {
        for (var i = 1; i < count; i++) {
            document.getElementById("myTable").rows[i].cells[1].style.visibility = "visible";
        }
    }

    if (cnt == 3 || cnt == 4) {
        cnt = 1;
    }
}



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

function SubmitToFirebase() {

    document.getElementById('subBtn').style.visibility = 'hidden';

    var c_fname = document.getElementById("First_name").innerHTML;
    var c_lname = document.getElementById("last_name").innerHTML;
    var c_age = document.getElementById("age").innerHTML;
    var c_email = document.getElementById("email").innerHTML;
    var c_pno1 = document.getElementById("pno1").innerHTML;
    var c_pno2 = document.getElementById("pno2").innerHTML;
    var c_add1 = document.getElementById("add1").innerHTML;
    var c_add2 = document.getElementById("add2").innerHTML;
    var c_add3 = document.getElementById("add3").innerHTML;
    var c_cname = document.getElementById("cname").innerHTML;
    var c_allergy = document.getElementById("allergy").innerHTML;
    var c_eye = document.getElementById("eye").innerHTML;
    var c_hair = document.getElementById("hair").innerHTML;
    var c_ware = document.getElementById("ware").innerHTML;
    var sugg = document.getElementById("sugges").innerHTML;
    var medi = document.getElementById("medi").innerHTML;
    var hand = document.getElementById("han").innerHTML;
    var shoe = document.getElementById("shoeSize").innerHTML;
    var dshoe = document.getElementById("dshoeSize").innerHTML;
    var faci = document.getElementById("fhair").innerHTML;
    var pier = document.getElementById("pier").innerHTML;
    var opier = document.getElementById("opier").innerHTML;
    var pant = document.getElementById("pants").innerHTML;
    var ring = document.getElementById("ringS").innerHTML;
    var tatt = document.getElementById("tat").innerHTML;
    var tx = document.getElementById("txtu").innerHTML;

    // var PerfId = parseInt(global_key)+1;
    // window.alert(PerfId)

    firebase.database().ref().child("performers").child(global_key).child("general").set({
        // username: name,
        // email: email,
        // profile_picture : imageUrl


        Performer_Id: "p" + global_key,
        Name: {
            First_Name: c_fname,
            Last_Name: c_lname
        },
        Phone: [c_pno1, c_pno2],
        Email: c_email,
        Character_Name: c_cname,
        Age: c_age,
        Address: {
            Address_line1: c_add1,
            Address_line2: c_add2,
            Country: c_add3
        },
        Allergies: c_allergy,
        HairColor: c_hair,
        EyeColor: c_eye,
        EyeWare: c_ware,
        Medications: medi,
        Suggestions: sugg,
        hand: hand,
        shoeSize: shoe,
        danceshoeSize: dshoe,
        facialhair: faci,
        pierce: pier,
        otherpiercing: opier,
        pants: pant,
        ring: ring,
        tatto: tatt,
        txtu: tx


    });
}

function Cancel() {
    document.getElementById('subBtn').style.visibility = 'hidden';
    document.getElementById('canBtn').style.visibility = 'hidden';
    disable();
}


function edit() {

    var firebaseRef = firebase.database().ref().child("AccessCode");
    firebaseRef.on('value', function(snapshot){
        obj = snapshot.val();

    if (document.getElementById("accesscode").value == obj) {
        swal("You can edit the details of the performer");
        enable();
        document.getElementById('id01').style.display = 'none';
        document.getElementById("accesscode").value="";
    }
    else {
        swal("wrong password");
    }
});

}

function disable() {
    document.getElementById("measure").hidden = false;
    document.getElementById("edit").hidden = false;
    document.getElementById('profileImage').style.visibility = 'visible';
    //document.getElementById("profileImage").hidden = false;
    document.getElementById('subBtn').style.visibility = 'hidden';
    document.getElementById('canBtn').style.visibility = 'hidden';
    for (i = 0; i < all_ids.length; i++) {
        document.getElementById(all_ids[i]).contentEditable = false;
    }


}

function enable() {
    document.getElementById('subBtn').style.visibility = 'visible';
    document.getElementById('canBtn').style.visibility = 'visible';
    for (i = 0; i < all_ids.length; i++) {
        document.getElementById(all_ids[i]).contentEditable = true;
    }

}
function getInfo(key) {
    console.log(key);

    global_key = key;

    document.getElementById("profileImage").src = "";
    var firebaseRef = firebase.database().ref().child("performers/" + key);
    firebaseRef.on('value', function (snapshot) {
        //console.log(snapshot.val());
        var obj = snapshot.val();
        console.log(obj);

        document.getElementById("profileImage").src = obj.general.ProfileImageUrl;
        document.getElementById("heading").innerHTML = obj.general.Name.First_Name + "'s " + "Information";
        document.getElementById("First_name").innerHTML = obj.general.Name.First_Name;
        document.getElementById("last_name").innerHTML = obj.general.Name.Last_Name;
        document.getElementById("age").innerHTML = obj.general.Age;
        document.getElementById("email").innerHTML = obj.general.Email;
        document.getElementById("pno1").innerHTML = obj.general.Phone[0] + ", ";
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
        document.getElementById("sugges").innerHTML = obj.general.Suggestions;
        document.getElementById("medi").innerHTML = obj.general.Medications;
        document.getElementById("han").innerHTML = obj.general.hand;
        document.getElementById("shoeSize").innerHTML = obj.general.shoeSize;
        document.getElementById("dshoeSize").innerHTML = obj.general.danceshoeSize;
        document.getElementById("fhair").innerHTML = obj.general.facialhair;
        document.getElementById("pier").innerHTML = obj.general.pierce;
        document.getElementById("opier").innerHTML = obj.general.otherpiercing;
        document.getElementById("pants").innerHTML = obj.general.pants;
        document.getElementById("ringS").innerHTML = obj.general.ring;
        document.getElementById("tat").innerHTML = obj.general.tatto;
        document.getElementById("txtu").innerHTML = obj.general.txtu;
        disable();

        // appendColumn();

    })
    /*
    .then(function(){
        window.location.reload();
    }) .catch(function(err){});
    
    
*/
    localStorage.setItem("storageName", global_key);
}

function getMeasurements() {
    localKey = localStorage.getItem("storageName");
    // alert("gotcha"+localKey);

    var firebaseRef = firebase.database().ref().child("performers/" + localKey);

    firebaseRef.on('value', function (snapshot) {
        var obj = snapshot.val();
        // alert(obj.general.Name.First_Name);
        document.getElementById("pname").innerHTML = obj.general.Name.First_Name;
        document.getElementById("perf_name").value = obj.general.Name.Last_Name + ", " + obj.general.Name.First_Name;
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

function noteditable_function() {
    document.getElementById('subBtn').style.visibility = 'hidden';
    document.getElementById('canBtn').style.visibility = 'hidden';

    document.getElementById("perf_name").readOnly = true;
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

function editMeasurements() {
    var firebaseRef = firebase.database().ref().child("AccessCode");
    firebaseRef.on('value', function(snapshot){
        obj = snapshot.val();

    if (document.getElementById("accesscode").value == obj) {
        swal("You can edit the performer measurements now");
        enableediting();
        document.getElementById('id02').style.display = 'none';
        document.getElementById("accesscode").value = "";
    }
    else {
        swal("wrong password");
    }

});


}

function enableediting() {
    document.getElementById('subBtn').style.visibility = 'visible';
    document.getElementById('canBtn').style.visibility = 'visible';

    document.getElementById("perf_name").readOnly = false;
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

function submit_to_firebase() {

    document.getElementById('subBtn').style.visibility = 'hidden';
    document.getElementById('canBtn').style.visibility = 'hidden';

    var c_pname = document.getElementById("perf_name").value;
    var c_charname = document.getElementById("character_name").value;
    var c_showtitle = document.getElementById("show_title").value;
    var c_head = document.getElementById("head").value;
    var c_neck = document.getElementById("neck").value;
    var c_armscye = document.getElementById("armscye").value;
    // alert(c_armscye);
    var c_cbw = document.getElementById("centerBack").value;
    var c_chestrel = document.getElementById("chest_relaxed").value;
    var c_exp = document.getElementById("chest_expanded").value;
    var c_wrel = document.getElementById("waist_relaxed").value;
    var c_wexp = document.getElementById("waist_expanded").value;
    var c_hip = document.getElementById("hip").value;
    var c_halfgirth = document.getElementById("half_girth").value;
    var c_fullgirth = document.getElementById("full_girth").value;
    var c_ankle = document.getElementById("inseam_ankle").value;
    var c_floor = document.getElementById("inseam_floor").value;

    localKey = localStorage.getItem("storageName");

    // alert(localKey);

    firebase.database().ref().child("performers").child(localKey).child("measurements").set({
        performer_id: "p" + global_key,
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


    document.getElementById("perf_name").readOnly = true;
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

function cancelFunction() {
    document.getElementById('subBtn').style.visibility = 'hidden';
    document.getElementById('canBtn').style.visibility = 'hidden';

    document.getElementById("perf_name").readOnly = true;
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
