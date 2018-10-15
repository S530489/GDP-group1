var selectedFile;
var performers;
var performersNames = []
var performerIds = []
var selectedperformerIds = []
var selectedperformerNames = []

function addProject(){
    document.getElementById('id01').style.display='block';
    console.log(performers)

    for (i = 0; i < performers.length; i++) { 
        performersNames.push(performers[i].general.Name.First_Name)
        performerIds.push(performers[i].general.Performer_Id)
    
     }
     console.log(performersNames)
     console.log(performerIds)
     getPerformers();
    
}

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
    selectedperformerIds.push(performerIds[s.selectedIndex-1]);
    selectedperformerNames.push(performersNames[s.selectedIndex-1]);

    for(i=s.selectedIndex-1;i<performerIds.length-1;i++){
        performerIds[i] = performerIds[i+1];
        performersNames[i] = performersNames[i+1];
    }
    performerIds.pop();
    performersNames.pop();
    console.log(selectedperformerIds);
    console.log(selectedperformerNames);
    console.log(performerIds)
    var table=document.getElementsByName("addHere")[0];
    var newrow = table.insertRow(1);
    var cell1=newrow.insertCell(0);
    cell1.innerHTML=text;
    document.getElementById("perfoName").selectedIndex = "0";
    getPerformers();

}
else{
    window.alert("select performer")
}
}








$(document).ready(function(){
   // var firebaseRef = firebase.database().ref().child("Events/");
   var firebaseRef = firebase.database().ref();
   firebaseRefperf = firebaseRef.child("performers");
   firebaseRefperf.on('value', function(snapshot){
    performers = snapshot.val();
   })
   firebaseRefEvents = firebase.database().ref("Events/");
   firebaseRefEvents.on('value', function(snapshot){
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