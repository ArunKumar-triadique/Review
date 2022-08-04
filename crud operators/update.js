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
        
        let alldata = store.put(157,{
            "Title": "Troop Projects, a Win-Win for Army Reserve Soldiers and Installations ",
            "Description": "​The team of 24 engineers specializing in surveying, planning and design provided “turn-key” packets to the garrison. These design packets are handed over to military construction units to execute as additional troop projects. Troop projects significantly reduces costs for the garrison because they wont have to go to a civilian contractor to get the work done.\n\n“We are different than a lot of units, where a lot of us actually are engineers in our civilian capacity,” said Maj. Nathan Felosi, the officer in charge of the 415th Engineer Facility Detachment. For those that don’t have engineering background, troop projects provide real-world training with tangible results.\n\nIn addition to the packets, a pavilion at Blackhawk Park was rebuilt because some Soldiers in the survey team happened to have construction expertise.\n\n“This design\/survey team did a great job andRFSCAPDFFORM-DCS-G357-G6-18-709 (1).pdfput multiple project packets together and we appreciate all the hard work done for FHL,” said Trena Beebe, the garrison Public Works Dept. Troop project coordinator.\nUnits that conducted training here were the 926th Engineer Brigade, Montgomery, Ala.; 415th Engineer Facility Detachment, Knoxville, Tenn.; and 763rd Engineer Facility Detachment, Columbia, S.C.",
            "IsArchived": false,
            "Item Type": "Item",
            "Path": "sites\/medcombusoffice\/scarbprocess\/Lists\/SCANewsUpdatesList"
           });
        alldata.onsuccess = function() {
            console.log(alldata.result);
        };
        txn.oncomplete = function(){
            data.close();
        }
    }
})();