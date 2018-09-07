
function genPDF(){
    html2canvas(document.getElementById("dplist"),{
        onrendered: function (canvas){
            var img = canvas.toDataURL("image/png",1.0);
            var doc = new jsPDF("1","mm","a3");
            
            doc.addImage(img, 'JPEG', 20, 20);
            doc.save("ShopPullList.pdf");
        }
    });

}