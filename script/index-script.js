var myApiKey = "dUZXES2j";
var resultatElem;
var detailElem;
var campingTypes;
var url;

function init() {
  resultatElem = document.getElementsByClassName("filterElemnt")[0];
  campingTypes = document.querySelectorAll(" .oland, .smoland, .all-landscape");
  addClickEventListeners();
  wedigtsHoverEffect();

}

window.addEventListener("load", init);
//funktion för händelsehanteraren
function addClickEventListeners() {
//lägger till change på sortereringen
  document.getElementById("filterDropMenu").addEventListener("change", SelectedOption);
//loopar genom knapparna och lägger till pekkare, det tillkallar selectedoption funktionen
  for (let i = 0; i < campingTypes.length; i++) {
    campingTypes[i].addEventListener("click", SelectedOption);
    campingTypes[i].addEventListener("mouseover", function () {
      this.style.cursor = "pointer";

    }, false);
  }


}
//slut på händelsehanteraren
//funktion för hover effekt
function wedigtsHoverEffect() {
  let wedigtsdiv = document.querySelectorAll(".landscape div")
  let wedigts = document.querySelectorAll(".logoImg");
  for (let i = 0; i < wedigts.length; i++) {

    wedigtsdiv[i].addEventListener("mouseover", function () {
      wedigts[i].style.border = "3px solid #7FB77E";
    }, false);

    wedigtsdiv[i].addEventListener("mouseleave", function () {
      wedigts[i].style.border = "";
    }, false);
  }

}
//slut på hovereffect funktionen 
//Funktion som skickar värden av dropdown meny och klassen på de valde knapparna, returner index till 0 också
function SelectedOption() {
  let filterOption = document.getElementById("filterDropMenu");
  let selectedFliterOption = filterOption.value;
  let btnSelector = this.classList;
  filterOption.selectedIndex = 0;
  showFilterElem(selectedFliterOption, btnSelector); //skcikar värden inom parameter

}
//Fetchar till SMAPI och hämtar informationen beroende på knappen samt sorterings metoden
function showFilterElem(selectedFliterOption, btnSelector) {
  let hiddenElems = document.getElementsByClassName("body-box-2");
  let northOlandFilterOpt = document.getElementsByClassName("north-oland-option")[0];
  let southOlandFilterOpt = document.getElementsByClassName("south-oland-option")[0];
  let northSmolandFilterOpt = document.getElementsByClassName("north-smoland-option")[0];
  let southSmolandFilterOpt = document.getElementsByClassName("south-smoland-option")[0];
  
  resultatElem.innerHTML = "";

  for (let i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = "grid";
  }

  if (btnSelector.contains("smoland")) {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=småland&descriptions=camping";
    northOlandFilterOpt.style.display = "none";
    southOlandFilterOpt.style.display = "none";
    northSmolandFilterOpt.style.display = "block";
    southSmolandFilterOpt.style.display = "block";
  }
  else if (btnSelector.contains("oland")) {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=camping";
    northSmolandFilterOpt.style.display = "none";
    southSmolandFilterOpt.style.display = "none";
    northOlandFilterOpt.style.display = "block";
    southOlandFilterOpt.style.display = "block";
  }
  else if (btnSelector.contains("all-landscape")) {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&descriptions=camping";
    northSmolandFilterOpt.style.display = "none";
    southSmolandFilterOpt.style.display = "none";
    northOlandFilterOpt.style.display = "none";
    southOlandFilterOpt.style.display = "none";
  }

  if (selectedFliterOption === "Pris") {
    url += "&sort_in=ASC&order_by=price_range";
  }
  else if (selectedFliterOption === "Omdöme") {
    url += "&sort_in=DESC&order_by=rating";
  }
  else if (selectedFliterOption === "Norra Öland") {
    url += "&sort_in=DESC&order_by=lat" 
  }
  else if (selectedFliterOption === "Södra Öland") {
    url += "&sort_in=ASC&order_by=lat" 
  }
  else if (selectedFliterOption === "Norra Småland") {
    url += "&sort_in=DESC&order_by=lat" 
  }
  else if (selectedFliterOption === "Södra Småland") {
    url += "&sort_in=ASC&order_by=lat" 
  }

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Den begärda resursen finns inte.");
      }
    })
    .then(data => {
      let detailElem = data.payload;
      //skriver ut informationen som fås av SMAPI och tillägger dem inom html element
      for (let i = 0; i < detailElem.length; i++) {

        let container = document.createElement("div");
        container.classList.add("campingRes");

        container.setAttribute("cid", detailElem[i].id);

        let pElement = document.createElement("h3");
        pElement.innerText = detailElem[i].name;
        pElement.innerText += " - " + detailElem[i].province;
        pElement.classList.add("nameElement");

        let pElement2 = document.createElement("div");
        let rating = parseFloat(detailElem[i].rating);
        pElement2.innerHTML = convertRating(rating);
        pElement2.classList.add("ratingElement");

        let pElement3 = document.createElement("p");
        pElement3.innerText = "Prisnivå: " + detailElem[i].price_range + " SEK";
        pElement3.classList.add("priceRangeElement");

        let pElement4 = document.createElement("p");
        let lessDetailString = detailElem[i].text.slice(0, 100); //delar upp texten inom delar, första delen inhåller upp till 100 ord
        let moreDetailString = detailElem[i].text.slice(100); //resten av texten
        if (detailElem[i].text == "") {
          pElement4.innerText = "Det finns inga information om platsen";
          pElement4.classList.add("textElement");
        }
        if (detailElem[i].text.length > 0) {
          let readMorebutton = document.createElement("button"); //skapar läs mer mer knapp
          readMorebutton.innerText = " läs mer"; 
          readMorebutton.setAttribute("id", "readMoreButton");
          createDetailButtons(pElement4, readMorebutton, lessDetailString, moreDetailString); //funktion för läs mindre knappen

          pElement4.innerText = lessDetailString + "... "; //inhållet bestäms av less detail string
          pElement4.append(readMorebutton);
          pElement4.classList.add("textElement");
        }

        let logo = document.createElement("img");
        logo.classList.add("logoElement");

        let linkElement = document.createElement("p");
        linkElement.innerText = " Välj "
        linkElement.classList.add("linkButton");
        linkElement.addEventListener("click", () => linkToFilterPage(detailElem[i].id));


        container.append(
           pElement, pElement2, pElement3, pElement4, logo, linkElement);
        resultatElem.append(container);
        imgUrlCall();

      }

    })
    .catch(error => {
      console.error("Det finns probleme med kommunikationen", error);
    });

}
//slut på showfilterElem

