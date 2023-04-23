
function init() {

    addClickEventListeners();

}
window.addEventListener("load", init);



function addClickEventListeners() {
    const campingTypes = document.querySelectorAll(".camping-type-trailer, .camping-type-housecar, .camping-type-tent, .camping-type-stuga");
    
    let tralierCamping = document.getElementsByClassName("camping-type-trailer"); 
    tralierCamping.addClickEventListener("click", hideEelem()); 

    for (let i = 0; i < campingTypes.length; i++) {
    campingTypes[i].addEventListener("click", function () {
        
    }, false); 
    campingTypes[i].addEventListener("mouseover", function () {
        this.style.cursor = "pointer"
    }, false); 
    }

}

hideEelem() {
    let test 
}