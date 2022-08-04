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
      getAllContacts(db1)
    }
    createdb.onupgradeneeded = (event) => {
      let data = event.target.result;
      let datastore = data.createObjectStore("metadatastore", {
        autoIncrement: true
      });
    }
   
    /***********************getall method*************************************/
   
    function getAllContacts(db1) {    
      const txn = db1.transaction('metadatastore', "readonly");
      const objectStore = txn.objectStore('metadatastore');
      let dat = objectStore.getAll();
      dat.onsuccess = (event) => {
        let value;
        
        let data = event.target.result
  
        let tabledata = document.querySelector("tr")
        data.forEach(element => {
          var date= new Date(element.POP_End_Date)
          var op1 = new Date(element.Option_Year_1_End_Date)
          var op2 =new Date(element.Option_Year_2_End_Date)
         var op3 =new Date(element.Option_Year_3_End_Date)
        var op4 =new Date(element.Option_Year_4_End_Date)
          var op5 =new Date(element.Option_Year_5_End_Date)
          var startdate = new Date(element.POP_Start_Date)
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
              var months=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"]
              
          if (element && element.Title&& element.SCARB_Review_Month) {
            value = `${value ? value : ''}
            
           <tr>
            <td><input type="checkbox"> ${element.SCA_Number}<br>
            <a href="/" target =_parent>${element.Project_Name}</a></td>
            <td>${months[startdate.getMonth()]}-${startdate.getUTCFullYear()} to ${months[lastdate.getMonth()]}-${lastdate.getUTCFullYear()}</td>
            <td>$${element.POP_Cost}</td>
            <td>$${element.Total_Project_Cost}</td>
           <td>${element.Contract_Term} </td>
            <td>${element.SCARB_Review_Month}</td>
              <td>${element.Status_Title}</td>
          
              
                </tr>`
          }
        });
        tabledata.insertAdjacentHTML("afterend", value);
      };
      // close the database connection
      txn.oncomplete = function () {
        db1.close();
      };  
  }})();