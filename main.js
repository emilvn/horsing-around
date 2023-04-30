"use strict";

/* ===== Modules ===== */
import { showToastMessage, closeDeleteDialog, showDetailDialog, showDeleteDialog, showUpdateDialog } from "./modules/dialogs.js";
import { updateGrid } from "./modules/display.js";
import { inputSearchChanged } from "./modules/search.js";

window.addEventListener("load", main);

/* vvvvvvv TEST HORSE OBJECT vvvvvvvv */
//remove this when display functions are working
const horse = {
  "id": "horse_3",
  "image": "https://cdn.pixabay.com/photo/2014/12/08/17/52/horse-561221__480.jpg",
  "name": "Buddy",
  "race": "Appaloosa",
  "likes": 0,
  "height": 15.1,
  "gender": "male",
  "hasTapeworm": false,
  "age": 7,
  "color": "chestnut",
  "temperament": "friendly",
  "riderExperienceRequired": false,
  "registered": true,
  "vaccinations": [
    "tetanus",
    "rabies"
  ],
  "diet": [
    "hay",
    "oats"
  ],
  "trainingLevel": "beginner",
  "owner": {
    "name": "Tom Smith",
    "email": "tomsmith@example.com",
    "phone": "555-7890"
  },
  "topspeed": 30
}

/* ===== Global variables ===== */
export const endpoint =
  "https://gallopgalore-80085-default-rtdb.europe-west1.firebasedatabase.app/";

function main() {
  console.log("main up");
  /* Search event listeners */
  document.querySelector("#searchBar").addEventListener("search", inputSearchChanged);
  document.querySelector("#searchBar").addEventListener("keyup", inputSearchChanged);

  /* close delete dialog */
  document.querySelector("#delete-cancel-btn").addEventListener("click", closeDeleteDialog);
  //todo call relevant function calls
  //todo add relevant event listeners

  /* vvvvv TEST EVENT LISTENERS vvvvv*/

  //remove these when display funcs are working
  document.querySelector("#horseGrid article").addEventListener("click", ()=>showDetailDialog(horse));
  document.querySelector(".delete-btn").addEventListener("click", showDeleteDialog);
  document.querySelector(".edit-btn").addEventListener("click", (event) => {
    event.stopPropagation();
    showUpdateDialog(horse);
  });
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