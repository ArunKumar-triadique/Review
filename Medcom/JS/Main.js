async function masterlist(){
    try { 
        let masterdata = await fetch("Assets/SCAContractsMasterList.json");
            masterdata = await masterdata.json();
            return masterdata;
    } catch (error) {
        alert("Something Went Wrong")
    }
}




(async () => {

    
    if (!window.indexedDB) {
        return;
    }

    
    createdb = indexedDB.open(databasename, version)

    createdb.onerror = (event) => {
        console.log(event.target.result)
    }

    createdb.onsuccess = (event) => {
        let database = event.target.result

        getalldata(database)

        // masterdata.forEach(element => {
        //     insertdata(database, element)
        // })
    }

    createdb.onupgradeneeded = (event) => {
        database = event.target.result

        collection = database.createObjectStore("MASTER_DATA", { autoIncrement: true })

    }

    // ===================ADD FUNCTION=========================== 
    function insertdata(database, masterdata) {

        // =========== CREATE NEW TRANSACTION ON DATABASE ===========
        txn = database.transaction("MASTER_DATA", "readwrite");

        store = txn.objectStore("MASTER_DATA")

        mydataadd = store.add(masterdata)

        mydataadd.onsuccess = (event) => {
            console.log(event.target.result)
        }

        mydataadd.onerror = (event) => {
            console.log(event.target.result)
        }

        txn.oncomplete = () => {
            database.close();
        }
    }



    // ============================= GET ALL DATA (MASTER DATA) ===========================

    function getalldata(database) {
        const txn = database.transaction("MASTER_DATA", "readwrite")
        const objectStore = txn.objectStore("MASTER_DATA")
        let mydataget = objectStore.getAll();
        mydataget.onsuccess = (event) => {

            let value;
            let value1 = '';  // ========== FISCAL YEAR LIST ==========
            let value2 = '';  // ========= SCARB REVIEW LIST ==========          
            let fiscalYear = document.querySelector(".fiscalYearList");
            let scarb_review_month = document.querySelector(".scarbReviewList")
            let database = event.target.result

            let dataTable = document.querySelector("tr")
            database.forEach(element => {

                var End_date = new Date(element.POP_End_Date)
                var start_date = new Date(element.POP_Start_Date)
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
                if (element && element.Title) {
                    value = `${value ? value : " "}

                        <tr>                                                     
                            <td><input type="checkbox"></input></td>                       
                            <td> ${element.SCA_Number}<br>
                            <a href="#"target=_blank><br>
                            ${element.Project_Name}</a>
                            </td>                      
                            <td>${months[start_date.getMonth()]}-${start_date.getUTCFullYear()} to ${months[End_date.getMonth()]}-${End_date.getUTCFullYear()}</td>
                            <td>$${element.POP_Cost}</td>
                            <td>$${element.Total_Project_Cost}</td>
                            <td>${element.Contract_Term}</td>
                            <td>${element.SCARB_Review_Month}</td>
                            <td>${element.Status_Title}</td>
                        </tr>`

                        

                    value1 += `<option> ${element.FiscalYear.slice(2)} </option>` 
                    value2 += `<option> ${element.SCARB_Review_Month} </option>`
                                                              
            }
            });

            dataTable.insertAdjacentHTML("afterend", value)
            fiscalYear.insertAdjacentHTML("afterend", value1)           // ===== TO DISPLAY FISCAL YEAR LIST IN HTML =====
            scarb_review_month.insertAdjacentHTML("afterend", value2)   // ===== TO DISPLAY SCARB REVIEW LIST IN HTML ====
       
        };

        txn.oncomplete = function () {
            database.close();
        }
    }

})();


// ================================ META DATA ================================
// ================================ META DATA ================================


