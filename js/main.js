"use strict";

/* ===== Modules ===== */
import { closeDeleteDialog } from "./modules/dialogs/deleteDialog.js";
import { showToastMessage } from "./modules/display/toastMessage.js";
import { updateGrid } from "./modules/display/display.js";
import { inputSearchChanged } from "./modules/searchAndSort/search.js";
import { showCreateDialog } from "./modules/dialogs/createDialog.js";
import { sortHorses } from "./modules/searchAndSort/sort.js";
import {filterByGender} from "./modules/searchAndSort/filter.js";

window.addEventListener("load", main);

/* ===== Global variables ===== */
export const endpoint = "https://gallopgalore-80085-default-rtdb.europe-west1.firebasedatabase.app/";

async function main() {

    /* Show horses */
    await updateGrid();

    /* Create dialog */
    document.querySelector("#add-horse-dialog-button")
        .addEventListener("click", showCreateDialog);

    /* Search event listeners */
    const searchBar =  document.querySelector("#searchBar");
    searchBar.addEventListener("search", inputSearchChanged);
    searchBar.addEventListener("keyup", inputSearchChanged);

    /* close delete dialog */
    document.querySelector("#delete-cancel-btn")
        .addEventListener("click", closeDeleteDialog);

    /* sort horses on change in sort menu */
    document.querySelector("#sortBy")
        .addEventListener("change", sortHorses);

    /* filter event listener */
    document.querySelector("#showOnly")
        .addEventListener("change", filterByGender);
}
/* ========== CREATE ========== */
export async function addHorse(horseObj, endpoint) {
    try{
        const response = await fetch(`${endpoint}/horses.json`, {
            method: "POST",
            body: JSON.stringify(horseObj),
        });
        if (response.ok) {
            await updateGrid();
            showToastMessage("Horse added, nice", "success");
        } else {
            showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
            console.error(`Bad response at addHorse: ${response.status} ${response.statusText}.`);
        }
    }
    catch (err){
        throw new Error(`Error at addHorse: ${err}`);
    }
}
/* ========== READ ALL========== */
export async function getHorses(endpoint) {
    try{
        const response = await fetch(`${endpoint}/horses.json`);
        if(response.ok){
            const data = await response.json();
            return prepareData(data);
        }
        else{
            showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
            console.error(`Bad response at getHorses: ${response.status} ${response.statusText}.`);
        }
    }
    catch (err){
        throw new Error(`Error at getHorses: ${err}`);
    }
}
/* ========== Data preparation for getHorses ========== */
function prepareData(obj) {
    const dataArr = [];
    for (const key in obj) {
        const horse = obj[key];
        horse["id"] = key;
        dataArr.push(horse);
    }
    return dataArr;
}
/* ========== READ ONE ========== */
export async function getOneHorse(horseID, endpoint) {
    try {
        const response = await fetch(`${endpoint}horses/${horseID}.json`);
        if (response.ok) {
            const horse = await response.json();
            horse["id"] = horseID;
            return horse;
        }
        else{
            showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
            console.error(`Bad response at getOneHorse: ${response.status} ${response.statusText}.`);
        }
    } catch (err) {
        throw new Error(`Error at getOneHorse: ${err}`);
    }
}
/* ========== UPDATE ========== */
// Sends put request to endpoint with horse object
export async function updateHorse(horse, horseID, endpoint) {
    try {
        const response = await fetch(`${endpoint}horses/${horseID}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(horse),
        });
        if (response.ok) {
            console.log("Horse updated successfully!");
            showToastMessage("Horse updated successfully!", "success");
        } else {
            showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
            console.error(`Bad response at updateHorse: ${response.status} ${response.statusText}.`);
        }
    } catch (err) {
        throw new Error(`Error at updateHorse: ${err}`);
    }
}

/* ========== DELETE ========== */
export async function deleteHorse(horseID, endpoint) {
    try{
        const response = await fetch(`${endpoint}/horses/${horseID}.json`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("horse deleted");
            showToastMessage("Horse deleted successfully!", "success");
        await updateGrid();
        } else {
            showToastMessage(`Oops something went wrong. ${response.status} ${response.statusText}.`, "error");
            console.error(`Bad response at deleteHorse: ${response.status} ${response.statusText}.`);
        }
    }
    catch (err){
        throw new Error(`Error at deleteHorse: ${err}`);
    }
}