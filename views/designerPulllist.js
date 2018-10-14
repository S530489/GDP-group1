
var performers = {}
var cell9;
var k;
var tex="";

function getPerfomers(ind){
    console.log(performers)
    
    key = document.getElementById("mySelect").value;
    var firebaseRef = firebase.database().ref().child("Events/"+key);
    firebaseRef.on('value', function(snapshot){
    
        var obj = snapshot.val();

        var EventPerformers = []
        var EventPerformersNames = []

        for (i = 0; i < obj.Performers.length; i++) { 
            console.log(obj.Performers[i])
            k = obj.Performers[i][1]
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



function getColor()
{
    var s = document.getElementsByName("colors")[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showcolor").innerHTML = text;
}

function addrow()
{
    var title=document.getElementById("showTitle").innerHTML;
    var show=document.getElementById("showName").innerHTML;
    var color=document.getElementById("showcolor").innerHTML;
    var clothing=document.getElementById("showclothing").innerHTML;
    var charname=document.getElementById("character").innerHTML;
    // var charname=$('#my-contenteditable-div').html();;
    var size=document.getElementById("size").innerHTML;
    var notes=document.getElementById("notes").innerHTML;
    submit_to_firebase(title,show,color,clothing,charname,size,notes);

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
    cell9=newrow.insertCell(8);

    cell1.innerHTML=" ";
    cell2.innerHTML=title;
    cell3.innerHTML=show;
    cell4.innerHTML=charname;
    cell5.innerHTML=clothing;
    cell6.innerHTML=color;
    cell7.innerHTML=size;
    cell8.innerHTML=notes;
    cell9.innerHTML="x"+remove();
    cell9.style.visibility="hidden";
}




function getTitle()
{   
    document.getElementById("showName").innerHTML = "";
    var s = document.getElementsByName('titles')[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showTitle").innerHTML = text;
    document.getElementById("mySelect").selectedIndex = "0";
    return text;
}

function remove()
{
var index, table = document.getElementById('dplist1');
for(var i = 1; i < table.rows.length; i++)
{
    table.rows[i].cells[8].onclick = function()
    {
        var c = confirm("Are you sure, you want to delete this row?");
        if(c === true)
        {
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
        }   
    };  
}
    return "";
}

function removerows()
{
    var count = $('#dplist1 tr').length;
    // cell9.style.visibility="visible";
    for(var i=1;i<count;i++){
    // alert(document.getElementById("dplist1").rows[i].cells[8].innerHTML);
    document.getElementById("dplist1").rows[i].cells[8].style.visibility="visible";
    }
}
function  submit_to_firebase(title,show,color,clothing,charname,size,notes){
    
   window.alert("submiting")
    firebase.database().ref().child("ShopPullList").child(0).set({

            Play_title : title,
            Performer_Name : show,
            Character_Name : charname,
            clothing_Item : clothing,
            color_selected : color,
            Size:size,
            Add_Notes:notes
            
      });
    }

    function getClothingitem()
    {
        var s = document.getElementsByName("clothing")[0];
        var text = s.options[s.selectedIndex].text;
        tex=getSizes(text);
        document.getElementById("showclothing").innerHTML = text;
        document.getElementById("size").innerHTML = tex;
    }
function getSizes(text)
{
    var res="";
    // if(text=="Dress shirt: Male fit")
    // {
    //     res="Neck: "+performers[k].measurements.neck+"\n"+"CB to wrist: "+performers[k].measurements.centerBackWrist;
    // }

    switch(text)
    {
        //Top measurements
        case "Dress shirt: Male fit":
                    res="Neck: "+performers[k].measurements.neck+"\n"+"CB to wrist: "
                                        +performers[k].measurements.centerBackWrist;
                    break;
        case "Blouse: Female fit":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"CB to wrist: "
                                        +performers[k].measurements.centerBackWrist;
                    break;
        case "Blazer: men's fit":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"CB to wrist: "
                                        +performers[k].measurements.centerBackWrist;
                    break;
        case "Blazer: women's fit":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"CB to wrist: "
                                        +performers[k].measurements.centerBackWrist+"\n"+"Waist: "
                                            +performers[k].measurements.waist;
                    break;
        case "Winter Coat":
                    res="Chest: "+performers[k].measurements.chest;
                    break; 
        case "Trench coat":
                    res="Chest: "+performers[k].measurements.chest;
                    break; 
        case "Tunic":
                    res="Chest: "+performers[k].measurements.chest;
                    break; 
        case "Vest: men's fit":
                    res="Chest: "+performers[k].measurements.chest;
                    break; 
        case "Vest: women's fit":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"Waist: "
                                        +performers[k].measurements.waist;
                    break; 
        case "Sweater: crew neck":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"Actual shirt size: "
                                        +performers[k].measurements.shirtSize;
                    break;
        case "Sweater: v-neck":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"Actual shirt size: "
                                        +performers[k].measurements.shirtSize;
                    break;
        case "Sweater: cardigan":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"Actual shirt size: "
                                        +performers[k].measurements.shirtSize;
                    break;
        case "Tshirt: Plain":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Tshirt: screen print":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Knit top: short sleeve":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Tank top":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Knit top: long sleeve":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Knit top: casual":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Knit top: dressy":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Thermal shirt":
                    res="Actual shirt size: "+performers[k].measurements.shirtSize;
                    break;
        case "Western shirt":
                    res="Neck: "+performers[k].measurements.neck+"\n"+"CB to wrist: "
                                        +performers[k].measurements.centerBackWrist;
                    break;
        case "Flannel shirt":
                    res="Neck: "+performers[k].measurements.neck+"\n"+"CB to wrist: "
                                        +performers[k].measurements.centerBackWrist;
                    break;
        case "Smoking jacket":
                    res="Chest: "+performers[k].measurements.chest+"\n"+"Waist: "
                                        +performers[k].measurements.centerBackWrist;
                    break;                
    }

    return res;

}