async function data() {

    let d = await fetch("./Assets/SCAContractMetadata.json");
    d = await d.json()
    let data = JSON.stringify(d);
    localStorage.setItem('result', data)

    let list1 = '';   // ====== DIRECTORATES LIST =====
    let list2 = '';   // ====== PRIMARY STAFF LIST =====
    let list3 = '';   // ====== SCA NUMBER DIR LIST =====
    let list4 = '';   // ====== CONTRACT TERM LIST =====

    var metadata = d.map((item, index) => {
        
        list1 = `${list1}<option value=${item.Directorates}>  ${item.Directorates}  </option>`
        list2 = `${list2}<option value=${item.Primary_Staff}> ${item.Primary_Staff} </option>`
        list3 = `${list3}<option value=${item.Directorates}>  ${item.Directorates}  </option>`
        list4 = `${list4}<option value=${item.Contract_Term}> ${item.Contract_Term} </option>`
        return true
    })

    let dir = document.querySelector(".all_dir");
    dir.insertAdjacentHTML("afterend", list1)

    let Primary_Staff_list = document.querySelector(".all_Primary_Staff");
    Primary_Staff_list.insertAdjacentHTML("afterend", list2)

    let directorates2_list = document.querySelector(".all_directorates2");
    directorates2_list.insertAdjacentHTML("afterend", list3)

    let Contract_Term_list = document.querySelector(".all_Contract_Term");
    Contract_Term_list.insertAdjacentHTML("afterend", list4)


} data();


// ================================== DIR FILTER ==================================
// ================================== DIR FILTER ==================================


function dirFilter() {
    let all_dirs = document.getElementById("dir").value.toUpperCase();

    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {

        let td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            let textValue = td.textContent.split("-");

            if (textValue[1] == "SS") {
                
                if (textValue[2].toUpperCase().indexOf(all_dirs) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
            else {
                if (textValue[1].toUpperCase().indexOf(all_dirs) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

// =============================== PRIMARY STAFF LIST FILTER ===============================
// =============================== PRIMARY STAFF LIST FILTER ===============================


function primaryStaffFilter() {
    let all_Primary_Staff = document.getElementById("Primary_Staff_list").value.toUpperCase();
    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            let textValue = td.textContent
            if (textValue.toUpperCase().indexOf(all_Primary_Staff) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}


// =============================== SCA DIRECTORATES2 FILTER ===============================
// =============================== SCA DIRECTORATES2 FILTER ===============================


function scaDirectoratesFilter() {
    let all_directorates2 = document.getElementById("directorates2_list").value.toUpperCase();
    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            let textValue = td.textContent.split("-")

            if (textValue[1] == "SS") {
                
                if (textValue[2].toUpperCase().indexOf(all_directorates2) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
            else {
                if (textValue[1].toUpperCase().indexOf(all_directorates2) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none"; 
                }
            }
        }
    }
}


// =============================== FISCAL YEAR FILTER ===============================
// =============================== FISCAL YEAR FILTER ===============================


function fiscalYearFilter() {
    let fiscalYearList = document.getElementById("fiscalYear").value;
    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            let textValue = td.textContent.split("-");

            if (textValue[1] == "SS" ) {

                if (textValue[3].toUpperCase().indexOf(fiscalYearList) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }

        else {
                if (textValue[2].toUpperCase().indexOf(fiscalYearList) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }

            }
        }
    }
}

function searchFun() {
    let filter = document.getElementById("myInput").value;
    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")
    
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            let textValue = td.textContent.split("-"); 
            
            if (textValue[1] == "SS" ) {

                    if (textValue[4].indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }

            else {
                    if (textValue[3].indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    }
                    else {
                        tr[i].style.display = "none";
                    }

                }
        }
    }
}


// =============================== SCARB REVIEW FILTER ===============================
// =============================== SCARB REVIEW FILTER ===============================


function scarbReviewFilter() {
    let scarbReviewList = document.getElementById("scarb_review_month").value.toUpperCase();
    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[6];
        if (td) {
            let textValue = td.textContent;
            if (textValue.toUpperCase().indexOf(scarbReviewList) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}


// =============================== CONTRACT TERM FILTER ===============================
// =============================== CONTRACT TERM FILTER ===============================


function contractTermFilter() {
    let all_Contract_Term = document.getElementById("Contract_Term_list").value.toUpperCase();
    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[5];
        if (td) {
            let textValue = td.textContent;
            if (textValue.toUpperCase().indexOf(all_Contract_Term) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}


























