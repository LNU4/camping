var myApiKey = "dUZXES2j";
var resultatElem;
var detailElem
function init() {
  resultatElem = document.getElementsByClassName("filterElemnt")[0];

  addClickEventListeners();
  wedigtsHoverEffect();
  
}

window.addEventListener("load", init);

function addClickEventListeners() {
  const campingTypes = document.querySelectorAll(" .oland, .smoland, .all-landscape");

  for (let i = 0; i < campingTypes.length; i++) {
    campingTypes[i].addEventListener("click", showFilterElem);
    campingTypes[i].addEventListener("mouseover", function () {
      this.style.cursor = "pointer";

    }, false);
  }


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
  let btnSelector = this.className;
  let hiddenElems = document.getElementsByClassName("body-box-2");
  resultatElem.innerHTML = "";
  console.log(btnSelector)
  for (let i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = "grid";
  }

  let url = "";
  if (btnSelector === "smoland") {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=småland&descriptions=camping&min_rating=2";
  } else if (btnSelector === "oland") {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=camping&min_rating=2";
  } else if (btnSelector === "all-landscape") {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&descriptions=camping&min_rating=2";
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
      info(JSON.stringify(data));
    })
    .catch(error => {
      console.error("Det finns probleme med kommunikationen", error);
    });


}

function info(JSONtext) {
  let detailElem = JSON.parse(JSONtext).payload;
  
  for (let i = 0; i < detailElem.length; i++) { 
    let pElement0 = document.createElement("p");
    pElement0.innerText = detailElem[i].id;

    let pElement = document.createElement("p");
    pElement.innerText = detailElem[i].name;

    let pElement2 = document.createElement("p");
    pElement2.innerText = detailElem[i].rating;

    let pElement3 = document.createElement("p");
    pElement3.innerText = detailElem[i].price_range;

    let childDiv = document.createElement("div");
    childDiv.append(pElement0, pElement, pElement2, pElement3);
    resultatElem.append(childDiv);

    childDiv.classList.add("filterElemenDiv");
  }
  imgUrlCall()
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
      let imgDataElement = imgData.camping;
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
      } 
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });
}