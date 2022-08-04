(async()=>{
    let mylist= await fetch("SCAContractsMasterList.json");
    mylist = await mylist.json();
    if(!window.indexedDB){
        return;
    }
    const dataname = "Apple1"
    const version = 11;
    const createdb = indexedDB.open(dataname,version);
    createdb.onerror = (event)=>{
        console.log(event);
    }
    createdb.onsuccess = (event)=>{
        let ab = event.target.result;
databases(ab,mylist);
    }
    createdb.onupgradeneeded = (event)=>{
        let abc = event.target.result;
        
        let data = abc.createObjectStore("datastore",{autoIncrement:true});
    }
    function databases(data,mylist){
        const txn = data.transaction('datastore','readwrite');
        const store = txn.objectStore('datastore');
        // let query = store.add(mylist);
        
        let alldata = store.getAll();
        
        alldata.onsuccess = function() {
            console.log(alldata.result);
        };

        query.onsuccess = function(event){
            console.log(event);
        }
        query.onerror = function(event){
            console.log(event.target.errorCode);
        }
        txn.oncomplete = function(){
            data.close();
        }
    }
})();