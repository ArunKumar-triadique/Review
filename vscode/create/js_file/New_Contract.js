// onchange event for radio buttion for displying of form when changed
function Displayform() {
    // Acessing elements from html using their id's
    var chkYes = document.getElementById("yes");
    var chkno =document.getElementById("no");
    var buttondisplay = document.getElementById("buttons");
    var dvtext = document.getElementById("createform");
    var maincontent = document.getElementById("content")
    var box_content = document.getElementById("box_content")
    var linehr =document.getElementById("linehr")
    // hiding and displying the form detais & content table using ternery operater
    dvtext.style.display = chkYes.checked ? "block" : "none";
    buttondisplay.style.display = chkYes.checked ? "block" : "none";
    maincontent.style.display = chkYes.checked ? "block" : "hide";
    box_content.style.display = chkYes.checked ? "block" : "none";
    linehr.style.display =chkYes.checked ? "block" : "none";
    // maincontent.style.display = chkno.checked ? "hide" :"block";
}
// onchange event for field5 options
function changevalue(){
    // Acesing elements from html using their id's
    var changedfield = document.getElementById("field5opt");
    var displyfield = document.getElementById("field5_details")
    // displying and hiding the option values using conditional statement
    if(changedfield.value == "yes"){
        displyfield.style.display = "flex";
    }
    else{
        displyfield.style.display = "none";
    }
}
// onchange event for field13 and field14
function changefield(){
    // Acesing elements from html using their id's
    var field13 = document.getElementById("field13_opt");
    var field14 = document.getElementById("field14");
    // displying and hiding the option values using conditional statement
    if(field13.value=="yes"){
        field14.style.display="block";
    }
    else{
        field14.style.display="none"
    }
}
// onchange event for field16 options
function checkonchange(){
     // Acesing elements from html using their id's
    var field16_opt = document.getElementById("field16_opt");
    // Disabling and enabling the checkboxes when option is changed
    if(field16_opt.value == "yes"){
        document.getElementById("chkkbox").disabled=false;
        document.getElementById("chkkbox1").disabled=false;
        document.getElementById("chkkbox2").disabled=false;
        document.getElementById("chkkbox3").disabled=false;
    }
    else{
        document.getElementById("chkkbox").disabled=true;
        document.getElementById("chkkbox1").disabled=true;
        document.getElementById("chkkbox2").disabled=true;
        document.getElementById("chkkbox3").disabled=true;
    }
}
function field3(){
    // Acesing elements from html using their id's
    var field3val = document.querySelector("#field3val").value;
    var displyfield3 = document.getElementById("field3content")
    // displying and hiding the option values using conditional statement
    console.log(field3val)
    if(field3val =="yes"){
        displyfield3.style.display = "block";
    }
    else{
        displyfield3.style.display = "none";
    }
}
function field19_opp(){
    
}