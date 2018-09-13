
// link for jspdf documentation https://mrrio.github.io/

function genPDF(){
    html2canvas(document.getElementById("dplist1"),{
        onrendered: function (canvas){
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF("1","mm","a3");
            doc.setFont("Great Vibes");
            doc.setFontType("cursive");
            doc.setFontSize(40);
            doc.setTextColor(0, 128, 128);
            doc.text( 'SHOP PULL LIST',90,28,null,null);
    
            doc.addImage(img, 'JPEG', 20,38,);
            doc.save("ShopPullList.pdf");
        }
    });

}