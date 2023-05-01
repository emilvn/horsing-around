"use strict";

import {deleteHorseClicked} from "../submit/submit.js";

/* ========== DELETE DIALOG ========== */
export function showDeleteDialog(event) {
    event.stopPropagation();
    const deleteForm = document.querySelector("#deleteForm");

    //get id from the horse article where delete was clicked
    const deleteButton = event.target; //horse article delete button
    const horseIDElement = deleteButton.parentElement.querySelector(".horseID");
    console.log(horseIDElement.textContent);
    deleteForm.querySelector("#delete-horseID")
        .textContent = horseIDElement.textContent;

    deleteForm.addEventListener("submit", deleteHorseClicked);
    deleteForm.parentElement.showModal();
}
export function closeDeleteDialog() {
    const deleteForm = document.querySelector("#deleteForm");
    deleteForm.parentElement.close();
    deleteForm.reset();
    deleteForm.querySelector("#delete-horseID")
        .textContent = "";
}