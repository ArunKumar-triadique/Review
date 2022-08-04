(async()=>{
    let mylist= await fetch("SCAContractsMasterList.json");
    mylist = await mylist.json();
    if(!window.indexedDB){
        return;
    }
    const dataname = "Apple"
    const version = 11;
    const createdb = indexedDB.open(dataname,version);
    createdb.onerror = (event)=>{
        console.log(event);
    }
    createdb.onsuccess = (event)=>{
        let ab = event.target.result;
databases(ab,mylist);
    }
    createdb.onupgradeneeded = (event)=>{
        let abc = event.target.result;
        
        let data = abc.createObjectStore("datastore",{autoIncrement:true});
    }
    function databases(data,mylist){
        const txn = data.transaction('datastore','readwrite');
        const store = txn.objectStore('datastore');
        
        let alldata = store.getAll();
        
        alldata.onsuccess = (event)=>{
            let value
            let value2;
            let dataname = event.target.result;
            // console.log(event)

            let container = document.querySelector("tr");

            dataname.forEach(element=>{
                if(element && element.Title){
                    value = `${value ? value:""}<br> <tr>
                        <td>${element.Title}</td>
                        <td>${element.JustificationforContract}</td>
                        <td>${element.Directorate}</td>
                        <td>${element.SCANumber}</td>
                        <td>${element.ContractDuration}</td>
                        <td>${element.RequestedCost}</td>
                        <td>${element.TotalProjectCost}</td>
                        <td>${element.ContractTerm}</td>
                        <td>${element.SCARBReview}</td>
                        <td>${element.Status}</td>
                    </tr>`
                
                container.insertAdjacentHTML("afterend",value);

            }
        });

            // container.insertAdjacentHTML("afterend",value);

        txn.oncomplete = function(){
            data.close();
        }
    }
}
    })();