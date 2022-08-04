(async()=>{
    let mylist= await fetch("SCANewsUpdates.json");
    mylist = await mylist.json();

    if(!window.indexedDB){
        return z;
    }

    const dataname = "Apple"
    const version = 11;
    const createdb = indexedDB.open(dataname,version);

    createdb.onerror = (event)=>{
        console.log(event);
    }

    createdb.onsuccess = (event)=>{
        let ab = event.target.result;
     for (i=0;i<mylist.length;i++)
     {
    data = (mylist[i]);
    databases(ab,data);
    }
    }

    createdb.onupgradeneeded = (event)=>{
        
        let abc = event.target.result;
        console.log(abc);

        let mylist = abc.createObjectStore("datastore",{autoIncrement:true});
    }


    function databases(data,mylist){
        const txn = data.transaction('datastore','readwrite');
        const store = txn.objectStore('datastore');
        let query = store.add(mylist);
        
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