"use strict";
window.addEventListener("load", main);

/* ===== Modules ===== */
import {showToastMessage} from "./modules/dialogs.js";

/* ===== Global variables ===== */
export const endpoint = "https://gallopgalore-80085-default-rtdb.europe-west1.firebasedatabase.app/";

function main(){
    //todo call relevant functions
    //todo add relevant event listeners
}
/* ========== CREATE ========== */
//todo add addHorse here


/* ========== READ ========== */
//todo add getHorses here

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

/* ========== UPDATE ========== */
// Sends put request to endpoint with horse object
export async function updateHorse(horse, horseID, endpoint){
    try{
    const response = await fetch(`${endpoint}horses/${horseID}.json`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(horse)
    });
    if (response.ok){
        console.log("Horse updated successfully!");
        showToastMessage("Horse updated successfully!", "success");
    }
    else{
        showToastMessage("Failed to update Horse.", "error");
    }
    }
    catch (err){
        throw new Error(`Error at updateHorse: ${err}`);
    }
}

/* ========== DELETE ========== */
//todo add deleteHorse here