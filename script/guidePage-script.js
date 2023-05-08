var myMap;				
var gApikey = "AIzaSyB19g_qYmTuOUhxZZ3LrdbTYU8qtCFf36s";  
var myApiKey = "dUZXES2j";
let resultElem;
let id; 
let lng;
let lat;
function init() {

    let activityButton = document.getElementsByClassName("button aktiviteter")[0]; 
    activityButton.addEventListener("click", showActivity); 

    let weatherButton = document.getElementsByClassName("button vaderprognoser")[0]; 
    weatherButton.addEventListener("click", showWeather); 

    let restaurantButton = document.getElementsByClassName("button restauranger")[0];
    restaurantButton.addEventListener("click", showRestaurant);  
  
    resultElem = document.getElementsByClassName("body-result-box")[0];
    showinfo();
}

window.addEventListener("load", init);

function showinfo() {
    
        let searchParameter = new URLSearchParams(window.location.search);
        id = searchParameter.get("id");
      
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
            console.error("Det finns problem med kommunikationen", error);
          });
}

function info(JSONtext) {

    let descBox = document.getElementsByClassName("body-descr-box")[0];

    let detailElem = JSON.parse(JSONtext).payload[0];
    console.log(detailElem);

    lat = detailElem.lat; 
    lng = detailElem.lng; 
    console.log(lat,lng)
    let container = document.createElement("div");
    container.classList.add("guidePageCampingRes");

    let bodyImages = document.getElementsByClassName("largeImg")[0];
    bodyImages.setAttribute("cid", id);
    let pElement = document.createElement("h3");
    pElement.innerText = detailElem.name;
    pElement.classList.add("guideNameElement");

    let pElement2 = document.createElement("p");
    pElement2.innerText = "Betyg: " + detailElem.rating;
    pElement2.classList.add("guideRatingElement");
    
    let pElement3 = document.createElement("p");
    pElement3.innerText = "Prisnivå: " + detailElem.price_range;
    pElement3.classList.add("guidePriceRangeElement");

    let pElement4 = document.createElement("p");
    pElement4.innerText = detailElem.text;
    pElement4.classList.add("guideTextElement");

  
    container.append(pElement, pElement2, pElement3, pElement4);
    descBox.append(container);

    imgUrlCall();

}

function showActivity() {
    let searchParameter = new URLSearchParams(window.location.search);
    id = searchParameter.get("id");

    let url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=activity&method=getfromlatlng&lat=" + lat +"&lng=" +lng;
    let url2 = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&ids=" + id;
    resultElem.innerHTML = ""; 

    fetch(url2)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
      console.log("works")
      let titleElem = data.payload;
      console.log(titleElem);

      for (let i = 0; i < titleElem.length; i++) {
          let pNameElement = document.getElementsByClassName("body-info-tab")[0];
          pNameElement.innerText = "Aktiviter vid " + titleElem[i].name; 
      }
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });

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
            pElement1.innerText = " Typ av aktivitet: " + activityElem[i].description;
            pElement1.classList.add("activity-Element");
    
            console.log(activityElem[i].name +" är barnvänligt?: " + activityElem[i].child_support + " och lägsta ålder: " + activityElem[i].min_age);
            /*
            let pElement2 = document.createElement("p");
            pElement2.innerText = activityElem[i].child_support;
            pElement2.classList.add("activity-Element");
            */
            /*
            let pElement3 = document.createElement("p");
            pElement3.innerText = "min age: " + activityElem[i].min_age;
            pElement3.classList.add("activity-Element");
            */
            activityContainer.append(pElement, pElement1,);
            resultElem.append(activityContainer);
        }
      })
      .catch(error => {
        console.error("Det finns problem med kommunikationen", error);
      });
}

function showWeather() {
  let url = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude=" +lng+"&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,showers_sum,snowfall_sum,windspeed_10m_max&forecast_days=16&timezone=Europe%2FBerlin";
  let url2 = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&ids=" + id;
  resultElem.innerHTML = ""; 

  fetch(url2)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
      console.log("works")
      let titleElem = data.payload;
      console.log(titleElem);

      for (let i = 0; i < titleElem.length; i++) {
          let pNameElement = document.getElementsByClassName("body-info-tab")[0];   // Utskriving av namnet för campingen tillsammans med passande text.
          pNameElement.innerText = "Väderprognoser för " + titleElem[i].name;   
      }
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
      let weatherElem = data.daily;
      let timeResult = weatherElem.time;
      let weatherResult = weatherElem.weathercode;
      let maxTempResult= weatherElem.temperature_2m_max;
      let minTempResult = weatherElem.temperature_2m_min;
      
      for (let i = 0; i < timeResult.length; i++) {
        let activityContainer = document.createElement("div");
        activityContainer.classList.add("activity-container"); 
      
        let pElement = document.createElement("p");
        pElement.innerText = timeResult[i] + " ";
        pElement.innerText += weatherResult[i] + " ";
        pElement.innerText += "Temp max: " + maxTempResult[i] + " ";
        pElement.innerText += "Temp min: " + minTempResult[i];
        pElement.classList.add("activity-Element");
      
        activityContainer.append(pElement);
        resultElem.append(activityContainer);
      }
      

    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });


}

function imgUrlCall() {
  let imgUrl = "data/imageforplaces.json";

  fetch(imgUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(imgData => {
      /*let imgDataElement = imgData.camping;
      let nameElements = document.querySelectorAll(".filterElemenDiv p:nth-of-type(1)");

      for (let i = 0; i < nameElements.length; i++) {
        let elemName = nameElements[i].textContent;
        for (let j = 0; j < imgDataElement.length; j++) {
          let imgDataName = imgDataElement[j].id;
          if (elemName == imgDataName) {
            let divHost = document.getElementsByClassName("filterElemenDiv")[i];

            let imgElem = document.createElement("img"); // Issues with the current code as images are not showing on certain elements meanwhile 2-3 on others 
            imgElem.src = imgDataElement[j].logo;
            divHost.appendChild(imgElem);
            resultatElem.append(divHost);
            break;
          }
        }
      }*/
      let res = document.getElementsByClassName("largeImg")[0];
      
        let elem = res;
        let cid = elem.getAttribute("cid");
        console.log(cid);
        elem.getElementsByTagName("img")[0].src = findIn(imgData.camping, "id", cid).logo;
          
      
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });
}

function findIn(stack, key, value) {
  console.log(value)
  for (let i = 0; i < stack.length; i++) {
    if (stack[i][key] == value) {
      return stack[i];
    }
  }

  return null;
}

function showRestaurant () {
  let url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=food&method=getfromlatlng&lat=" + lat +"&lng=" +lng + "&radius=15";
  let url2 = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&ids=" + id;
  resultElem.innerHTML = ""; 

  fetch(url2)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
      console.log("works")
      let titleElem = data.payload;
      console.log(titleElem);

      for (let i = 0; i < titleElem.length; i++) {
          let pNameElement = document.getElementsByClassName("body-info-tab")[0];   // Utskriving av namnet för campingen tillsammans med passande text.
          pNameElement.innerText = "Restauranger vid " + titleElem[i].name;   
      }
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });

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
          pElement2.innerText = "Avstånd "+activityElem[i].distance_in_km;
          pElement2.classList.add("activity-Element");
  
          let pElement3 = document.createElement("p");
          pElement3.innerText = "Pris: " + activityElem[i].avg_dinner_pricing;
          pElement3.classList.add("activity-Element");
  
          activityContainer.append(pElement, pElement1, pElement2, pElement3);
          resultElem.append(activityContainer);

      }

    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });
  
}