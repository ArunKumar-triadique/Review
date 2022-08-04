(function(){
    if(!window.indexedDB){
        return;
    }
    const dbname = "databases";
    const version = 5;
    const createdb = indexedDB.open(dbname,version)
    createdb.onerror = (event)=>{
        console.log(event);
    }
    createdb.onsuccess = (event)=>{
        let data = event.target.result;
        // let mydata = {name:"yamini",id : 1005,age:12,email:"yamini@gmail.com" }
        for(i=0;i<mylist.length;i++){
            console.log(mylist[i]);
        }
        insertContract(data,mylist);
    }
    createdb.onupgradeneeded = (event)=>{
        let a = event.target.result;
        console.log(a)
        let mydata = a.createObjectStore("datastore",{autoIncrement:true});
    }
    function insertContract(data,Contract){
        const txn = data.transaction('datastore','readwrite');
        const store = txn.objectStore('datastore');
        let query = store.add(Contract);
        query.onsuccess = function(event){
            console.log(event);
        };
        query.onerror = function(event){
            console.log(event.target.errorcode);
        };
        txn.oncomplete = function(){
            data.close();
        };
    }

})();