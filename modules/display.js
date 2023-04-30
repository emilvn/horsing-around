"use strict";

import {showDeleteDialog, showDetailDialog, showUpdateDialog} from "./dialogs.js";

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
    const horseGridContainer = document.querySelector("#horseGrid");
    const currentHorseArticle = horseGridContainer.querySelector("article:last-child");
    //todo add showHorse here

    /* vvvvv DON'T DELETE THESE vvvv */
    //detail dialog event listener
    currentHorseArticle.addEventListener("click", ()=> showDetailDialog(horseObj) );

    //update button event listener
    const updateButton = currentHorseArticle.querySelector(".edit-btn");
    updateButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showUpdateDialog(horseObj);
    });

    //delete button event listener
    const deleteButton = currentHorseArticle.querySelector(".delete-btn");
    deleteButton.addEventListener("click", showDeleteDialog);

    //tooltip for showDetailDialog
    addToolTip(currentHorseArticle);
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