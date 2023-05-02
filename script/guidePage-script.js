var myMap;				// Objekt för kartan
var gApikey = "AIzaSyCqZ5C_8bp3CvsU8bIFgul3eMepya-9RWk";
var myApiKey = "dUZXES2j";
var resultatElem;
var detailElem;
var lat;
var lng;

function init() {
  resultatElem = document.getElementsByClassName("filterElemnt")[0];
//  addClickEventListeners();
  initMap();
  showFilterElem();
  wedigtsHoverEffect();
}

window.addEventListener("load", init);
/*
// Lägger till eventlistener för knapparna
function addClickEventListeners() {
  const campingTypes = document.querySelectorAll(" .oland, .smoland, .all-landscape");

  for (let i = 0; i < campingTypes.length; i++) {
    campingTypes[i].addEventListener("click", showFilterElem);
    campingTypes[i].addEventListener("mouseover", function () {
      this.style.cursor = "pointer";

    }, false);
  }
}*/

// Hover effekt för knapparna
function wedigtsHoverEffect() {
  let wedigtsdiv = document.querySelectorAll(".landscape div")
  let wedigts = document.querySelectorAll(".logoImg");
  for (let i = 0; i < wedigts.length; i++) {

    wedigtsdiv[i].addEventListener("mouseover", function () {
      wedigts[i].style.border = "1px solid black";
    }, false);

    wedigtsdiv[i].addEventListener("mouseleave", function () {
      wedigts[i].style.border = "";
    }, false);
  }

}

// showFilterElem, funktion för knapparna för Ölan & Småland. For loop för alla element som ska visas. Sedan används fetch för att översätta infon från SMAPI
function showFilterElem() {
//  let btnSelector = this.className;
  let hiddenElems = document.getElementsByClassName("body-info-bar");
  resultatElem.innerHTML = "";
 // console.log(btnSelector)
  for (let i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = "grid";
  }

  let url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=småland&descriptions=camping&min_rating=2";
 
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

// Skriver ut namn, rating & price range som p element för varje campingplats
function info(JSONtext) {
  let detailElem = JSON.parse(JSONtext).payload;

  
  
  for (let i = 0; i < detailElem.length; i++) { 
    let pElement = document.createElement("p");
    pElement.innerText = detailElem[i].name;

    let pElement2 = document.createElement("p");
    pElement2.innerText = detailElem[i].rating;

    let pElement3 = document.createElement("p");
    pElement3.innerText = detailElem[i].price_range;

    let childDiv = document.createElement("div");
    childDiv.append(pElement, pElement2, pElement3);
    resultatElem.append(childDiv);

    childDiv.classList.add("filterElemenDiv");
  }
  imgUrlCall()
}

// Hämtar bilderna för campingplatserna från egen json fil och placerar ut dem för varje campingplats (imageforplaces.json)

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
      let imgDataElement = imgData.camping;
      let nameElements = document.querySelectorAll(".filterElemnt div p:nth-of-type(1)");

      for (let i = 0; i < nameElements.length; i++) {
        let elemName = nameElements[i].textContent;
        for (let j = 0; j < imgDataElement.length; j++) {
          let imgDataName = imgDataElement[j].name;
          if (elemName == imgDataName) {
            let divHost = document.getElementsByClassName("filterElemenDiv")[i];
            let imgElem = document.createElement("img");
            imgElem.src = imgDataElement[j].bilder[0].url; // Get only the first image URL
            divHost.appendChild(imgElem);
            resultatElem.append(divHost);
            break; // Break out of the inner loop after assigning the first image URL
          }
        }
      } 
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });
} 

// Google Maps API

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  myMap = new Map(document.getElementsByClassName("body-map-box")[0], {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    styles: [
      {featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
      {featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
    ]
  });
}

initMap();
/*	myMap = new google.maps.Map(
			document.getElementByClassName("body-map-box"),
			{
				center: {lat:56.282141, lng:12.498778}, //Mölle 56.282141, 12.498778
				zoom: 15,
				styles: [
					{featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
					{featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
				]
			}
		); */





























///////////////////////////// OLD SHIT //////////////////////////////////////////////////////////////////////


/* var myApiKey = "dUZXES2j";
var lat;
var lng;


function init() {
 // addClickEventListeners();
    showHiddenElem();
  }
  
  window.addEventListener("load", init);
  
 function addClickEventListeners() {
    const campingTypes = document.querySelectorAll(".camping-type-trailer, .camping-type-housecar, .camping-type-tent, .camping-type-stuga, .no-perferance, .oland, .smoland, .all-landscape, .yes, .no");
  
    let trailerCamping = document.getElementsByClassName("camping-type-trailer");
    trailerCamping[0].addEventListener("click", showHiddenElem); 
  
    for (let i = 0; i < campingTypes.length; i++) {
      campingTypes[i].addEventListener("click", showHiddenElem);
      campingTypes[i].addEventListener("mouseover", function () {
        this.style.cursor = "pointer";
        
      }, false);
    }
    wedigtsHoverEffect();
    
  } 
  
function showHiddenElem() {
    let hiddenElems = document.getElementsByClassName("body-box-2");
  
    for (let i = 0; i < hiddenElems.length; i++) {
      hiddenElems[i].style.visibility = "visible";
    }

    showFilterElem();

}

function wedigtsHoverEffect () {
    let wedigts = document.querySelectorAll(".logoImg");
    for (let i = 0; i < wedigts.length; i++) {

      wedigts[i].addEventListener("mouseover", function () {
        wedigts[i].style.border = "1px solid black";
      }, false);

      wedigts[i].addEventListener("mouseleave", function () {
        wedigts[i].style.border = "";
      }, false);
    }
    
}

function showFilterElem() {


    let request = new XMLHttpRequest(); 
    request.open("GET", "https://smapi.lnu.se/api/?api_key=" +myApiKey+"&debug=true&controller=establishment&method=getall&provinces=småland&descriptions=camping&min_rating=2", true);
    request.send(null); 
    request.onreadystatechange = function () { 
        if (request.readyState == 4) 
            if (request.status == 200) info (request.responseText); 
            

    };
}

function info(JSONtext) {
    let detailElem = JSON.parse(JSONtext).payload;
    let resultatElem = document.getElementsByClassName("body-info-bar")[0];
    let htmlCode = "";
    for (let i = 0; i < detailElem.length; i++) {
        htmlCode += "<p>"+detailElem[i].name+ "</p>";
        htmlCode += "<p>"+detailElem[i].text+ "</p>"; 
        htmlCode += "<p>"+detailElem[i].rating+"</p>";
        htmlCode += "<p>"+detailElem[i].price_range+"</p>";
        htmlCode += "<p>"+detailElem[i].lat+ "</p>";
        htmlCode += "<p>"+detailElem[i].lng+ "</p>";
        lat = detailElem[i].lat;
        lng = detailElem[i].lng;
        console.log(i);
    }
    resultatElem.innerHTML = htmlCode;
    
}

console.log(lat, lng);

*/