
$(document).ready(function(){
    var x = location.search;
    console.log(x[1]);
    var firebaseRef = firebase.database().ref();
    firebaseRefEvents = firebaseRef.child("Events/"+x[1]);
    firebaseRefEvents.on('value', function(snapshot){
    var currentObject = snapshot.val();
    console.log(currentObject);
    var currentRow;
    var lie = document.createElement("li");
    $(lie).attr('data-target', "#myCarousel");
    $(lie).attr('data-slide-to', 0);
    $(lie).addClass("active");
    $("#indicators").append(lie);
    for(i=0;i<currentObject.otherImages_Url.length;i++){
        console.log(currentObject.otherImages_Url[i]);
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












    });
});