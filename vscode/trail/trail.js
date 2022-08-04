(async () => {
    let masterdata = await fetch("SCAContractsMasterList.json");
    masterdata = await masterdata.json();
    if (!window.indexedDB) {
      return;
    }
    let dbname = "project";
    let version = 1;
    let createdb = indexedDB.open(dbname, version)
    createdb.onerror = (event) => {
      console.log(event)
    }
    createdb.onsuccess = (event) => {
      let db1 = event.target.result
      getAllContacts(db1)
    }
    createdb.onupgradeneeded = (event) => {
      let data = event.target.result;
      let datastore = data.createObjectStore("metadatastore", {
        autoIncrement: true
      });
    }
    function getAllContacts(db1) {
        const txn = db1.transaction('metadatastore', "readonly");
        const objectStore = txn.objectStore('metadatastore');
        let dat = objectStore.getAll();
        
        dat.onsuccess = (event) => {
          let value;
          
          let data = event.target.result
    
          let tabledata = document.querySelector("div")
          data.forEach(element => {
           
            var date= new Date(element.POP_End_Date)
            var months=["jan","feb","mar","apr","may","jun","july","aug","sept","oct","nov","dec"]
            // console.log(months[date.getMonth()])
            var op1 = new Date(element.Option_Year_1_End_Date)
            var op2 =new Date(element.Option_Year_2_End_Date)
            var op3 =new Date(element.Option_Year_3_End_Date)
            var op4 =new Date(element.Option_Year_4_End_Date)
            var op5 =new Date(element.Option_Year_5_End_Date)
            var lastdate;
                if(date >op1){
                  lastdate= date
                }
                else if(op1>op2){ 
                    lastdate= op1
            }else if(op2>op3){
                lastdate= op2
            }else if(op3>op4){
                lastdate= op3
            }
            else if(op4>op5){
                lastdate= op4
            }
            else{
                lastdate= op5
            }
            console.log(lastdate.getUTCFullYear())
        // f()
       
        // console.log(lastdate)
        // console.log(months[lastdate.getMonth()])
           
        });
      }}
      txn.oncomplete = function () {
        db1.close();
      };
    })();