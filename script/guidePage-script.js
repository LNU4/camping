var myApiKey = "dUZXES2j";
var lat;
var lng;


function init() {
 // addClickEventListeners();
    showHiddenElem();
  }
  
  window.addEventListener("load", init);
  
/* function addClickEventListeners() {
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
    
  } */
  
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
    console.log(lat, lng);
}



// 