var myApiKey = "dUZXES2j";
var resultatElem;
var detailElem
let campingTypes
let url
function init() {
  resultatElem = document.getElementsByClassName("filterElemnt")[0];

  addClickEventListeners();
  wedigtsHoverEffect();
}

window.addEventListener("load", init);

// Lägger till eventlistener för knapparna
function addClickEventListeners() {
  
  document.getElementById("filterDropMenu").addEventListener("change", SelectedOption);

  for (let i = 0; i < campingTypes.length; i++) {
    campingTypes[i].addEventListener("click", SelectedOption);
    campingTypes[i].addEventListener("mouseover", function () {
      this.style.cursor = "pointer";

    }, false);
  }
}

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

  let hiddenElems = document.getElementsByClassName("body-box-2");
  
  resultatElem.innerHTML = "";
  
  for (let i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = "grid";
  }
  console.log(btnSelector)
  
  if (btnSelector.contains("smoland")){
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=småland&descriptions=camping&min_rating=2";
  
  } 
  else if (btnSelector.contains("oland")) {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=camping&min_rating=2";

  }
   else if (btnSelector.contains ("all-landscape")) {
    url = "https://smapi.lnu.se/api/?api_key=" + myApiKey + "&debug=true&controller=establishment&method=getall&descriptions=camping&min_rating=2";
  }

  if (selectedFliterOption === "Pris") {
     url += "&sort_in=ASC&order_by=price_range";
    console.log(url)
  
  } 
  else if (selectedFliterOption === "Omdöme") {
  url += "&sort_in=DESC&order_by=rating";
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
      console.error("Det finns problem med kommunikationen", error);
    });
}

// Skriver ut namn, rating & price range som p element för varje campingplats
function info(JSONtext) {
  let detailElem = JSON.parse(JSONtext).payload;

  for (let i = 0; i < detailElem.length; i++) {
    let container = document.createElement("div");
    container.classList.add("campingRes");

    container.setAttribute("cid", detailElem[i].id);

    let pElement0 = document.createElement("p");
    pElement0.innerText = detailElem[i].id;
    pElement0.classList.add("idElement");


    let pElement = document.createElement("p");
    pElement.innerText = detailElem[i].name;
    pElement.classList.add("nameElement");

    let pElement2 = document.createElement("p");
    pElement2.innerText = detailElem[i].rating;
    pElement2.classList.add("ratingElement");

    let pElement3 = document.createElement("p");
    pElement3.innerText = detailElem[i].price_range;
    pElement3.classList.add("priceRangeElement");

    let pElement4 = document.createElement("p");
    pElement4.innerText = detailElem[i].text;
    pElement4.classList.add("textElement");

    let logo = document.createElement("img");

    let linkElement = document.createElement("p");
    linkElement.innerText = " Mer info "
    linkElement.classList.add("linkButton");

    /* let childDiv = document.createElement("div");*/
    container.append(pElement0, pElement, pElement2, pElement3, pElement4, logo, linkElement);
    resultatElem.append(container);

    // container.classList.add("filterElemenDiv");
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
      let res = document.getElementsByClassName("campingRes");
      for (let i = 0; i < res.length; i++) {
        let elem = res[i];
        let cid = elem.getAttribute("cid");
        elem.getElementsByTagName("img")[0].src = findIn(imgData.camping, "id", cid).logo;
      }
    })
    .catch(error => {
      console.error("Det finns problem med kommunikationen", error);
    });
}

function findIn(stack, key, value) {

  for (let i = 0; i < stack.length; i++) {
    if (stack[i][key] == value) {
      return stack[i];
    }
  }

  return null;
}