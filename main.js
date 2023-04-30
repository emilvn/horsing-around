"use strict";

/* ===== Modules ===== */
import { showToastMessage } from "./modules/dialogs.js";
import { showDeleteDialog } from "./modules/dialogs.js";
import { updateGrid } from "./modules/display.js";
import { inputSearchChanged } from "./modules/search.js";
import { deleteHorse }  from "./modules/submit.js";
import { cancelDelete } from "./modules/submit.js";


window.addEventListener("load", main);


/* ===== Global variables ===== */

export const endpoint =
  "https://gallopgalore-80085-default-rtdb.europe-west1.firebasedatabase.app/";

function main() {
  /* Search event listeners */
  document.querySelector("#searchBar").addEventListener("search", inputSearchChanged);
  document.querySelector("#searchBar").addEventListener("keyup", inputSearchChanged);
  //todo call relevant functions
  //todo add relevant event listeners
  document.querySelector(".delete-btn").addEventListener("click", showDeleteDialog);
  document.querySelector("#cancel-btn-in-delete").addEventListener("click", cancelDelete)
  document.querySelector("#deleteForm").addEventListener("submit", deleteHorse)
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

/* ========== READ ONE ========== */
export async function getOneHorse(horseID, endpoint) {
  try {
    const response = await fetch(`${endpoint}horses/${horseID}.json`);
    if (response.ok) {
      return await response.json();
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
export function deleteHorseClicked(event) {
  
  
  const horseClicked = event.target;
  const horseId = horseClicked.getAttribute("id");
  deleteHorse(event, horseId);
}
