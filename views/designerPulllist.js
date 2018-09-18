function getTitle()
{
    var s = document.getElementsByName('titles')[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showTitle").innerHTML = text;
    return text;
}

function getPerfomers(Key){
    
}

function getName()
{
    var s = document.getElementsByName("names")[0];
    var text = s.options[s.selectedIndex].text;
    document.getElementById("showName").innerHTML = text;
    return text;
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