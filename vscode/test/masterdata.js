(async () => {
    let masterdata = await fetch("./asserts/SCAContractsMasterList.json");
    masterdata = await masterdata.json();
    if (!window.indexedDB) {
      
      return;
    }
    let databasename = "Medicom";
    let version = 1;
   //open a connection toa database use the open() method
    let createdb = indexedDB.open(databasename, version)
    createdb.onerror = (event) => {
      console.log(event)
    }
    createdb.onsuccess = (event) => {
      let database = event.target.result
      getAllContacts(database)
  
      //  masterdata.forEach(element => {
      //    element.createdAt = new Date();
      //   //  console.log(masterdata[i],i)
      //    element.updatedAt = new Date();
  
  
      //          masterlist(database,element)
      //   });
      //   getId(database)
      // update(database,masterdata)
      //  deletedata(database)
    }
    //create the masterdatastore  object store
    createdb.onupgradeneeded = (event) => {
      let data = event.target.result;
      //create the masterdatastore objectstore
      let datastore = data.createObjectStore("masterdatastore", {
        autoIncrement: true
      });
    }
    /*************************************add method******************************************/
         function masterlist(database,masterdata){
            // create a new transaction
        const txn = database.transaction("masterdatastore", 'readwrite');
         // get the masterdatastore object store
        const store = txn.objectStore("masterdatastore");
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
            database.close();
        };
    }
  
    /***********************getall method*************************************/
  
    function getAllContacts(database) {
         // create a new transaction
      const txn = database.transaction('masterdatastore', "readonly");
       // get the masterdatastore object store
      const objectStore = txn.objectStore('masterdatastore');
      let dat = objectStore.getAll();
        // handle success case
      dat.onsuccess = (event) => {
        let value;
        let value2;
        let data = event.target.result
  
  
        let tabledata = document.querySelector("tr")
        data.forEach(element => {
          // contract_duration updatedate condition
          var End_date=new Date(element.POP_End_Date)
          var option1=new Date(element.Option_Year_1_End_Date)
          var option2=new Date(element.Option_Year_2_End_Date)
          var option3=new Date(element.Option_Year_3_End_Date)
          var option4=new Date(element.Option_Year_4_End_Date)
          var option5=new Date(element.Option_Year_5_End_Date)
          var start_date=new Date(element.POP_Start_Date)
          var latestdate;
          if(End_date>option1){
                 latestdate=End_date
          }
          else if(option1>option2){
            latestdate=option1
          }
          else if(option2>option3){
            latestdate=option2
          }
          else if(option3>option4){
            latestdate=option3
          }
          else if(option4>option5){
            latestdate=option4
          }
          else{
            latestdate=option5
          }
          var months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"] //contract duration month year 
          if (element && element.Title && element.SCARB_Review_Month) {
            value = `${value ? value : ''}
           <tr>
            <td><input type="checkbox">  ${element.SCA_Number}<br>
            <a href="/" target=_blank><b>${element.Project_Name}</b></a></td>
            <td>${months[start_date.getMonth()]}-${start_date.getUTCFullYear()} to
             ${months[latestdate.getMonth()]}-${latestdate.getUTCFullYear()}</td>
            <td>&#36;${element.POP_Cost}</td>
            <td>&#36;${element.Total_Project_Cost}</td>
           <td>${element.Contract_Term} </td>
            <td>${element.SCARB_Review_Month}</td>
              <td>${element.Status_Title}</td>

              
                </tr>`
          }
        });
        //insertAdjacentHTML() method inserts HTML code into a specified position.
        tabledata.insertAdjacentHTML("afterend", value);
      };
  
      // close the database connection
      txn.oncomplete = function () {
        database.close();
      };
    }
    
    /************************************************getid*************************************************/
       function getId(database){
         // create a new transaction
        const txn = database.transaction('masterdatastore', "readwrite");
             // get the masterdatastore object store
        const objectStore = txn.objectStore('masterdatastore');
        let alldata=objectStore.get(3);
        alldata.onsuccess=(event)=>{
          console.log(event)
        }
        txn.oncomplete=function(){
          database.close();
        }
     }
    /******************************************put method*****************************************/
    function update(database,masterdata){
        //create a new transaction
        const txn=db1.transaction('masterdatastore','readwrite');
        //get the masterlist objectstore
        const store=txn.objectStore("masterdatastore");
        //update the data and add the data
        let updatedataall=store.put(
          {
            "Title": "163d blazes a DOMOPS trail with MQ-9 fire missions",
            "Description": "After years in the heat of battle and the conflagration of foreign wars, the wing’s airmen take special satisfaction in fighting for their hometowns. “This mission is the heart of DOMOPS [domestic operations],” says Col. Sean Navin, 163rd wing commander. “We’re Californians. We live and train here, and we’re right next to our neighbors, civilians, helping them survive. We are part of this, one with the community.”\n\nThe wing launched an MQ-9 Reaper remDCS-G89-PAandE-18-737.pdfotely piloted aircraft (RPA) Dec. 6, and has loitered above the blaze since. The imaging ability of the Reaper proved immediately invaluable as it came upon the scene, piercing layers of smoke and delivering detailed full-motion video views of the devastation from 27,000 feet. An earlier attempt by firefighting agencies to map the perimeter, fanning west of Santa Paula toward Ojai and Ventura, had become dangerously dated.\n\n\"When we got on station and remapped the fire for them, we realized that the fire had exponentially increased, almost three miles in some places, and up to eight miles further west, and it was still moving pretty quickly,” according to Capt. Michele Garcia, mission intelligence coordinator and 160th Operations Group senior intelligence officer. “They were unaware that it has spread that far, that fast. We were able to provide them with the newest map of the perimeter within the first three hours.”\nhttp:\/\/www.housing1source.com\/articles\/u.s.-army-medical-command-medcom\/",
            "IsArchived": false,
            "Item Type": "Item",
            "Path": "sites\/medcombusoffice\/scarbprocess\/Lists\/SCANewsUpdatesList"
           },
        )
        ;
        // handle success case
        updatedataall.onsuccess = function (event) {
          console.log(event);
      };
      // handle the error case
      updatedataall.onerror = function (event) {
        console.log(event.target.errorCode);
    }
  
    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        database.close();
    };
      }
  
    /********************************************delete method**************************/
     function deletedata(db1){
          const txn = db1.transaction('metadatastore', "readwrite");
          const objectStore = txn.objectStore('metadatastore');
          let alldata=objectStore.delete(156);
          //handle success case
          alldata.onsuccess=(event)=>{
            console.log(event)
          }
          // close the database once the 
    // transaction completes
          txn.oncomplete=function(){
            database.close();
          }
       }
  })();