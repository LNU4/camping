var myMap;
var gApikey = "AIzaSyB19g_qYmTuOUhxZZ3LrdbTYU8qtCFf36s";
var myApiKey = "dUZXES2j";
var resultElem;
var id;
var placeLng;
var placeLat;

function init() {

  let activityButton = document.getElementsByClassName("button aktiviteter")[0];
  activityButton.addEventListener("click", showActivity);

  let weatherButton = document.getElementsByClassName("button vaderprognoser")[0];
  weatherButton.addEventListener("click", showWeather);

  let restaurantButton = document.getElementsByClassName("button restauranger")[0];
  restaurantButton.addEventListener("click", showRestaurant);

  let EquipmentButton = document.getElementsByClassName("button utrustningFaciliteter")[0]; 
  EquipmentButton.addEventListener("click", showEquipments); 

  resultElem = document.getElementsByClassName("body-result-box")[0];

  showinfo();
  showEquipments();
}

//window.addEventListener("load", init);

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
     
     let descBox = document.getElementsByClassName("body-descr-box")[0];

     let detailElem = data.payload[0];
    
     let websiteLink = document.querySelector(".button.recensioner").parentNode;; 
      websiteLink.href = detailElem.website; 
   
     placeLat = detailElem.lat;
     placeLng = detailElem.lng;
    
     let container = document.createElement("div");
     container.classList.add("guidePageCampingRes");
   
     let bodyImages = document.getElementsByClassName("largeImg")[0];
     bodyImages.setAttribute("cid", id);
     let pElement = document.createElement("h3");
     pElement.innerText = detailElem.name;
     pElement.classList.add("guideNameElement");
   
     let pElement2 = document.createElement("div");
     let rating = parseFloat(detailElem.rating); 
     pElement2.innerHTML = convertRating(rating);
     pElement2.classList.add("guideRatingElement");
   
     let pElement3 = document.createElement("p");
     pElement3.innerText = "Prisnivå: " + detailElem.price_range + " SEK";
     pElement3.classList.add("guidePriceRangeElement");
   
     let contactElement = document.createElement("div"); 
     contactElement.classList.add("contactElement")
     let phoneNumberelement = document.createElement("p"); 
     phoneNumberelement.innerText = detailElem.phone_number; 
     contactElement.append(phoneNumberelement); 
   
     let pElement4 = document.createElement("p");
     pElement4.innerText = detailElem.text;
     pElement4.classList.add("guideTextElement");
      
     if (pElement4.innerText === "") {
      pElement4.innerText = "Det finns inga information om platsen"
    }
   
     container.append(pElement, pElement2, pElement3, contactElement, pElement4);
     descBox.append(container);
   
     imgUrlCall();
     initMap(detailElem);

    })
    .catch(error => {
      console.error("Det finns probleme med kommunikationen", error);
    });


}



function showActivity() {
  console.log(placeLat, placeLng)
  let url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=activity&method=getfromlatlng&lat=" + placeLat + "&lng=" + placeLng;
  resultElem.innerHTML = "";
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
     
      let activityElem = data.payload;
     
      for (let i = 0; i < activityElem.length; i++) {
        let activityContainer = document.createElement("div");
        activityContainer.classList.add("activity-container");

        let pElement = document.createElement("p");
        pElement.innerText = activityElem[i].name;
        pElement.classList.add("activity-Element");

        let pElement1 = document.createElement("p");
        pElement1.innerText = activityElem[i].description;
        pElement1.classList.add("activity-Element");

        let pElement3 = document.createElement("img");
        pElement3.src = "../activityAssets/" + activityElem[i].description + ".svg";
        pElement3.alt = activityElem[i].description;
        pElement3.classList.add("activity-image");

        let pElement4 = document.createElement("div");
        let rating = parseFloat(activityElem[i].rating); 
        pElement4.innerHTML = convertRating(rating);
        pElement4.classList.add("ratingElement");

        activityContainer.append(pElement1, pElement, pElement3, pElement4);
        resultElem.append(activityContainer);

      }

    })
    .catch(error => {
      console.error("Det finns probleme med kommunikationen", error);
    });

}

