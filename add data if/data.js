(function(){
    if(!window.indexedDB){
        return;
    }
    const dbname = "Database";
    const version = 2;
    const createdb = indexedDB.open(dbname,version);
    createdb.onerror = (event) =>{
        console.log(event);
    }
    createdb.onsuccess = (event) =>{
        var dbname = event.target.result;

        
    const txn = dbname.transaction('Contract','readwrite');
     let Contracts = txn.objectStore("Contract");
    let Contract = Contracts.add({name:"sca contract",manager:"wwwwww",time:3});
    // let data = txn.objectStore('Contracts');
    // let Contracts = store.add('Contract',{name:"yamini",id :1005});

    }
    createdb.onupgradeneeded = (event) =>{
        var data = event.target.result;
    var store = data.createObjectStore('Contract');
    // let dbname = data.result;
    // if(!dbname.objectStoreNames.data('Contract'))
    // dbname.addObjectStore('Contract',{name : "yamini",age : "12",});
    // let dbname = createdb.result;
     
 }
    
})();