// ===== FETCHING MASTER DATA =====
async function masterData() {
    try {
        let masterdata = await fetch("Assets/SCAContractsMasterList.json")
            masterdata = await masterdata.json()
        return masterdata
    } catch (error) {
        alert("Something Went Wrong")
    }
}

// ===== FETCHING META DATA =====
async function metaData() {
    try {
        let metadata = await fetch("./Assets/SCAContractMetadata.json")
        metadata = await metadata.json()
        return metadata
    } catch (error) {
        alert("Something Went Wrong")
    }
}

function htmlSnippet(items) {

    let snippet;

    items.forEach(element => {

        var End_date = new Date(element.POP_End_Date)
        var start_date = new Date(element.POP_Start_Date)

        if (element) {
            snippet = `${snippet ? snippet : " "}

                    <tr>                                                     
                        <td class="checkbox"><input type="checkbox"></input></td>                       
                        <td>${element.SCA_Number}<br><a href="#"target=_blank class="projectName"><br>${element.Project_Name}</a></td>                                                
                        <td>${months[start_date.getMonth()]}-${start_date.getUTCFullYear()} to ${months[End_date.getMonth()]}-${End_date.getUTCFullYear()}</td>
                        <td>${element.POP_Cost}</td>
                        <td>${element.Total_Project_Cost}</td>
                        <td>${element.Contract_Term}</td>
                        <td>${element.SCARB_Review_Month}</td>
                        <td>${element.Status_Title}</td>
                    </tr>`
        }
    })
    
    let dataTable = document.querySelector("#tableData tbody")
    dataTable.innerHTML = snippet

    return snippet
}


