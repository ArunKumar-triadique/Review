let p = document.getElementById("data")
function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}
async function img() {
  const response = await fetch("https://picsum.photos/200/300?random=1") 
  return response.url
}
async function cards() {
  try {
    let data = await fetch("https://jsonplaceholder.typicode.com/albums");
    data = await data.json()
    return data
  } catch (error) {
    alert("something went wrong")
  }
}
async function injectHtml() {
  
  let data = await cards()
  let html = "";
  await Promise.all (data.map(async element => {
    let imgs = await img()
    console.log(imgs)
    html += `<div class="card" style="background:${generateRandomColor()}"> ${element.userId}<br>
              ${element.id}<br>
               ${element.title}
               <img src="${imgs}"><br>
               <a href="${imgs}" target="_blank"><button type="button">Click Me!</button></a> </div>`
               return true;
  }));
  p.innerHTML = html;
}
injectHtml()
function findimg(){
  let input = document.getElementById('searchbox').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('card');
  for (i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display="none";
    }
    else {
      x[i].style.display=(x);               
   }
  }
}



