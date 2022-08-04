(function(){
    if(!window.indexedDB){
    return ;
    }
    const dbname = "mydata";
    const version = 1;
    const createdb = indexedDB.open(dbname,version);
    createdb.onerror =(event)=>{
    console.log(event)

    }
    createdb.onsuccess = (event)=>{
        console.log(event.target.result)
    }
    createdb.onupgradeneeded = (event)=>{
        console.log(event.target.result)
    }
})();