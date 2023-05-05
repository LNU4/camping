var myMap;				
var gApikey = "AIzaSyB19g_qYmTuOUhxZZ3LrdbTYU8qtCFf36s";  
var myApiKey = "dUZXES2j";
let resultElem;
let id; 
let lng;
let lat;
function init() {

    let activityButton = document.getElementsByClassName("button aktiviteter")[0]; 
    activityButton.addEventListener("click", showActivity) 

  
    resultElem = document.getElementsByClassName("body-result-box")[0];
    showinfo(); 
}

window.addEventListener("load", init);

function showinfo() {
    
        let searchParams = new URLSearchParams(window.location.search);
        id = searchParams.get("id");
      
        let url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&ids=" + id;
      
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Den begärda resursen finns inte.");
            }
          })
          .then(data => {
            info(JSON.stringify(data));
          })
          .catch(error => {
            console.error("Det finns probleme med kommunikationen", error);
          });
      

}

function info (JSONtext) {

    let descBox = document.getElementsByClassName("body-descr-box")[0];

    let detailElem = JSON.parse(JSONtext).payload[0];
    console.log(detailElem);

    lat = detailElem.lat; 
    lng = detailElem.lng; 
    console.log(lat,lng)
    let container = document.createElement("div");
    container.classList.add("guidePageCampingRes");
    container.setAttribute("cid", id);

    let pElement = document.createElement("p");
    pElement.innerText = detailElem.name;
    pElement.classList.add("guideNameElement");

    let pElement2 = document.createElement("p");
    pElement2.innerText = detailElem.rating;
    pElement2.classList.add("guideRatingElement");
    
    let pElement3 = document.createElement("p");
    pElement3.innerText = detailElem.price_range;
    pElement3.classList.add("guidePriceRangeElement");

    let pElement4 = document.createElement("p");
    pElement4.innerText = detailElem.text;
    pElement4.classList.add("guideTextElement");

    container.append(pElement, pElement2, pElement3, pElement4);
    descBox.append(container);
}

function showActivity() {
    let url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=activity&method=getfromlatlng&lat=" + lat +"&lng=" +lng;
    
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Den begärda resursen finns inte.");
        }
      })
      .then(data => {
        console.log("works")
        let activityElem = data.payload;
        console.log(activityElem);
        for (let i = 0; i < activityElem.length; i++) {
            let activityContainer = document.createElement("div");
            activityContainer.classList.add("activity-container"); 
            
            let pElement = document.createElement("p");
            pElement.innerText = activityElem[i].name;
            pElement.classList.add("activity-Element");

            let pElement1 = document.createElement("p");
            pElement1.innerText = activityElem[i].description;
            pElement1.classList.add("activity-Element");
    
            let pElement2 = document.createElement("p");
            pElement2.innerText = activityElem[i].child_support;
            pElement2.classList.add("activity-Element");
    
            let pElement3 = document.createElement("p");
            pElement3.innerText = "min age: " + activityElem[i].min_age;
            pElement3.classList.add("activity-Element");
    
            activityContainer.append(pElement, pElement1, pElement2, pElement3);
            resultElem.append(activityContainer);

        }

      })
      .catch(error => {
        console.error("Det finns probleme med kommunikationen", error);
      });
  


}