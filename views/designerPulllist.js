var carsAndModels = {};
carsAndModels['VO'] = ['V70', 'XC60', 'XC90'];
carsAndModels['VW'] = ['Golf', 'Polo', 'Scirocco', 'Touareg'];
carsAndModels['BMW'] = ['M6', 'X5', 'Z3'];

function ChangeCarList() {
    var carList = document.getElementById("car");
    var modelList = document.getElementById("carmodel");
    var selCar = carList.options[carList.selectedIndex].value;
    while (modelList.options.length) {
        modelList.remove(0);
    }
    var cars = carsAndModels[selCar];
    if (cars) {
        var i;
        for (i = 0; i < cars.length; i++) {
            var car = new Option(cars[i], i);
            modelList.options.add(car);
        }
    }
} 


function getPerfomers(ind){
    key = document.getElementById("mySelect").value;
    var firebaseRef = firebase.database().ref().child("Events/"+key);
    firebaseRef.on('value', function(snapshot){
        //console.log(snapshot.val());
        var obj = snapshot.val();
        console.log(obj);
        var EventPerformers = []
        var EventPerformersNames = []
        for (i = 0; i < obj.Performers.length; i++) { 
            var firebaseRef1 = firebase.database().ref().child("performers/"+obj.Performers[i][1]);
            firebaseRef1.on('value', function(snapshot){
                EventPerformers.push(snapshot.val());
                EventPerformersNames.push(snapshot.val().general.Name.First_Name)
            })
        }
        console.log(EventPerformers)
        console.log(EventPerformersNames) 
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

    cell1.innerHTML=title;
    cell2.innerHTML=show;
    cell3.innerHTML=charname;
    cell4.innerHTML=clothing;
    cell5.innerHTML=color;
    cell6.innerHTML=size;
    cell7.innerHTML=notes;
}




function getTitle()
{ 
    var s = document.getElementsByName('titles')[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showTitle").innerHTML = text;
    document.getElementById("mySelect").selectedIndex = "0";
    return text;
}