function showWeather() {

  let url = "https://api.open-meteo.com/v1/forecast?latitude=" + placeLat + "&longitude=" + placeLng + "&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,showers_sum,snowfall_sum,windspeed_10m_max&forecast_days=7&timezone=Europe%2FBerlin";
  resultElem.innerHTML = "";
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
      let maxTempResult = weatherElem.temperature_2m_max;
      let minTempResult = weatherElem.temperature_2m_min;

      for (let i = 0; i < timeResult.length; i++) {
        let activityContainer = document.createElement("div");
        activityContainer.classList.add("activity-container");

        let pElement = document.createElement("p");
        pElement.innerText = timeResult[i] + " ";
        pElement.innerText += weatherResult[i] + " ";
        pElement.innerText += "Högsta temperatur  : " + maxTempResult[i] + " ";
        pElement.innerText += "Lägsta temperatur: " + minTempResult[i];
        pElement.classList.add("activity-Element");

        let WeatherDsiplay = document.createElement("img"); 
        WeatherDsiplay.src = "../" //stopped here to be fixed later, need a logic to write it effectivly
        activityContainer.append(pElement);
        resultElem.append(activityContainer);
      }


    })
    .catch(error => {
      console.error("Det finns probleme med kommunikationen", error);
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
    
      let res = document.getElementsByClassName("largeImg")[0];

      let elem = res;
      let cid = elem.getAttribute("cid");
    
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

function showRestaurant() {

  let url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=food&method=getfromlatlng&lat=" + placeLat + "&lng=" + placeLng + "&radius=15";
  resultElem.innerHTML = "";
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
      
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

        let imgElement = document.createElement("img"); 
        imgElement.src = "../SVGassets/restaurant.svg";
        imgElement.alt = activityElem[i].description;
        imgElement.classList.add("restaurant-img");
        
        let pElement2 = document.createElement("p");
        pElement2.innerText = "Avstånd " + Math.trunc(activityElem[i].distance_in_km) + " KM";
        pElement2.classList.add("activity-Element");

        let pElement3 = document.createElement("p");
        pElement3.innerText = "Pris: " + activityElem[i].avg_dinner_pricing;
        pElement3.classList.add("activity-Element");

        activityContainer.append(pElement, pElement1,imgElement, pElement2, pElement3);
        resultElem.append(activityContainer);

      }

    })
    .catch(error => {
      console.error("Det finns probleme med kommunikationen", error);
    });

}

function initMap(camping) {
  console.log(camping);
  let lat = parseFloat(camping.lat);
  let lng = parseFloat(camping.lng);
  let mapHolder = document.getElementById("map");
  let map = new google.maps.Map(mapHolder, {
    center: { lat: lat, lng: lng },
    zoom: 16,
  });

  let marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: camping.name,
  });
}

function showEquipments() {
  let url = "data/imageforplaces.json";
  resultElem.innerHTML = "";
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
      let equipmentData = data.camping;

      for (let i = 0; i < equipmentData.length; i++) {
        let facilityObj = equipmentData[i].facili;
        let facilityDiv = document.createElement("div");
        facilityDiv.classList.add("facilityDiv-First"); 
        facilityDiv.innerHTML = "<p> Faciliteter: </p>"
      
        let equipmentsObj = equipmentData[i].utrust;
        let equipmentsDiv = document.createElement("div");
        equipmentsDiv.classList.add("EquipmentsDiv-First")
        equipmentsDiv.innerHTML = "<p> Utrustningar: </p>"

        if (equipmentData[i].id === id) {
          let equipmentHolder = document.getElementsByClassName("equipments")[0];
      
          for (let j = 0; j < facilityObj.length; j++) {
            let facilityImg = document.createElement("img");
            facilityImg.src = "../utrus_FaciAssets/" + facilityObj[j] + ".svg";
            facilityImg.alt = facilityObj[j];
            facilityImg.classList.add("equipmentImg");
            facilityDiv.appendChild(facilityImg);
          }
      
          for (let j = 0; j < equipmentsObj.length; j++) {
            let equipmentsImg = document.createElement("img");
            equipmentsImg.src = "../utrus_FaciAssets/" + equipmentsObj[j] + ".svg";
            equipmentsImg.alt = equipmentsObj[j]; 
            equipmentsImg.classList.add("equipmentImg");
            equipmentsDiv.appendChild(equipmentsImg);
          }
          equipmentHolder.append(equipmentsDiv, facilityDiv)
          //fix the names
        }
      }
    })

    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });
} 

function convertRating(rating) {
  let starImg = "../SVGassets/fullStar.svg"; 
  let halfStarImg = "../SVGassets/halfStar.svg"; 
  let emptyStarImg = "../SVGassets/noStar.svg"; 
  let ratingImgs = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      ratingImgs.push(starImg); 
    } else if (rating >= i - 0.5) {
      ratingImgs.push(halfStarImg); 
    } else {
      ratingImgs.push(emptyStarImg); 
    }
  }

  let ratingHtml = "";
  for (let i = 0; i < ratingImgs.length; i++) {
    ratingHtml += '<img src="' + ratingImgs[i] + '" class="ratingStar" alt "starRating">';
  }

  return ratingHtml;
}