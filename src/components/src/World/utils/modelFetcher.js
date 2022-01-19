import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const fetchModel = async(link) =>{

    const response = await fetch(link);
    const data = await response.json();
    return data;

}

function fetchModels(){
    // array of models
    var link = [
    "https://bafybeidaknpdtvgn5v6poj2vxl4gfx2ii6uqmzfubcgbungd26d7iupnnq.ipfs.infura-ipfs.io/",
    "https://ipfs.infura.io/ipfs/QmSUaHtvQmnw3LcbHphZEjdX1PQtd8aG2kuKbiAx8PncSi",
    "https://ipfs.infura.io/ipfs/bafybeihspibchatq4peswt357yqhzraqdx54s5nokltrf5ydpn5pqdmtpq",
    "https://ipfs.infura.io/ipfs/QmVPUPiTCoQm7JbpiCvVhhHtvXjA1nAXXHvvS4ymFYiSe2"
    ]

    // removing duplicates 
    var uniqueLinks = [...new Set(link)]

    let models = [];
    uniqueLinks.forEach((link) => {
        fetchModel(link).then(data => {
            models.push(data);
        }).catch(err => {
            console.log(err);
        });
    });

    return models;
}

export { fetchModels };

// const fetchModel = (url) => {

//     return new Promise((resolve, reject)=>{        
//         const request = new XMLHttpRequest();

//         request.addEventListener('readystatechange', ()=>{
//             if(request.readyState === 4 && request.status === 200){
//                 const data = JSON.parse(request.responseText);
//                 resolve(data);
//             }else if(request.readyState === 4)
//             {
//                 reject('error getting resource');
//             }
//         });

//         request.open('GET', url);
//         request.send();
//     })
// } 

// async function fetchModels(){
//     // array of models
//     var link = [
//     "https://bafybeidaknpdtvgn5v6poj2vxl4gfx2ii6uqmzfubcgbungd26d7iupnnq.ipfs.infura-ipfs.io/",
//     "https://ipfs.infura.io/ipfs/QmSUaHtvQmnw3LcbHphZEjdX1PQtd8aG2kuKbiAx8PncSi",
//     "https://bafybeihspibchatq4peswt357yqhzraqdx54s5nokltrf5ydpn5pqdmtpq.ipfs.infura-ipfs.io/",
//     "https://ipfs.infura.io/ipfs/Qme3SksF45XJsNYmmwnjyqqwJr5p7TRAn5Xvm6kZC5ogwW",
//     "https://ipfs.infura.io/ipfs/QmTrzt8f5nG6yvJjxfQtgTse441utXGsM4mtKvoZ41NbN1",
//     "https://ipfs.infura.io/ipfs/QmWxMomQ8m7ZgAMHhNRgHQNcsnmL2Vare4VGdC1UdjRPLb",
//     "https://ipfs.infura.io/ipfs/QmSQgohBNakXqYkiHw7QN8XPoRp2RqWBkwJNhGWidy7Vnz",
//     "https://ipfs.infura.io/ipfs/QmVPUPiTCoQm7JbpiCvVhhHtvXjA1nAXXHvvS4ymFYiSe2",
//     "https://ipfs.infura.io/ipfs/QmY2toG7BFRoatEY8yb3N1eQxMjU336pjVWYhtiPVTAeYR",
//     "https://ipfs.infura.io/ipfs/QmWQdVy9UdNurW23aDJUaZKe6sh7XUBDAzXrNhpLSN3Jhq"]

//     // removing duplicates 
//     var uniqueLinks = [...new Set(link)]
//     console.log(uniqueLinks.length);
//     let models = [];
//     uniqueLinks.forEach(value => {
//         fetchModel(value).then(data => {
//             console.log(data);
//         }).catch(err => {
//             console.log(err);
//         });
//     });

//     return models;
// }