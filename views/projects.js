var selectedMulFiles;
var selectedFile;
var performers;
var events;
var performersNames = []
var performerIds = []
var selectedperformerIds = []
var selectedperformerNames = []
var MainImageURL ;
var MulImageURLS = [];
var sortByDate;
var countCross = 1;
  


function AddEventToFirebase(){
    
    projectName = document.getElementById("projName").value;
    date =  document.getElementById("myDate").value;
    projectOrganisers = document.getElementById("organisers").value;
    projectDesigners = document.getElementById("designers").value;
    projectDescription = document.getElementById("desc").value;
    projectLocation = document.getElementById("location").value

    length1 = events.length+1
    events.push(
        {        
            Event_Id:"E"+length1,
            Name: projectName,
            Date: date,
            Organizers: projectOrganisers,
            Designers: projectDesigners,
            Performers: selectedperformerIds,
            mainImage_Url:MainImageURL,
            otherImages_Url:MulImageURLS,
            Description: projectDescription,
            PlayLocation: projectLocation
            
      }
    )
   
    console.log(events);
    firebase.database().ref().child("Events/").set(events).then(function(){
        document.getElementById('id01').style.display='none';
       location.reload();
    });
}

$(document).ready(function(){

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#EventHolder div").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
   // var firebaseRef = firebase.database().ref().child("Events/");
   pageLoad();
       
})

function getOption(){
    var s = document.getElementsByName("sorting")[0];
    var text = s.options[s.selectedIndex].text;
    console.log(text);
    console.log(s.selectedIndex);
    sortByDate = s.selectedIndex;
    pageLoad();
}

function pageLoad(){
    var firebaseRef = firebase.database().ref();
    firebaseRefperf = firebaseRef.child("performers");
    firebaseRefperf.on('value', function(snapshot){
     performers = snapshot.val();
    })
    firebaseRefEvents = firebase.database().ref("Events/");
    firebaseRefEvents.on('value', function(snapshot){
         var obj = snapshot.val();
         console.log(obj);
         events = snapshot.val();
         if(sortByDate==1){
            obj.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                //return new Date(b.date) - new Date(a.date);
                console.log(new Date(b.Date));
                return new Date(a.Date) - new Date(b.Date);
              });
         }
         $("#EventHolder").empty();
         countCross =1;
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
             $(col).addClass("col-md-5");
             var cent =  document.createElement("center");
             var cards = document.createElement("div");
             $(cards).addClass("card");
             var image = document.createElement("img");
             image.src = currentObject.mainImage_Url;
            // $(image).css("width", "100%");
             image.setAttribute("width","100%");
             image.setAttribute("height","245");
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
            var event_Id = "\""+currentObject.Event_Id+"\"";
            var func = "getEventInformation("+event_Id+")";
            $(butn).attr('onClick', func);
            $(cards).append(image);
            $(cards).append(header);
            $(cards).append(desc);
            $(cards).append(butn);
            $(col).append(cards);
            
            var col1 = document.createElement("div");
             $(col1).addClass("col-md-1");
             var para = document.createElement("p")
             para.innerHTML = "X";
             var func1 = "removeProject("+event_Id+")";
             $(para).attr('onClick',func1);
             var pp = "cross"+countCross;
             $(para).attr('id', pp);
             countCross+=1;
             para.style.visibility = "hidden";
             para.style.color = "red";
             para.style.cursor = "pointer";
             para.style.fontWeight = "bold";
             $(col1).append(para);

             $(currentRow).append(col);
             $(currentRow).append(col1);
    
         }
        
         
     
     });
   
}

function removeProject(key){
    window.alert(key);

}
function removeVisiblity(){
    for(i=1;i<countCross;i++){
        var pp = "cross"+i;
        document.getElementById(pp).style.visibility = "visible";
    }
}


function getEventInformation(key){
    //window.alert(key);
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

function addProject(){
    document.getElementById('id01').style.display='block';

    for (i = 0; i < performers.length; i++) { 
        performersNames.push(performers[i].general.Name.First_Name)
        performerIds.push(performers[i].general.Performer_Id)
    
     }
    //  console.log(performersNames)
    //  console.log(performerIds)
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
    selectedperformerIds.unshift(performerIds[s.selectedIndex-1]);
    selectedperformerNames.unshift(performersNames[s.selectedIndex-1]);

    for(i=s.selectedIndex-1;i<performerIds.length-1;i++){
        performerIds[i] = performerIds[i+1];
        performersNames[i] = performersNames[i+1];
    }
    performerIds.pop();
    performersNames.pop();
    // console.log(selectedperformerIds);
    // console.log(selectedperformerNames);
    var table=document.getElementsByName("addHere")[0];
    var newrow = table.insertRow(1);
    var cell1=newrow.insertCell(0);
    var cell2=newrow.insertCell(1);
    cell1.innerHTML=text;
    cell2.innerHTML = "x"+remove();
    document.getElementById("perfoName").selectedIndex = "0";
    getPerformers();

}
else{
    window.alert("select performer")
}
}


function remove(){
    var index, table = document.getElementById('dplist1');
for(var i = 1; i < table.rows.length; i++)
{
    table.rows[i].cells[1].onclick = function()
    {
            index = this.parentElement.rowIndex;
            console.log(index)
            table.deleteRow(index);
            performersNames.push(selectedperformerNames[index-1]);
            performerIds.push(selectedperformerIds[index-1]);
            console.log(performerIds);
            console.log(performersNames);
            for(i=index-1;i<selectedperformerIds.length-1;i++){
                selectedperformerIds[i] = selectedperformerIds[i+1];
                selectedperformerNames[i] = selectedperformerNames[i+1];
            }
            selectedperformerIds.pop();
            selectedperformerNames.pop();

    // console.log(selectedperformerIds);
    // console.log(selectedperformerNames);
    getPerformers();
          
    };  
}

    
    return "";
}


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
    var storageRef = firebase.storage().ref('/testImages/' + fileName);
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
      MainImageURL = downloadURL
    });
  });
  console.log(MainImageURL)
}








document.getElementById("file123").addEventListener("change", funcTest123);
function funcTest123(){
    selectedMulFiles = event.target.files;
    console.log(selectedMulFiles);
   console.log(selectedMulFiles.name);
}

function callUploadImage(){
    for (i=0;i<selectedMulFiles.length;i++){
        uploadMulImage(i);
    }
}

function uploadMulImage(){
    
    var uploader = document.getElementById("uploadeMulBar");
    var fileName = selectedMulFiles[i].name;
    console.log(fileName)
    var storageRef = firebase.storage().ref('/testImages/' + fileName);
    var uploadTask = storageRef.put(selectedMulFiles[i]);
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
   // uploader.text = progress+"%";
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
      MulImageURLS.push(downloadURL);
    });
  });
}