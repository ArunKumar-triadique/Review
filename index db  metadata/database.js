async function data() {

    let d = await fetch("SCAContractMetadata.json");
    d = await d.json();
    let datastore = JSON.stringify(d);
    localStorage.setItem('result',datastore);
    console.log(localStorage);
}