(async () => {

    if (!window.indexedDB) {
        return;
    }

    databasename = "MEDCOM"
    version = 1

    createdb = indexedDB.open(databasename, version)

    createdb.onerror = (event) => {
        console.log(event.target.result)
    }

    createdb.onsuccess = async (event) => {
        let database = event.target.result;


        getalldata(database)

        let setlocal = await metaData();
        localStorage.setItem("result", JSON.stringify(setlocal));
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

    function filter(masterData) {

        let getLocal = localStorage.getItem("result");
            getLocal = JSON.parse(getLocal)

            getLocal.forEach((item) => {
                list2 = `${list2}<option value="${item.Directorates}">  ${item.Directorates}  </option>`
        })

        // ========== TO REMOVE DUPLICATE & NULL VALUE ==========     
        let primarystaff = Array.from (new Set(masterData.map(item => item.Primary_Staff))).sort()           
        let Fiscalyear = new Set(masterData.map(item => item.FiscalYear)) 
        let scarbreview = new Set(masterData.map(item => item.SCARB_Review_Month))
        let ContractTerm = Array.from(new Set(masterData.map(item => item.Contract_Term))).sort()
           
        primarystaff.forEach(item => {
            list1 = `${list1}<option value=${item}> ${item} </option>`
        })

        Fiscalyear.forEach(item => { 
            list3 = `${list3}<option value="${item}"> ${item.slice(2)} </option>`
        })

        scarbreview.forEach(item => {
            list4 = `${list4}<option value="${item}">${item}</option>`
        })

        ContractTerm.forEach(item => {
            list5 = `${list5}<option value="${item}"> ${item} </option>`
        })

        // ========== TO DISPLAY DATA IN HTML ==========
        let dir = document.querySelector(".all_dir");
        dir.insertAdjacentHTML("afterend", list2)

        primarystaff = document.querySelector(".all_Primary_Staff");
        primarystaff.insertAdjacentHTML("afterend", list1)

        let directorates2_list = document.querySelector(".all_directorates2");
        directorates2_list.insertAdjacentHTML("afterend", list2)

        FiscalYear = document.querySelector(".fiscalYearList");
        FiscalYear.insertAdjacentHTML("afterend", list3)

        scarbreview = document.querySelector(".scarbReviewList");
        scarbreview.insertAdjacentHTML("afterend", list4)

        ContractTerm = document.querySelector(".all_Contract_Term");
        ContractTerm.insertAdjacentHTML("afterend", list5);

    }

    // =============== GET ALL DATA (MASTER DATA) ===============
    async function getalldata(database) {
        const txn = database.transaction("MASTER_DATA", "readwrite")
        const objectStore = txn.objectStore("MASTER_DATA")
        let mydataget = objectStore.getAll();

        master = mydataget;
        mydataget.onsuccess = (event) => {
          
            let fiscalYear = document.querySelector(".fiscalYearList");
            let scarb_review_month = document.querySelector(".scarbReviewList")
            let database = event.target.result

            let filterdata = filter(database);
            value = htmlSnippet(database)
            fiscalYear.insertAdjacentHTML("afterend", value1)           
            scarb_review_month.insertAdjacentHTML("afterend", value2)   
        };

        txn.oncomplete = function () {
            database.close();
        }
    }

})();

// ========== DIRECTORATES FILTERATION ==========
function dirFilter() {
    let all_dirs = document.getElementById("dir").value.toLowerCase();
    let allPrimaryStaff = document.getElementById("Primary_Staff_list").value = "all_Primary_Staff";
    if (all_dirs != "all_dir") {
        master1 = master.result.filter(item => item.Directorate.toLowerCase() === all_dirs)
        htmlSnippet(master1)
    } else {
        htmlSnippet(master.result)
    }
}

// ========== PRIMARY STAFF FILTERATION ==========
function primaryStaffFilter() {
    let all_dirs = document.getElementById("dir").value.toLowerCase() != "all_dir" ? document.getElementById("dir").value.toLowerCase() : null;

    let allPrimaryStaff = document.getElementById("Primary_Staff_list").value.toLowerCase();
    if (allPrimaryStaff != "all_primary_staff") {
        master1 = master.result.filter(item => {

            if(all_dirs !== null){
                return item.Directorate.toLowerCase() === all_dirs && item.Primary_Staff.toLowerCase() === allPrimaryStaff
            }else{
                return item.Primary_Staff.toLowerCase() === allPrimaryStaff   
            }
        })
        htmlSnippet(master1)
    } else if(all_dirs !== null){
        master1 = master.result.filter(item=>item.Directorate.toLowerCase() === all_dirs)
        htmlSnippet(master1)
    } else {
        htmlSnippet(master.result)
    }
 
}

// ========== DIRECTORATES FILTERATION ==========
function scaDirectoratesFilter() {
    let alldir2 = document.getElementById("directorates2_list").value.toLowerCase();
    if (alldir2 != "all_directorates2") {
        master1 = master.result.filter(item => item.Directorate.toLowerCase() === alldir2)
        htmlSnippet(master1)
    } else {
        htmlSnippet(master.result)
    }
}

// ========== DIRECTORATES FILTERATION ==========
function fiscalYearFilter() {
    let fiscalyears = document.getElementById("fiscalYear").value;
    if (fiscalyears != "fiscalYearList") {
        master1 = master.result.filter(item => item.FiscalYear === fiscalyears)
        htmlSnippet(master1)
    } else {
        htmlSnippet(master.result)
    }
}

// ========== SCARB REVIEW FILTERATION ==========
function scarbReviewFilter() {
    let scarbreviews = document.getElementById("scarb_review_month").value;
    if (scarbreviews != "scarbReviewList") {
        master1 = master.result.filter(item => item.SCARB_Review_Month === scarbreviews)
        htmlSnippet(master1)
    } else {
        htmlSnippet(master.result)
    }
}

// ========== CONTRACT TERM FILTERATION ==========
function contractTermFilter() {
    let contracts = document.getElementById("Contract_Term_list").value.toLowerCase();
    if (contracts != "all_contract_term") {
        master1 = master.result.filter(item => item.Contract_Term.toLowerCase() === contracts)
        htmlSnippet(master1)
    } else {
        htmlSnippet(master.result)
    }
}

// ========== SEARCH BOX ==========
function searchFun() {
    let filter = document.getElementById("myInput").value;
    let tableData = document.getElementById("tableData");
    let tr = tableData.getElementsByTagName("tr")

    if (filter.length >= 3) {

        for (i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[1];

            if (td) {
                let textValue = td.textContent;

                if (textValue.indexOf(filter) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    else {
        htmlSnippet(master.result)
    }
}



























