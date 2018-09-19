var all_ids = ["perf_name","char_name","show_title"];
var global_key;

document.getElementById("edit").hidden = false;
document.getElementById('subBtn').style.visibility='hidden';
document.getElementById('canBtn').style.visibility='hidden';

function Cancel(){
    document.getElementById('subBtn').style.visibility='hidden';
    document.getElementById('canBtn').style.visibility='hidden';
    }

function disable(){
        document.getElementById("edit").hidden = false;
        document.getElementById('subBtn').style.visibility='hidden';
        document.getElementById('canBtn').style.visibility='hidden';
        for (i = 0; i < all_ids.length; i++){
            document.getElementById(all_ids[i]).contentEditable=false; 
    }
}
    
function enable(){
        document.getElementById('subBtn').style.visibility='visible';
        document.getElementById('canBtn').style.visibility='visible';
        for (i = 0; i < all_ids.length; i++){
            document.getElementById(all_ids[i]).contentEditable=true; 
        } 
    }

