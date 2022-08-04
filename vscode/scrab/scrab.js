(async () => {
  let masterdata = await fetch("./SCAContractsMasterListXL.json");
  masterdata = await masterdata.json();
  if (!window.indexedDB) {

    return;
  }
  let master;
  const databasename = "Medicom";
  let version = 1;
  //open a connection toa database use the open() method
  let createdb = indexedDB.open(databasename, version)
  createdb.onerror = (event) => {
    console.log(event)
  }
  createdb.onsuccess = (event) => {
    let database = event.target.result
    getAllContacts(database)

    //   masterdata.forEach(element => {
    //      element.createdAt = new Date();

    //      element.updatedAt = new Date();


    //      masterlist(database,element)
    //  });
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
  function masterlist(database, masterdata) {
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
      let month = "";//table
      let data = event.target.result
      var masterdatalist = data.map((element, index) => {
        return `${element.SCARB_Review_Month}`
      })//total months
      let newData = new Set(masterdatalist);//removing duplicate values
      newData = [...newData].filter(item => item != "null")
      let table_container = document.querySelector(".table_container")
      // let table_pending=document.querySelectorAll(".table_pending")

      //  let tablep=document.querySelector(".table_pending")
      function getCurrentFinancialYear() {
        var fiscalyear = "";
        var today = new Date();
        if ((today.getMonth() + 1) <= 9) {
          fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
        } else {
          fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
        }
        return fiscalyear
      }

      let datas = getCurrentFinancialYear();
      datas = datas.split("-")
      var startmonths=["OCT","NOV","DEC"]

      var lastmonth =  ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP"]
      startmonths =startmonths.map(item=>{
        return `${item} ${datas[0]}`
      })
      lastmonth = lastmonth.map(item=>{
        return `${item} ${datas[1]}`
      })
      let finaldate = [...startmonths,...lastmonth]
// console.log(finaldate)
      var latestdata = finaldate.map((item, index) => {
        let total = 0;
        let reviewedcost=0;
        let pendingcost=0;
        // let cost=pending;//

        let value = newData.map(items => {
          if (item === items.SCARB_Review_Month) {
            
            month =
              ` <tr>
            <td>${items.SCARB_Review_Month}</td>
            <td></td>
            <td>${items.POP_Cost}</td>
             <td>${pendingcost}</td>
             <td>${items.Status}</td>
             <td>${items.POP_Cost}</td>
             <td>${reviewedcost}</td>
             <td>${items.Status}</td>
             </tr>`
            // total += items.POP_Cost

            if (items.Status =="5" ||items.Status=="6"||items.Status=="7"|| items.Status =="8" ) {
               
              reviewedcost += items.POP_Cost
              console.log(reviewedcost )
            }
            if (items.Status == "1" || items.Status == "2" || items.Status == "3" || items.Status == "4") {
              pendingcost += items.POP_Cost
              console.log()
            }
          }
          

           return true
        }
        
        )
        
        // console.log(month)
        table_container.insertAdjacentHTML("beforeend", month);
        //  table_pending.insertAdjacentHTML("beforebegin",pendingmonth)
        // tablep.insertAdjacentHTML("afterend",pendingmonth)

        // console.log(newData)
        //  console.log(item,month)
        // return value
      })
      //  console.log(latestdata)
      
     
      
    };

    // close the database connection
    txn.oncomplete = function () {
      database.close();
    };
  }

  /************************************************getid*************************************************/
  function getId(database) {
    // create a new transaction
    const txn = database.transaction('masterdatastore', "readwrite");
    // get the masterdatastore object store
    const objectStore = txn.objectStore('masterdatastore');
    let alldata = objectStore.get(3);
    alldata.onsuccess = (event) => {
      console.log(event)
    }
    txn.oncomplete = function () {
      database.close();
    }
  }
  /******************************************put method*****************************************/
  function update(database, masterdata) {
    //create a new transaction
    const txn = db1.transaction('masterdatastore', 'readwrite');
    //get the masterlist objectstore
    const store = txn.objectStore("masterdatastore");
    //update the data and add the data
    let updatedataall = store.put(
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
  function deletedata(db1) {
    const txn = db1.transaction('metadatastore', "readwrite");
    const objectStore = txn.objectStore('metadatastore');
    let alldata = objectStore.delete(156);
    //handle success case
    alldata.onsuccess = (event) => {
      console.log(event)
    }
    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
      database.close();
    }
  }
})();