async function data(){
    let d = await fetch("./assets/SCAContractMetadata.json")
    d = await d.json()
    let data1 = JSON.stringify(d);

    localStorage.setItem('result',data1)

    console.log(localStorage)
}
data()
