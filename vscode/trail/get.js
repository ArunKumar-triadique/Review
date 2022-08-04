(async()=>{
    let masterdata=await fetch("SCAContractsMasterList.json");
    masterdata=await masterdata.json();
    if(!window.indexedDB){
        return;
    }
    let dbname="project";
    let version=1;
    let createdb=indexedDB.open(dbname,version)
      createdb.onerror=(event)=>{
        console.log(event)
      }
      createdb.onsuccess=(event)=>{
        let db1=event.target.result
          getAllContacts(db1)
        
        // for(i=0;i<masterdata.length;i++){
        //     datastore=masterdata[i] 
        //     datastore.createdAt = new Date();
        //     // datastore.updatedAt = new Date();
        //      metalist(db1,datastore)
        //  }
        //  getId(db1)
        //     putid(db1)
        //     deleteid(db1)
        

      }
      createdb.onupgradeneeded=(event)=>{
        let data=event.target.result;
        let datastore= data.createObjectStore("metadatastore",{
            autoIncrement:true
        });
      }

        //  function metalist(db1,masterdata){
        //     // create a new transaction
        // const txn = db1.transaction("metadatastore", 'readwrite');
        //  // get the mydatas object store
        // const store = txn.objectStore("metadatastore");
        // //
        // let query = store.add(masterdata);
        //  // handle success case
        // query.onsuccess = function (event) {
        //     // console.log(event);
        // };
        // // handle the error case
        // query.onerror = function (event) {
        //     console.log(event.target.errorCode);
        // }

        // // close the database once the 
        // // transaction completes
        // txn.oncomplete = function () {
        //     db1.close();
        // };

        /----------------getall method-----------------------------/

        function getAllContacts(db1) {
          const txn = db1.transaction('metadatastore', "readonly");
          const objectStore = txn.objectStore('metadatastore');
          let dat = objectStore.getAll();
          dat.onsuccess = (event)=>{
            let value;
            let value2; 
            let data = event.target.result;

            let container = document.querySelector("tr");

        data.forEach(element => {
            if(element && element.Title){
            value = `${value ? value :""} <br> <tr>
            <td>${element.Title}</td>
            <td>${element.POP_Start_Date}</td>
            <td>${element.POP_Cost}</td>
            <td>${element.Total_Project_Cost}</td>
            <td>${element.Contract_Term}</td>
            <td>${element.SCARB_Review_Month}</td>
            <td>${element.Status_Title}</td>
            
            
            </tr>`
            }
            
        });

container.insertAdjacentHTML("afterend", value);
          }

          // close the database connection
          txn.oncomplete = function () {
              db1.close();
          };
      

//     // //   /--------------------getid-------------------------------------/
    // function getId(db1){
    // txn = db1.transaction('metadatastore', "readwrite");
    // objectStore = txn.objectStore('metadatastore');
    // ldata=objectStore.get(15);
    // ldata.onsuccess=(event)=>{
    // console.log(event)
    //         }
    // complete=function(){
    // close();
    //         }
    //     }
    // function putid(db1){
    //           const txn = db1.transaction('metadatastore', "readwrite");
    //           const objectStore = txn.objectStore('metadatastore');
    //           let ldata=objectStore.put({
    //             "Title": "Army & Air Force Exchange Service Welcomes Muscle Maker Grill as Latest Healthy Dining Option at Fort Benning",
    //             "Description": "​FORT BENNING – Soldiers and their families can fuel a BE FIT lifestyle with fit bowls, healthy wraps, fresh greens, skinny flatbreads and more at Muscle Maker Grill, the Army & Air Force Exchange Service’s latest better-for-you dining option at Fort Benning.\n\nThe Exchange celebrated the restaurant’s grand opening with a ribbon-cutting at the food court on Jan. 16, officiated by Col. Clinton Cox, Fort Benning garrison commander; Mark Farmer, Muscle Maker Grill vice president of operations; Don Sydlik, Exchange general manager; and Rutchel Williams, Exchange services business manager.\n\n“The Exchange makes it convenient for Soldiers and military families at Fort Benning to make the right meal choices for them,” Sydlik said. “No matter your taste, there is a menu item for your meal plan at the Exchange.”\n\nThe restaurant fits in with the Exchange’s priority of bringing name-brand restaurants with better-for-you menus to service members to support troop readiness and resiliency. The Exchange is an active partner in Army Healthy Communities and Air Force Smart Fueling initiatives, transforming its food courts worldwide and focusing on a holistic BE FIT lifestyle for service members.",
    //             "IsArchived": false,
    //             "Item Type": "Item",
    //             "Path": "sites\/medcombusoffice\/scarbprocess\/Lists\/SCANewsUpdatesList"
    //            });
    //           ldata.onsuccess=(event)=>{
    //             console.log(event)
    //           }
    //           txn.oncomplete=function(){
    //             db1.close();
    //           }
    //  }
//     function deleteid(db1){
//         const txn = db1.transaction('metadatastore', "readwrite");
//         const objectStore = txn.objectStore('metadatastore');
//         let ldata=objectStore.delete(145);
//         ldata.onsuccess=(event)=>{
//           console.log(event)
//         }
//         txn.oncomplete=function(){
//           db1.close();
//         }
// }
 }})();