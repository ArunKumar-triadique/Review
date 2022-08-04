(async () => {
    let masterdata = await fetch("../SCAContractsMasterList.json");
    masterdata = await masterdata.json();
    if (!window.indexedDB) {  
      return;
    }
    let dbname = "project";
    let version = 1;
    let createdb = indexedDB.open(dbname, version)
    createdb.onerror = (event) => {
      alert("Data Base Not Found")
    }
    createdb.onsuccess = (event) => {
      let db1 = event.target.result
      getId(db1) 
    }
    createdb.onupgradeneeded = (event) => {
      let data = event.target.result;
      let datastore = data.createObjectStore("metadatastore", {
        autoIncrement: true
      });
    }   
    /************************************************getid*************************************************/
       function getId(db1){
        const txn = db1.transaction('metadatastore', "readwrite");
        const objectStore = txn.objectStore('metadatastore');
        let alldata=objectStore.get(3);
        alldata.onsuccess=(event)=>{
          console.log(event)
        }
        txn.oncomplete=function(){
          db1.close();
        }
     }
   
  })();