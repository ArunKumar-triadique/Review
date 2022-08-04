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
       update(db1,masterdata)
      
    }
    createdb.onupgradeneeded = (event) => {
      let data = event.target.result;
      let datastore = data.createObjectStore("metadatastore", {
        autoIncrement: true
      });
    }
    /******************************************put method*****************************************/
    function update(db1,masterdata){
        //create a new transaction
        const txn=db1.transaction('metadatastore','readwrite');
        //get the masterlist objectstore
        const store=txn.objectStore("metadatastore");
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
        db1.close();
    };
      }
  })();