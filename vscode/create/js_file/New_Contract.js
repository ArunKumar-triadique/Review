// onchange event for radio buttion for displying of form when changed
document.getElementById("yes").addEventListener("change",(e)=>{
    var chkYes = document.getElementById("yes");
    var details=["buttons","createform","content","box_content","linehr"] 
    details.forEach(item=>chkYes.checked ? document.getElementById(item).style.display="block": document.getElementById(item).style.diplay="none")})
    document.getElementById("no").addEventListener("change",(e)=>{
        var chkno = document.getElementById("no");
        var details=["buttons","createform","box_content","linehr"] 
        details.forEach(item=>chkno.checked ? document.getElementById(item).style.display="none": document.getElementById(item).style.diplay="block")})
// onchange event for field5 options
function changevalue(){
    // Acesing elements from html using their id's
    var changedfield = document.getElementById("field5opt");
    var displyfield = document.getElementById("field5_details")
    // displying and hiding the option values using conditional statement
    changedfield.value == "yes" ? displyfield.style = ` display:flex; flex-wrap:wrap; gap:30px; border-radius:3px;` :  displyfield.style.display = "none";
    
}
// onchange event for field13 and field14
function changefield(){
    // Acesing elements from html using their id's
    var field13 = document.getElementById("field13_opt");
    var field14 = document.getElementById("field14");
    // displying and hiding the option values using conditional statement
    field13.value=="yes" ?field14.style.display="grid" : field14.style.display="none"
    
}
// onchange event for field16 options
document.getElementById("field16_opt").addEventListener("change",(e)=>{ 
    var list = ["chkkbox","chkkbox1","chkkbox2","chkkbox3"]
    list.forEach(item=>e.target.value == "yes" ? document.getElementById(item).disabled=false:document.getElementById(item).disabled=true)
})
function field3(){
    // Acesing elements from html using their id's
    var field3val = document.querySelector("#field3val").value;
    var displyfield3 = document.getElementById("field3content")
    // displying and hiding the option values using conditional statement
    field3val =="yes" ? displyfield3.style.display = "block" : displyfield3.style.display = "none";
}
function tipdispalay(){
    document.querySelector(".tooltip1").style.display= "block"
}
function tiphide(){
    document.querySelector(".tooltip1").style.display= "none"
}