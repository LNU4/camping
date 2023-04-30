var myApiKey = "dUZXES2j";


function init() {
  addClickEventListeners();
}

window.addEventListener("load", init);

function addClickEventListeners() {
  const campingTypes = document.querySelectorAll(" .oland, .smoland, .all-landscape");

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
    hiddenElems[i].style.display = "grid";
  }

  showFilterElem();

}

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

function showFilterElem() {


  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=småland&descriptions=camping&min_rating=2", true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4)
      if (request.status == 200) info(request.responseText);


  };
}

function info(JSONtext) {

  let detailElem = JSON.parse(JSONtext).payload;
  let resultatElem = document.getElementsByClassName("filterElemnt")[0];

  for (let i = 0; i < detailElem.length; i++) {
    let pElement = document.createElement("p");
    pElement.innerText = detailElem[i].name;
    pElement.innerText += " " + detailElem[i].county;


    let pEleement2 = document.createElement("p");
    pEleement2.innerText = detailElem[i].rating;

    let pEleement3 = document.createElement("p");
    pEleement3.innerText = detailElem[i].price_range;

    let childDiv = document.createElement("div");
    childDiv.append(pElement, pEleement2, pEleement3);
    resultatElem.append(childDiv);

    childDiv.classList.add("filterElemenDiv");
  }
}