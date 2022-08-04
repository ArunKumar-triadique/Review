var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
var arr = ["RA Office", "BO Req<br>Verification", "QA/QC", "All<br>Directorates", "SCARB<br>Review<br>Meeting", "Deputy<br>Chief Of<br>Staff", "Chief Of<br>Staff", "Resource<br>Management"];
var datavar = "";


(async () => {
    //     *********************************Load Data*****************************************
    let d = await fetch("./assets/SCAContractsMasterList.json");  //fetch() method 
    d = await d.json();  //await 
    if (!window.indexedDB) { //Check indexeddb is supported or not in browser
        return
    }
    var name = "MEDCOM";
    var version = 1;
    var createdb = indexedDB.open(name, version) // Open IndexedDB
    //handle the ErrorCase

    createdb.onerror = (event) => {
        console.log(event)
    }
    //handle the successcase
    createdb.onsuccess = (event) => {

        let db = event.target.result
        getAllContacts(db)
        //  for(i=0;i<d.length;i++){
        //     data=d[i]
        //     data.createdAt = new Date()
        //     data.UpdatedAt = new Date()
        //     insertContact(db,data)
        // }
    }
    createdb.onupgradeneeded = (event) => {
        let datastore = event.target.result;
        let data = datastore.createObjectStore('masterlist', { autoIncrement: true }); // Create collection
    }
    // ******************************************Add Data******************************************************
    function insertContact(db, d) {
        // create transaction
        const txn = db.transaction('masterlist', 'readwrite');
        // get the objectstore
        const store = txn.objectStore('masterlist');
        // Add Data
        let query = store.add(d);
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

    let vector = document.querySelector(".dashboard");
    function getAllContacts(db) {
        // create transaction
        const txn = db.transaction('masterlist', 'readonly');
        // get the object store
        const objectStore = txn.objectStore('masterlist');
        // getall
        let storing = objectStore.getAll();
        // handle the success case
        storing.onsuccess = (event) => {

            let value;
            // let value1;
            var dated = event.target.result

            var container = document.querySelector("tr");
            dated.forEach(element => {       //forEach method
                var date = new Date(element.POP_End_Date)
                var startdate = new Date(element.POP_Start_Date)
                if (element && element.Title) {
                    value = `${value ? value : ""}
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${element.SCA_Number}<br> <a href="/">${element.Project_Name}</a></td>
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
           
           
           
            arr.forEach((item, index) => {
                let values = 0;
                dated.forEach(items => {

                    if (Number(items.Status) == index + 1)
                        values = values + 1
                })
                datavar = `${datavar}
            <div class="chart chart-${index + 1}">
                <h3 class="board-number${index + 1}">${values}</h3>
                <div class="board board${index + 1}" style="cursor:pointer" onclick="">${item}</div>   
            </div>`
            })

            vector.insertAdjacentHTML("afterbegin", datavar)


            // function status(){
            //     arr.forEach((item, index) => {
            //         let indexvalue = 0;
            //         dated.forEach(items => {
    
            //             if (Number(items.Status) == index + 1)
            //             indexvalue  = indexvalue  + 1
            //         })
            //         datavar = `${datavar}
            //         <div><h3 class="board-number${index + 1}">${indexvalue }${item}</h3>   
            //     </div>`
            //     arr.filter(element=>{element.Status})
            //     })
            // }status()

            var d = document.querySelectorAll(".board")
            d.forEach(item => {
                item.addEventListener("click", (e) => {
                    
              console.log(e)
                })
            })


         }
         
        // close the database connection
        txn.oncomplete = function () {
            db.close();
        };
    }
})()
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let board = document.querySelectorAll(".board");
    console.log(board)
}

);


//****************************************clickable****************************************************
// function clickablefun() {
//     let value2="";
//     let clicked = document.querySelector(".board");
//     let table = document.querySelector("table");
//     let tr = document.querySelector("tr")
//     for (i = 1; i < tr.length; i++) {
//         let td = tr[i].getElementByTagName("td")[4];
//         if (td) {
//             let textvalue = td.textContent || td.innerHTML;
//             if (textvalue.indexOf(clicked) > -2) {
//                 tr[i].style.display = "";
//             }
//             else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
//     table.insertAdjacentHTML("afterbegin",value2);


// }














