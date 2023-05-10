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

function addClickEventListeners() {
  
  document.getElementById("filterDropMenu").addEventListener("change", SelectedOption);

  for (let i = 0; i < campingTypes.length; i++) {
    campingTypes[i].addEventListener("click", SelectedOption);
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
      wedigts[i].style.border = "3px solid #7FB77E";
    }, false);

    wedigtsdiv[i].addEventListener("mouseleave", function () {
      wedigts[i].style.border = "";
    }, false);
  }

}

function SelectedOption() {
  let filterOption = document.getElementById("filterDropMenu");
  let selectedFliterOption = filterOption.value;
  let btnSelector = this.classList;  
  filterOption.selectedIndex = 0;
  showFilterElem(selectedFliterOption, btnSelector);

}

function showFilterElem(selectedFliterOption, btnSelector) {
  let hiddenElems = document.getElementsByClassName("body-box-2");
  
  resultatElem.innerHTML = "";
  
  for (let i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = "grid";
  }
  
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
      let detailElem = data.payload;
  
      for (let i = 0; i < detailElem.length; i++) {
        let container = document.createElement("div");
        container.classList.add("campingRes");
    
        container.setAttribute("cid", detailElem[i].id);
    
        let pElement0 = document.createElement("p");
        /*
        pElement0.innerText = detailElem[i].id;
        pElement0.classList.add("idElement");
        */
        let pElement = document.createElement("h3");
        pElement.innerText = detailElem[i].name;
        pElement.classList.add("nameElement");
    
        let pElement2 = document.createElement("p");
        pElement2.innerText = "Betyg: " + detailElem[i].rating;
        pElement2.classList.add("ratingElement");
    
        let pElement3 = document.createElement("p");
        pElement3.innerText = "Prisnivå: " + detailElem[i].price_range;
        pElement3.classList.add("priceRangeElement");
    
        let pElement4 = document.createElement("p");
        pElement4.innerText = detailElem[i].text;
        pElement4.classList.add("textElement");
    
        let logo = document.createElement("img");
    
        let linkElement = document.createElement("h4");
        linkElement.innerText = " Se mer "
        linkElement.classList.add("linkButton");
        linkElement.addEventListener("click", () => linkToFilterPage(detailElem[i].id));
    
        /* let childDiv = document.createElement("div");*/
        container.append(pElement0, pElement, pElement2, pElement3, pElement4, logo, linkElement);
        resultatElem.append(container);
        imgUrlCall();
        // container.classList.add("filterElemenDiv");
      }

    })
    .catch(error => {
      console.error("Det finns probleme med kommunikationen", error);
    });

    

}

/*function info(JSONtext) {
    let detailElem = JSONtext.payload;
  
  for (let i = 0; i < detailElem.length; i++) {
    let container = document.createElement("div");
    container.classList.add("campingRes");

    container.setAttribute("cid", detailElem[i].id);

    let pElement0 = document.createElement("p");
    /*
    pElement0.innerText = detailElem[i].id;
    pElement0.classList.add("idElement");
    */
   /*
    let pElement = document.createElement("h3");
    pElement.innerText = detailElem[i].name;
    pElement.classList.add("nameElement");

    let pElement2 = document.createElement("p");
    pElement2.innerText = "Betyg: " + detailElem[i].rating;
    pElement2.classList.add("ratingElement");

    let pElement3 = document.createElement("p");
    pElement3.innerText = "Prisnivå: " + detailElem[i].price_range;
    pElement3.classList.add("priceRangeElement");

    let pElement4 = document.createElement("p");
    pElement4.innerText = detailElem[i].text;
    pElement4.classList.add("textElement");

    let logo = document.createElement("img");

    let linkElement = document.createElement("h4");
    linkElement.innerText = " Se mer "
    linkElement.classList.add("linkButton");
    linkElement.addEventListener("click", () => linkToFilterPage(detailElem[i].id));

    /* let childDiv = document.createElement("div");*/
    /*
    container.append(pElement0, pElement, pElement2, pElement3, pElement4, logo, linkElement);
    resultatElem.append(container);
    
    // container.classList.add("filterElemenDiv");
  }
  imgUrlCall();
} */

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

function linkToFilterPage(id) {
  let url = "guidePage.html?id=" +id;
  window.location.href = url;  
}