//Funktion för läs mer eller läs mindre knapparna
function createDetailButtons(p4Element, readMorebutton, lessDetailString, moreDetailString) {
  let readLessButton = document.createElement("button");
  readLessButton.innerText = " läs mindre";
  readLessButton.setAttribute("id", "readLessButton");
  readLessButton.addEventListener("click", () => {
    p4Element.innerText = lessDetailString + "..."
    p4Element.append(readMorebutton)
  })

  readMorebutton.addEventListener("click", () => { //läs mer knappen visar hela texten
    p4Element.innerText = lessDetailString + moreDetailString + " ";
    p4Element.append(readLessButton);
  });

}
//slut på createDetailButtons

//Funktion som konverterar rating värden till bilder
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
//slut på convertRating 

//Funktion som matchar tillämpar bilderna till campingställen
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

      let res = document.getElementsByClassName("campingRes");
      for (let i = 0; i < res.length; i++) {
        let elem = res[i];
        let cid = elem.getAttribute("cid");
        elem.getElementsByClassName("logoElement")[0].src = findIn(imgData.camping, "id", cid).logo;
      }
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });
}
//slut imgUrlCall 

//Funktion för att matcha bilderna med ID numret, de matchar, tillämpas bilden ifrån JSON
function findIn(stack, key, value) {

  for (let i = 0; i < stack.length; i++) {
    if (stack[i][key] == value) {
      return stack[i];
    }
  }

  return null;
}
//slut på findIn 
//Funktion som skickar med id nummret till guidePage
function linkToFilterPage(id) {
  let url = "guidePage.html?id=" + id;
  window.location.href = url;
}
//slut linktoFilterPAge