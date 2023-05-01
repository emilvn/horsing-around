"use strict";

/* ===== Modules ===== */
import { closeDeleteDialog } from "./modules/dialogs/deleteDialog.js";
import { showToastMessage } from "./modules/display/toastMessage.js";
import { updateGrid } from "./modules/display/display.js";
import { inputSearchChanged } from "./modules/searchAndSort/search.js";
import { sortHorses } from "./modules/searchAndSort/sort.js";

window.addEventListener("load", main);

/* ===== Global variables ===== */
export const endpoint = "https://gallopgalore-80085-default-rtdb.europe-west1.firebasedatabase.app/";

async function main() {
    console.log("main up");

    /* Show horses */
    await updateGrid();

    /* Search event listeners */
    document.querySelector("#searchBar").addEventListener("search", inputSearchChanged);
    document.querySelector("#searchBar").addEventListener("keyup", inputSearchChanged);

    /* close delete dialog */
    document.querySelector("#delete-cancel-btn").addEventListener("click", closeDeleteDialog);

     /* sort horses on change in sort menu */
     document.querySelector("#sortBy").addEventListener("onchange", sortHorses);
}
/* ========== CREATE ========== */
export async function addHorse(horseObj, endpoint) {
    const json = JSON.stringify(horseObj);
    const response = await fetch(`${endpoint}/horses.json`, {
        method: "POST",
        body: json,
    });
    if (response.ok) {
        console.log("nice");
        await updateGrid();
        showToastMessage("Horse added, nice", "success");
    } else {
        showToastMessage("not nice", "error");
    }
}

/* ========== READ ALL========== */
export async function getHorses(endpoint) {
    const response = await fetch(`${endpoint}/horses.json`); // fetch request, (GET)
    const data = await response.json(); // parse JSON to JavaScript
    const horses = prepareData(data); // convert object of object to array of objects
    console.log("getHorsesKører");
    return horses;
}

/* ========== Data preparation for getHorses ========== */
// use in getHorses to change the fetched data from object to array.
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
        showToastMessage("Failed to update Horse.", "error");
        }
    } catch (err) {
        throw new Error(`Error at updateHorse: ${err}`);
    }
}

/* ========== DELETE ========== */
export async function deleteHorse(horseID, endpoint) {
    const response = await fetch(`${endpoint}/horses/${horseID}.json`, {
        method: "DELETE"
    });
    if (response.ok) {
        console.log("horse deleted");
        showToastMessage("Horse deleted successfully!", "error");
    } else {
        console.log("Bad response at deleteHorse");
        showToastMessage("Couldn't delete horse.", "error");
    }
}