(async () => {
    let masterdata = await fetch("./asserts/SCAContractsMasterList.json");
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
       masterdata.forEach(element => {
         element.createdAt = new Date();
         element.updatedAt = new Date();
          metalist(db1,element)
       });
    }
    createdb.onupgradeneeded = (event) => {
      let data = event.target.result;
      let datastore = data.createObjectStore("metadatastore", {
        autoIncrement: true
      });
    }
    /*************************************add method******************************************/
         function metalist(db1,masterdata){
            // create a new transaction
        const txn = db1.transaction("metadatastore", 'readwrite');
         // get the mydatas object store
        const store = txn.objectStore("metadatastore");
        //
        let query = store.add(masterdata);
         // handle success case
        query.onsuccess = function (event) {
            // console.log(event);
  
        };
        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }
  
        // close the database once the 
        // transaction completes
        txn.oncomplete = function () {
            db1.close();
        };
    }          
  })();