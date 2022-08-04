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
    getAllContacts(db1)

    //  for(i=0;i<=masterdata.length;i++){
    //   // masterdata[i].createdAt = new Date();
    //   console.log(masterdata[i],i)
    //   masterdata[i].updatedAt = new Date();
    //      datastore=masterdata[i] 

    //         metalist(db1,datastore)
    //  }

    //  masterdata.forEach(element => {
    //    element.createdAt = new Date();
    //   //  console.log(masterdata[i],i)
    //    element.updatedAt = new Date();


    //          metalist(db1,element)
    //  });
    //   getId(db1)
    // update(db1,masterdata)
    //  deletedata(db1)
  }
  createdb.onupgradeneeded = (event) => {
    let data = event.target.result;
    let datastore = data.createObjectStore("metadatastore", {
      autoIncrement: true
    });
  }
  /*************************************add method******************************************/
  //      function metalist(db1,masterdata){
  //         // create a new transaction
  //     const txn = db1.transaction("metadatastore", 'readwrite');
  //      // get the mydatas object store
  //     const store = txn.objectStore("metadatastore");
  //     //
  //     let query = store.add(masterdata);
  //      // handle success case
  //     query.onsuccess = function (event) {
  //         // console.log(event);

  //     };
  //     // handle the error case
  //     query.onerror = function (event) {
  //         console.log(event.target.errorCode);
  //     }

  //     // close the database once the 
  //     // transaction completes
  //     txn.oncomplete = function () {
  //         db1.close();
  //     };
  // }

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
          <td><input type="checkbox"> ${element.SCA_Number}<br></td>
          <td>${months[startdate.getMonth()]}-${startdate.getUTCFullYear()} to ${months[lastdate.getMonth()]}-${lastdate.getUTCFullYear()}</td>
          <td>$${element.POP_Cost}</td>
          <td>$${element.Total_Project_Cost}</td>
         <td>${element.Contract_Term} </td>
          <td>${element.SCARB_Review_Month}</td>
            <td>${element.Status_Title}</td>
          <a href="/" target =_parent>${element.Project_Name}</a>
            
              </tr>`
        }
      });
      tabledata.insertAdjacentHTML("afterend", value);
    };

    //     dat.onsuccess = (event)=>{
    //       console.log(event.target.result)
    //     }

    // close the database connection
    txn.oncomplete = function () {
      db1.close();
    };  
    

  /************************************************getid*************************************************/
  //    function getId(db1){
  //     const txn = db1.transaction('metadatastore', "readwrite");
  //     const objectStore = txn.objectStore('metadatastore');
  //     let alldata=objectStore.get(3);
  //     alldata.onsuccess=(event)=>{
  //       console.log(event)
  //     }
  //     txn.oncomplete=function(){
  //       db1.close();
  //     }
  //  }
  /******************************************put method*****************************************/
  // function update(db1,masterdata){
  //     //create a new transaction
  //     const txn=db1.transaction('metadatastore','readwrite');
  //     //get the masterlist objectstore
  //     const store=txn.objectStore("metadatastore");
  //     let updatedataall=store.put(
  //       {
  //         "Title": "163d blazes a DOMOPS trail with MQ-9 fire missions",
  //         "Description": "After years in the heat of battle and the conflagration of foreign wars, the wing’s airmen take special satisfaction in fighting for their hometowns. “This mission is the heart of DOMOPS [domestic operations],” says Col. Sean Navin, 163rd wing commander. “We’re Californians. We live and train here, and we’re right next to our neighbors, civilians, helping them survive. We are part of this, one with the community.”\n\nThe wing launched an MQ-9 Reaper remDCS-G89-PAandE-18-737.pdfotely piloted aircraft (RPA) Dec. 6, and has loitered above the blaze since. The imaging ability of the Reaper proved immediately invaluable as it came upon the scene, piercing layers of smoke and delivering detailed full-motion video views of the devastation from 27,000 feet. An earlier attempt by firefighting agencies to map the perimeter, fanning west of Santa Paula toward Ojai and Ventura, had become dangerously dated.\n\n\"When we got on station and remapped the fire for them, we realized that the fire had exponentially increased, almost three miles in some places, and up to eight miles further west, and it was still moving pretty quickly,” according to Capt. Michele Garcia, mission intelligence coordinator and 160th Operations Group senior intelligence officer. “They were unaware that it has spread that far, that fast. We were able to provide them with the newest map of the perimeter within the first three hours.”\nhttp:\/\/www.housing1source.com\/articles\/u.s.-army-medical-command-medcom\/",
  //         "IsArchived": false,
  //         "Item Type": "Item",
  //         "Path": "sites\/medcombusoffice\/scarbprocess\/Lists\/SCANewsUpdatesList"
  //        },
  //     )
  //     ;
  //     // handle success case
  //     updatedataall.onsuccess = function (event) {
  //       console.log(event);
  //   };
  //   // handle the error case
  //   updatedataall.onerror = function (event) {
  //     console.log(event.target.errorCode);
  // }

  // // close the database once the 
  // // transaction completes
  // txn.oncomplete = function () {
  //     db1.close();
  // };
  //   }

  /********************************************delete method**************************/
  //  function deletedata(db1){
  //       const txn = db1.transaction('metadatastore', "readwrite");
  //       const objectStore = txn.objectStore('metadatastore');
  //       let alldata=objectStore.delete(156);
  //       alldata.onsuccess=(event)=>{
  //         console.log(event)
  //       }
  //       txn.oncomplete=function(){
  //         db1.close();
  //       }
  //    }
}})();