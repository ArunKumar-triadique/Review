
//   async and await function to be used to attach json file
(async()=>{
    let mylist= await fetch("SCAContractsMasterList.json");
    mylist = await mylist.json();

    //  whether the indexedDB supports or not by writing if condition
    if(!window.indexedDB){
        return;
    }


    // creating database name to call
    const dataname = "Apple"
    const version = 11;


        //  creating with using indexedDB.open()
    const createdb = indexedDB.open(dataname,version);

            //   event methods to pass=> "onerror"
    createdb.onerror = (event)=>{
        alert("Database not found")
    }

            //  event methods to pass=>"onsuccess"
    createdb.onsuccess = (event)=>{
        let ab = event.target.result;
databases(ab,mylist);
    }

            //  event methods to pass=>"onupgradeneeded"
    createdb.onupgradeneeded = (event)=>{
        let abc = event.target.result;
        
        let data = abc.createObjectStore("datastore",{autoIncrement:true});
    }


           // using function call to get the data
    function databases(data,mylist){
        const txn = data.transaction('datastore','readwrite');
        const store = txn.objectStore('datastore');
        
        let alldata = store.getAll();
        
        alldata.onsuccess = (event)=>{
            let value

            let value2;
            let dataname = event.target.result;

            let container = document.querySelector("tr");


                    // using forEach() higher-order-function 
            dataname.forEach(element=>{
                var date=new Date(element.POP_End_Date)
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
                var months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"]

                //   if condition to add and return the data
                if(element && element.Title){
                    value = `${value ? value:""}
                    <tr>
                        <td><input type="checkbox"></input> 
                        ${element.Title} <br> <a href= "/" target =_blank>${element.Project_Name}</a></td>
                        <td>${months[startdate.getMonth()]}-${startdate.getUTCFullYear()} to ${months[date.getMonth()]}-${date.getUTCFullYear()}</td>
                        <td>$${element.POP_Cost}</td>
                        <td>$${element.Total_Project_Cost}</td>
                        <td>${element.Contract_Term}</td>
                        <td>${element.SCARB_Review_Month}</td>
                        <td>${element.Status_Title}</td>
                       
                    </tr>`
                

                    // using accessing element to get value
                container.insertAdjacentHTML("afterend",value);

            }
        });

         txn.oncomplete = function(){
            data.close();
        }
    }
}
    })();