// Listen for form submit

var newKey;
var selectedFile;
var profileImageUrl;

document.getElementById('contactForm').addEventListener('submit', submitForm);

var perCount = firebase.database().ref().child("perfCount");
perCount.on('value', function(snapshot){
    console.log(snapshot.val());
    newKey = snapshot.val()+1;

});


document.getElementById("file1").addEventListener("change", funcTest1);
function funcTest1(){
    selectedFile = event.target.files;
    console.log(selectedFile);
   console.log(selectedFile.name);
}


function uploadTitleImage(){
    
    var uploader = document.getElementById("uploadeBar");
    //document.getElementById("uploadeBar").innerHTML = "Ready to Upload"
    var fileName = selectedFile[0].name;
    var storageRef = firebase.storage().ref('/ProfileImages/' + fileName);
    var uploadTask = storageRef.put(selectedFile[0]);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    uploader.value = progress;
    uploader.setAttribute('data-content', 'Successfully Uploaded : ' +'  '+ progress +"%");
    //uploader.text = progress+"%";
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
   
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      profileImageUrl = downloadURL
    });
  });
  console.log(profileImageUrl)
}



// Submit form
function submitForm(e){
    e.preventDefault();
    // console.log("test");

    var namef = getInputVal('namef');
    var namel = getInputVal('namel');
    var character = getInputVal('charName');
    var phone = getInputVal('phone');
    var age = getInputVal('age');
    var textu=getRadiochecked("textu_y");
    var email=getInputVal('email');
    var hand="";
    if(document.getElementById("right_hand").value=="right")
    {
        hand="right";
    }
    else
    {
        hand="left";
    }
    var weight=getInputVal('weight');
    var height=getInputVal('height');
    var eyeware = getCheckedelements('eyeware');
    // console.log(eyeware);
    var haircolor=getInputVal('haircolor');
    var facialhair=getInputVal('facialHair');
    var pierce=getRadiochecked('pierce_yes');
    var otherpiercing=getInputVal('piercing');
    var tatto=getInputVal('tatto');
    var shoeSize=getInputVal('shoes');
    var danceshoeSize=getInputVal('dshoes');
    var shirtsize=getCheckedelements('shirtsize');
    var pants=getInputVal('pants');
    var bsize=getInputVal('bsize');
    var ring=getInputVal('ring');
    var allergy=getCheckedelements("allergy");
    var eyecolor=getInputVal('eyecolor');
    var medi=getInputVal('medi');
    var sugg=getInputVal('sugg');
    var addr1=getInputVal('addr1');
    var addr2=getInputVal('addr2');
    var country=getInputVal('country');
    

    // console.log(name);
    // console.log(shirtSize);

    saveMessage(namef,namel, character, textu,addr1,addr2,country, phone,email,age,hand,
        weight,height,eyeware,haircolor,facialhair,pierce,otherpiercing,
    tatto,shoeSize,danceshoeSize,shirtsize,pants,ring,bsize,allergy,eyecolor,medi,sugg);

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

function saveMessage(namef,namel, character, textu,addr1,addr2,country, phone,email,age,hand,
                weight,height,eyeware,haircolor,facialhair,pierce,otherpiercing,
            tatto,shoeSize,danceshoeSize,shirtsize,pants,ring,bsize,allergy,eyecolor,medi,sugg){
    var perfRef = firebase.database().ref().child("performers").child(newKey)
    perfRef.set(
       
        {
            general: {
        Performer_Id: "p"+newKey,
        Name:{
            First_Name:namef,
            Last_Name:namel
          },
        Phone:phone,
        Email:email,
        Character_Name:character,
        textu:textu,
        HairColor:haircolor,
        EyeWare:eyeware,
        hand:hand,
        Age:age,
        weight:weight,
        shirtSize:shirtsize,
        height:height,
        weight:weight,
        pants:pants,
        ring:ring,
        facialhair:facialhair,
        pierce:pierce,
        otherpiercing:otherpiercing,
        tatto:tatto,
        shoeSize:shoeSize,
        danceshoeSize:danceshoeSize,
        bsize:bsize,
        Allergies:allergy,
        Address:{
            Address_line1:addr1,
            Address_line2:addr2,
            Country:country
        },
        EyeColor:eyecolor, 
        Medications:medi,
        Suggestions:sugg,
        ProfileImageUrl:profileImageUrl
    },
    measurements:""
    
}
).then(function(){
    perCount.set(newKey);
    document.getElementById('contactForm').reset();
    document.getElementById("uploadeBar").value = 0;
});
 }

 