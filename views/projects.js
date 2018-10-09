var selectedFile;

$(document).ready(function(){
   // var firebaseRef = firebase.database().ref().child("Events/");
    var firebaseRef = firebase.database().ref("Events/");
    firebaseRef.on('value', function(snapshot){
        var obj = snapshot.val();
        console.log(obj);
        var keys = Object.keys(obj);
        console.log(keys);
        var currentRow;
        for(i=0;i<keys.length;i++){
            var currentObject = obj[keys[i]];
            console.log(currentObject);
            if(i%2 == 0){
                var break1 = document.createElement("br");
                var break2 = document.createElement("br");
                $("#EventHolder").append(break1);
                $("#EventHolder").append(break2);
                currentRow = document.createElement("div");
                $(currentRow).addClass("row");
                currentRow = document.createElement("div");
                $(currentRow).addClass("row");
                $("#EventHolder").append(currentRow);
            }
            var col = document.createElement("div");
            $(col).addClass("col-md-6");
            var cards = document.createElement("div");
            $(cards).addClass("card");
            var image = document.createElement("img");
            image.src = currentObject.mainImage_Url;
            $(image).css("width", "100%");
           // image.setAttribute("alt","Your text here");
           var header = document.createElement("h3");
           var msg = document.createElement("i");
           var t = document.createTextNode(currentObject.Name);
           msg.appendChild(t);
           header.appendChild(msg);
           var desc = document.createElement("p");
           $(desc).addClass("description");
           desc.innerHTML = currentObject.Description;
           $(desc).addClass("description");
           var butn = document.createElement("button");
           $(butn).attr('id', i);
           butn.innerHTML = "Read more..&rarr;";
           var func = "getEventInformation("+i+")";
           $(butn).attr('onClick', func);
           $(cards).append(image);
           $(cards).append(header);
           $(cards).append(desc);
           $(cards).append(butn);
           $(col).append(cards);
           $(currentRow).append(col);
   
        }
       
        
    
    });
       
})

function getEventInformation(key){
    window.alert(key);
    window.location.href = "projectdetails?"+key
}


function retreive(){
    window.alert("come");
    var storageRef = firebase.storage().ref('/testImages/' + 'Screenshot (40).png');
    storageRef.getDownloadURL().then(function(url){
        var img = document.getElementById('testImage');
        img.src = url;
        }).catch(function(error) {
    });
}



document.getElementById("file123").addEventListener("change", funcTest);
function funcTest(){
    selectedFile = event.target.files[0];
    console.log(selectedFile);
   console.log(selectedFile.name);
}
// $("#file1").on("change", function(event){
//     selectedFile = event.target.files[0];
//     console.log(selectedFile);
//     console.log(selectedFile.name);

// })

function test(){
    window.alert("sai");
    var fileName = selectedFile.name;
    var storageRef = firebase.storage().ref('/testImages/' + fileName);
    var uploadTask = storageRef.put(selectedFile);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
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
    });
  });
}