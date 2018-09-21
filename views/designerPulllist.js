
var performers = {}


function getPerfomers(ind){
    console.log(performers)
    key = document.getElementById("mySelect").value;
    var firebaseRef = firebase.database().ref().child("Events/"+key);
    firebaseRef.on('value', function(snapshot){
    
        var obj = snapshot.val();
        var EventPerformers = []
        var EventPerformersNames = []
        for (i = 0; i < obj.Performers.length; i++) { 
            console.log(obj.Performers[i][1])
            var k = obj.Performers[i][1]
            EventPerformers.push(performers[k])
            EventPerformersNames.push(performers[k].general.Name.First_Name)
        }
        //  console.log(EventPerformers)
        // console.log(EventPerformersNames) 
        var modelList = document.getElementById("perfoName");
        while (modelList.options.length - 1) {
             modelList.remove(1);
        }
        if (EventPerformersNames) {
            var i;
            for (i = 0; i < EventPerformersNames.length; i++) {
                var perf = new Option(EventPerformersNames[i], i);
                modelList.options.add(perf);
        }
    }
       
    })
    
    
    getTitle()
}

function getName()
{
    var s = document.getElementsByName("names")[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showName").innerHTML = text;
    document.getElementById("perfoName").selectedIndex = "0";
}

function getClothingitem()
{
    var s = document.getElementsByName("clothing")[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showclothing").innerHTML = text;

}

function getColor()
{
    var s = document.getElementsByName("colors")[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showcolor").innerHTML = text;
}

function addrow()
{
    var title=getTitle();
    var show=getName();
    var color=document.getElementById("showcolor").innerHTML;
    var clothing=document.getElementById("showclothing").innerHTML;
    var charname=document.getElementById("character").innerHTML;
    // var charname=$('#my-contenteditable-div').html();;
    var size=document.getElementById("size").innerHTML;
    var notes=document.getElementById("notes").innerHTML;

    var table=document.getElementsByName("addHere")[0];
    var newrow = table.insertRow(1);
    var cell1=newrow.insertCell(0);
    var cell2=newrow.insertCell(1);
    var cell3=newrow.insertCell(2);
    var cell4=newrow.insertCell(3);
    var cell5=newrow.insertCell(4);
    var cell6=newrow.insertCell(5);
    var cell7=newrow.insertCell(6);
    var cell8=newrow.insertCell(7);

    cell1.innerHTML=" ";
    cell2.innerHTML=title;
    cell3.innerHTML=show;
    cell4.innerHTML=charname;
    cell5.innerHTML=clothing;
    cell6.innerHTML=color;
    cell7.innerHTML=size;
    cell8.innerHTML=notes;
}




function getTitle()
{ 
    var s = document.getElementsByName('titles')[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showTitle").innerHTML = text;
    document.getElementById("mySelect").selectedIndex = "0";
    return text;
}
