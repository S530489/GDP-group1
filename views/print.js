
// link for jspdf documentation https://mrrio.github.io/

function genPDF(){
    html2canvas(document.getElementById("dplist"),{
        onrendered: function (canvas){
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF("1","mm","a3");
            doc.setFont("courier");
            doc.setFontType("bolditalic");
            doc.setFontSize(40);
            doc.setTextColor(26, 140, 255);
            doc.text( 'SHOP PULL LIST',90,28,null,null);
    
            doc.addImage(img, 'JPEG', 20,38,);
            doc.save("ShopPullList.pdf");
        }
    });

}