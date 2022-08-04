(async () => {
    let mylist = await fetch("SCANewsUpdates.json");
    mylist = await mylist.json();

    if (!window.indexedDB) {
        return z;
    }


    const dataname = "Apple"
    const version = 11;
    const createdb = indexedDB.open(dataname, version);


    createdb.onerror = (event) => {
        console.log(event);
    }
    createdb.onsuccess = (event) => {
        let ab = event.target.result;
        databases(ab, mylist);

    }
    createdb.onupgradeneeded = (event) => {
        let abc = event.target.result;
        let data = abc.createObjectStore("datastore", { autoIncrement: true });
    }


    /************************************************getall*************************************************/
   
    function databases(data, mylist) {
        const txn = data.transaction('datastore', 'readwrite');
        const store = txn.objectStore('datastore');
        let mystore = store.getAll();
        mystore.onsuccess = (event)=>{
            let news = ""
            let updates = event.target.result;
            let daily = document.querySelector(".bottom_navbar2");
            updates.forEach(element => {
                news += `<a href="#" target=_blank ><p> ${element.Title}</p> </a>`
                news += `<p>${element.Description}</p>`
            });
            daily.insertAdjacentHTML("afterend",news)
        };
            
        txn.oncomplete = function () {
            data.close();
        }
    }
})();
function display(){
    document.getElementById("description").style.display = "block";
    
}


