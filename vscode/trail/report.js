// ............... Meta Data Start....................
async function data() {
  let d = await fetch("SCAContractMetadata.json");

  d = await d.json();
  // console.log(d)
  let data = JSON.stringify(d);
  // console.log(data)
  localStorage.setItem("result", data);
  //console.log(localStorage);
  let masterdata = masterdatalist;
  let list = "";
  var metadata = d.map((item, index) => {
    //console.log(item.Directorates);

    return `${item.Directorates}`;
  });
  //console.log(metadata)
  let newmetadata = metadata.map((items, index) => {
    if (items.Directorates === element.Directorate) {
    }
  });
  // let dir_list = document.querySelectorAll(".all_dir");
  // dir_list.insertAdjacentHTML("afterend",list)
}
data();

// ................ Meta Data Close ..................

// ............. Master List Data Starts ...............
(async () => {
  //........... all the code will be here  ...........
  // ..................Fetch the Data Here...................
  let mylist = await fetch("SCAContractsMasterList.json");
  mylist = await mylist.json();
  // .......check the indexedDB is work in browser or not......
  if (!window.indexedDB) {
    return;
  }
  //...............Create database..................
  let dbname = "govind";
  let version = 2;
  let createdb = indexedDB.open(dbname, version);
  createdb.onerror = (event) => {
    //console.log(event);
  };
  createdb.onsuccess = (event) => {
    //...................Add implementation here....................

    let ab = event.target.result;
    //^^^^^^^^^^^ Using for loop ^^^^^^^^^^^^^^^^^
    //   for (i = 0; i < mylist.length; i++) {
    //     let vasu = mylist[i];
    //     vasu.createdAt = new Date();
    //     vasu.updatedAt = new Date();
    //     adding(ab, vasu);
    //   }
    getall(ab);
  };
  //..........................create the Contacts object store and indexes.........................

  createdb.onupgradeneeded = (event) => {
    let abc = event.target.result;
    console.log(abc);
    //..................create the datastore object store...............
    //...................... with auto-increment id...................
    let data = abc.createObjectStore("datastore", {
      autoIncrement: true,
    });
  };

  // .................. Add data ......................
  // function adding(ab, contact) {
  //   // ............create a new transaction.............
  //   let txn = ab.transaction("datastore", "readwrite");

  //   //^^^^^^^^^^^^^^get the Contacts object store^^^^^^^^^^^
  //   let store = txn.objectStore("datastore");
  //   let query = store.add(contact);

  //   //  let alldata = store.getAll();
  //   //  alldata.onsuccess = function(){
  //   //     console.log(alldata.result);
  //   //}
  //   //^^^^^^^^^^^^^  handle success case^^^^^^^^^^^^^^^
  //   query.onsuccess = function (event) {
  //     //console.log(event);
  //   };

  //   //....................... handle the error case..............
  //   query.onerror = function (event) {
  //     console.log(event.target.errorCode);
  //   };

  //   //.....................close the database once the...............
  //   //......................transaction completes....................
  //   txn.oncomplete = function () {
  //     ab.close();
  //   };
  // }
  //^^^^^^^^^^^^^^^Get All the Data ^^^^^^^^^^^^^^^^^^^^
  function getall(ab) {
    //............create a new transaction.............
    let txn = ab.transaction("datastore", "readwrite");

    // ^^^^^^^^^^^^^^get the Contacts object store^^^^^^^^^^^
    let objectStore = txn.objectStore("datastore");

    //^^^^^^^^^^^^^  handle success case^^^^^^^^^^^^^^^
    let alldata = objectStore.getAll();
    alldata.onsuccess = (event) => {
      let value;
      let value2;
      let abc = event.target.result;

      let tabledata = document.querySelector("tr");

      abc.forEach((element) => {
        var date = new Date(element.POP_End_Date);
        var startdate = new Date(element.POP_Start_Date);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        if (element && element.Title) {
          value = `${value ? value : ""}            

                  <tr>
                      <td> <input type="checkbox"/> ${element.SCA_Number}<br>
                      <a href="/" target = blank>${
                        element.Project_Name
                      }</a></td>
                      <td>${
                        months[startdate.getMonth()]
                      }-${startdate.getUTCFullYear()} to ${
            months[date.getMonth()]
          }-${date.getUTCFullYear()}</td>
  
                      <td> &#36;${element.POP_Cost}</td>
                      <td> &#36;${element.Total_Project_Cost}</td>
                      <td>${element.Contract_Term}</td>
                      <td>${element.SCARB_Review_Month}</td>
                      <td>${element.Status_Title}</td>
                      </tr>`;
        }
      });
      tabledata.insertAdjacentHTML("afterend", value);
    };
    alldata.onsuccess = (event) => {
      let dat = event.target.result;
      var masterdatalist = dat.map((element, index) => {
        return `${element.Directorate}`;
      });
      console.log(masterdatalist);
      // let newData = new Set(masterdatalist);
      // newData = [...newData].filter((item) => item != "null");
      //  console.log(newData);
    };

    // ^^^^^^^^^^^^^^^ handle the error case ^^^^^^^^^^
    // alldata.onerror = function (event) {
    //   console.log(event.target.errorCode);
    // };

    // close the database once the
    // transaction completes
    txn.oncomplete = function () {
      ab.close();
    };
  }
})();
