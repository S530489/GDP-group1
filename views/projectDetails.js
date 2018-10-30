
var performersNames = []
var performerIds = []
var selectedperformerIds = []
var selectedperformerNames = []
var Eventperformers = []
var startperformersNames = []
var startperformerIds = []
var performers;
var table=document.getElementsByName("addHere")[0];
var key;
var MainImageURL;
var MulImageURLS = [];
var projectLocation;

document.getElementById("saveButton").hidden=true;
document.getElementById("cancelButton").hidden=true;

function AddEventToFirebase(){
    
    projectName = document.getElementById("EventName").innerHTML;
    date =  document.getElementById("EventDate").innerHTML;
    projectOrganisers = document.getElementById("EventOrganisers").innerHTML;
    projectDesigners = document.getElementById("EventDesigner").innerHTML;
    projectDescription = document.getElementById("Eventdesc").innerHTML;
    //projectLocation = document.getElementById("location")
    console.log(projectName);
    

    length1 = key+1
    console.log(key);
    firebase.database().ref().child("Events").child(key).set({
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

    }).then(function(){
       location.reload();
    });
}



$(document).ready(function(){
    var x = location.search;
    var performerObj = {}
    key = x.slice(1);
    var firebaseRef = firebase.database().ref();
    firebaseRefperf = firebaseRef.child("performers");
    firebaseRefperf.on('value', function(snapshot){
        performerObj = snapshot.val();
        performers = snapshot.val();
        console.log(performers)
        for (i = 0; i < performers.length; i++) { 
            startperformersNames.push(performers[i].general.Name.First_Name)
            startperformerIds.push(performers[i].general.Performer_Id)
        
         }
         
    })
    firebaseRefEvents = firebaseRef.child("Events/");
    firebaseRefEvents.on('value', function(snapshot){
        var currentObject;
        var obj = snapshot.val()
        for(i=0;i<obj.length;i++){
            console.log(obj[i].Event_Id)
            if(obj[i].Event_Id === key){
                currentObject = obj[i];
                break;
            }
        }

    // var currentObject = snapshot.val();
    console.log(currentObject);
    projectLocation = currentObject.PlayLocation;
    MainImageURL = currentObject.mainImage_Url;
    var currentRow;
    var lie = document.createElement("li");
    $(lie).attr('data-target', "#myCarousel");
    $(lie).attr('data-slide-to', 0);
    $(lie).addClass("active");
    $("#indicators").append(lie);
    for(i=0;i<currentObject.otherImages_Url.length;i++){
        console.log(currentObject.otherImages_Url[i]);
        MulImageURLS[i] = currentObject.otherImages_Url[i];
        var lie1 = document.createElement("li");
        $(lie1).attr('data-target', "#myCarousel");
        $(lie1).attr('data-slide-to', i+1);
        // $(lie).addClass("active");
        $("#indicators").append(lie1);
    }
    /*
    <div class="item active">
        <img src="images/sample.jpg" alt="Image">      
      </div> */
    var col = document.createElement("div");
    $(col).addClass("item");
    $(col).addClass("active");
    var image = document.createElement("img");
    image.src = currentObject.mainImage_Url;
    $(image).attr('alt', "Image");
    $(col).append(image);
    $("#roleImages").append(col);
    for(i=0;i<currentObject.otherImages_Url.length;i++){
        console.log(currentObject.otherImages_Url[i]);
        var col1 = document.createElement("div");
        $(col1).addClass("item");
        var image1 = document.createElement("img");
        image1.src = currentObject.otherImages_Url[i];
        $(image1).attr('alt', "Image");
        $(col1).append(image1);
        $("#roleImages").append(col1);
    }
    document.getElementById("EventName").innerHTML = currentObject.Name;
    document.getElementById("Eventdesc").innerHTML = currentObject.Description;
    document.getElementById("EventDesigner").innerHTML = currentObject.Designers;
    document.getElementById("EventOrganisers").innerHTML = currentObject.Organizers;
    document.getElementById("EventDate").innerHTML  =  currentObject.Date;
    document.getElementById("date").innerHTML = currentObject.Date;
    document.getElementById("Address").innerHTML = currentObject.PlayLocation;
     for (i = 0; i < currentObject.Performers.length; i++) { 
            var k = currentObject.Performers[i][1];
            selectedperformerIds.unshift(performerObj[k].general.Performer_Id);
            selectedperformerNames.unshift(performerObj[k].general.Name.First_Name);
            
            //document.getElementById("perfNames").innerHTML += performerObj[k].general.Name.First_Name+"<br/>"
        }

        for (i=selectedperformerIds.length-1;i>=0;i--){
            var newrow = table.insertRow(1);
            var cell1=newrow.insertCell(0);
            var cell2=newrow.insertCell(1);
            cell1.innerHTML=selectedperformerNames[i];
            cell2.innerHTML = "x"+remove();
        }

        console.log(projectLocation);
        console.log(MainImageURL);
        console.log(MulImageURLS)
        fixPerformers();
        
    
    });
    
  
    

});
var count;
function fixPerformers(){
    for (i=0;i<startperformerIds.length;i++){
        count = 0;
        for(j=0;j<selectedperformerIds.length;j++){
            if(startperformerIds[i] == selectedperformerIds[j]){
              count++;
            }
        }
        
        if(count==0){
            performerIds.push(startperformerIds[i]);
            performersNames.push(startperformersNames[i]);
        }
    }
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

function editProject()
{

    document.getElementById("editProj").hidden=true;
    document.getElementById("saveButton").hidden=false;
    document.getElementById("cancelButton").hidden=false;

    document.getElementById("EventName").contentEditable=true;
    document.getElementById("EventName").style.background = "#BC8F8F";
    document.getElementById("Eventdesc").contentEditable=true;
    document.getElementById("Eventdesc").style.background = "#BC8F8F";
    document.getElementById("EventDesigner").contentEditable=true;
    document.getElementById("EventDesigner").style.background = "#BC8F8F";
    document.getElementById("EventOrganisers").contentEditable=true;
    document.getElementById("EventOrganisers").style.background = "#BC8F8F";
    document.getElementById("EventDate").contentEditable=true;
    document.getElementById("EventDate").style.background = "#BC8F8F";
    
}

function cancelFunction()
{

    document.getElementById("editProj").hidden=false;
    document.getElementById("saveButton").hidden=true;
    document.getElementById("cancelButton").hidden=true;

    document.getElementById("EventName").contentEditable=false;
    document.getElementById("EventName").style.background = "#F5F5DC";
    document.getElementById("Eventdesc").contentEditable=false;
    document.getElementById("Eventdesc").style.background = "#F5F5DC";
    document.getElementById("EventDesigner").contentEditable=false;
    document.getElementById("EventDesigner").style.background = "#F5F5DC";
    document.getElementById("EventOrganisers").contentEditable=false;
    document.getElementById("EventOrganisers").style.background = "#F5F5DC";
    document.getElementById("EventDate").contentEditable=false;
    document.getElementById("EventDate").style.background = "#F5F5DC";
    
}

