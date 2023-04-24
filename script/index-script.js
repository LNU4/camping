function init() {
    addClickEventListeners();
  }
  
  window.addEventListener("load", init);
  
    function addClickEventListeners() {
    const campingTypes = document.querySelectorAll(".camping-type-trailer, .camping-type-housecar, .camping-type-tent, .camping-type-stuga, .no-perferance, .oland, .smoland, .all-landscape, .yes, .no");
  
    let trailerCamping = document.getElementsByClassName("camping-type-trailer");
    trailerCamping[0].addEventListener("click", hideElem);
  
    for (let i = 0; i < campingTypes.length; i++) {
      campingTypes[i].addEventListener("click", hideElem);
      campingTypes[i].addEventListener("mouseover", function () {
        this.style.cursor = "pointer";
        
      }, false);
    }
    wedigtsHoverEffect();
    
  }
  
function hideElem() {
    alert("Hello! I am an alert box!!");

}

function showFilterElem() {

}

function wedigtsHoverEffect () {
    let wedigts = document.querySelectorAll(".logoImg");
    for (let i = 0; i < wedigts.length; i++) {
        console.log(wedigts[i])

      wedigts[i].addEventListener("mouseover", function () {
        wedigts[i].style.border = "1px solid black";
      }, false);

      wedigts[i].addEventListener("mouseleave", function () {
        wedigts[i].style.border = "";
      }, false);
    }
    
}