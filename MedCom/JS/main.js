(async () => {
    //     *********************************Load Data*****************************************
    let fetch_data = await fetch("./assets/SCAContractsMasterList.json");  //fetch() method 
    fetch_data = await fetch_data.json();  //await 
    if (!window.indexedDB) { //Check indexeddb is supported or not in browser
        return
    }
    let name = "masterr";
    let version = 1;
    let createdb = indexedDB.open(name, version) // Open IndexedDB
    //handle the ErrorCase

    createdb.onerror = (event) => {
        console.log(event)
    }
    //handle the successcase
    createdb.onsuccess = (event) => {

        let db = event.target.result
        getAllContacts(db) // call getAll()
        // getId(db) // call getId()
        //  update(db)// call Update()
        //  deletedata(db)//call  delete()




        // for(i=0;i<d.length;i++){
        //     data=d[i]
        //     data.createdAt = new Date()
        //     data.UpdatedAt = new Date()
        //     insertContact(db,data)
        // }

    }
    createdb.onupgradeneeded = (event) => {
        let datastore = event.target.result;
        let data = datastore.createObjectStore('marks', { autoIncrement: true }); // Create collection
    }
    // ******************************************Add Data******************************************************
    function insertContact(db, fetch_data) {
        // create transaction
        const txn = db.transaction('marks', 'readwrite');
        // get the objectstore
        const store = txn.objectStore('marks');
        // Add Data
        let query = store.add(fetch_data);
        // handle the success case
        query.onsuccess = function (event) {
            console.log(event);
        };
        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }
        // Transaction close
        txn.oncomplete = function () {
            db.close();
        };
    }
    // *************************************getAll*************************************************

    function getAllContacts(db) {
        // create transaction
        const txn = db.transaction('marks', 'readonly');
        // get the object store
        const objectStore = txn.objectStore('marks');
        // getall
        let storing = objectStore.getAll();
        // handle the success case
        storing.onsuccess = (event) => {

            let value;
            // let value1;
            let dated = event.target.result

            let container = document.querySelector("tr");
            dated.forEach(element => {       //forEach method
                var date = new Date(element.POP_End_Date)
                var startdate = new Date(element.POP_Start_Date)
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "JUL", "Aug", "Sept", "Oct", "Nov", "Dec"]
                if (element && element.Title) {
                    value = `${value ? value : ""}
                    <td><input type="checkbox"></td>
                    <td>${element.SCA_Number} <br><a href="/">${element.Project_Name}</a></td>
                    <td>${months[startdate.getMonth()]}-${startdate.getUTCFullYear()} to ${months[date.getMonth()]}-${date.getUTCFullYear()}</td>
                    <td>$${element.POP_Cost}</td>
                    <td>$${element.Total_Project_Cost}</td>
                    <td>${element.Contract_Term}</td>
                    <td>${element.SCARB_Review_Month}</td>
                    <td>${element.Status_Title}</td>
                   </tr>`
                }

            });

            container.insertAdjacentHTML("afterend", value);

            console.log(event.target.result)
        }
        // close the database connection
        txn.oncomplete = function () {
            db.close();
        };
    }

    // *************************************key*************************************************
    function getId(db) {
        // Create a New Transaction
        const txn = db.transaction('marks', 'readonly');
        // Create a New Transaction
        const objectStore = txn.objectStore('marks');
        // get specific id
        let dated = objectStore.get(8);
        //handle the success case
        dated.onsuccess = (event) => {
            console.log(event.target.result)
        }
        // close the database connection
        txn.oncomplete = function () {
            db.close();
        };
    }
    // ******************************************Update****************************************************
    function update(db) {
        // Create a New Transaction
        let updatenews = db.transaction("marks", "readwrite");
        // Create a New Transaction
        let objectStore = updatenews.objectStore('marks');
        // update data
        let updatedata = objectStore.put(
            {
                "Title": "Troop, a Win-Win for Army Reserve Soldiers and Installations ",
                "Description": "​The team of 24 engineers specializing in surveying, planning and design provided “turn-key” packets to the garrison. These design packets are handed over to military construction units to execute as additional troop projects. Troop projects significantly reduces costs for the garrison because they wont have to go to a civilian contractor to get the work done.\n\n“We are different than a lot of units, where a lot of us actually are engineers in our civilian capacity,” said Maj. Nathan Felosi, the officer in charge of the 415th Engineer Facility Detachment. For those that don’t have engineering background, troop projects provide real-world training with tangible results.\n\nIn addition to the packets, a pavilion at Blackhawk Park was rebuilt because some Soldiers in the survey team happened to have construction expertise.\n\n“This design\/survey team did a great job andRFSCAPDFFORM-DCS-G357-G6-18-709 (1).pdfput multiple project packets together and we appreciate all the hard work done for FHL,” said Trena Beebe, the garrison Public Works Dept. Troop project coordinator.\nUnits that conducted training here were the 926th Engineer Brigade, Montgomery, Ala.; 415th Engineer Facility Detachment, Knoxville, Tenn.; and 763rd Engineer Facility Detachment, Columbia, S.C.",
                "IsArchived": false,
                "Item Type": "Item",
                "Path": "sites\/medcombusoffice\/scarbprocess\/Lists\/SCANewsUpdatesList"
            }, 157
        );
        //handle the success case
        updatedata.onsuccess = (event) => {
            console.log(event)
        }
        //transaction close
        updatenews.oncomplete = function () {
            db.close();
        }
    }
    // ***************************************Delete Data******************************************************* 

    function deletedata(db) {
        //   create a New Transaction
        const txn = db.transaction('marks', 'readwrite');
        //   get the object store
        const objectStore = txn.objectStore('marks');
        //   delete
        let dated = objectStore.delete(157);
        // handle the Success case
        dated.onsuccess = (event) => {
            console.log(event.target.result)
        }
        // close the database connection
        txn.oncomplete = function () {
            db.close();
        };
    }


})();

