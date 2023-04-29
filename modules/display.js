"use strict";

/* ========== Horse Array ========== */
export let horseArr;

/* ========== UPDATE GRID VIEW ========== */
export async function updateGrid(){
    //todo add updateGrid here
}
/* ========== SHOW ALL HORSES ========== */
export function showHorses(horseArr){
    //todo add showHorses here
    showHorse();
}

/* ========== SHOW HORSE ========== */
function showHorse(horseObj){
    //todo add showHorse here

    const horseGridContainer = document.querySelector("#horseGrid");

    const horseArticleElement = horseGridContainer.querySelector("article:last-child");
    addToolTip(horseArticleElement);
}

/* ========== SORT HORSES ========== */
//todo add sortHorses here

/* ========== TOOLTIP FOR DETAIL DIALOG ========== */
function addToolTip(horseArticleElement){
    const tooltip = document.querySelector("#detail-tooltip");
    horseArticleElement.addEventListener("mouseenter", ()=>{
        tooltip.style.display = "block";
    })
    horseArticleElement.addEventListener("mousemove", (event) => {
        tooltip.style.top = (event.clientY - 10) + "px";
        tooltip.style.left = (event.clientX + 10) + "px";
    });
    horseArticleElement.addEventListener("mouseleave", ()=>{
        tooltip.style.display = "none";
    });
}