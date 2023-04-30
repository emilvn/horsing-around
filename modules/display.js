"use strict";

import {showDeleteDialog, showDetailDialog, showUpdateDialog} from "./dialogs.js";

/* ========== Horse Array ========== */
const endpoint =
  "https://gallopgalore-80085-default-rtdb.europe-west1.firebasedatabase.app/";
export let horseArr;

/* ========== UPDATE GRID VIEW ========== */
export async function updateGrid() {
  //todo add updateGrid here
  horseArr = await getHorses(); // get posts from rest endpoint and save in global variable
  showHorses(horseArr); // show all posts (append to the DOM) with posts as argument
}
export async function getHorses() {
  const response = await fetch(`${endpoint}/horses.json`); // fetch request, (GET)
  const data = await response.json(); // parse JSON to JavaScript
  const horses = prepareData(data); // convert object of object to array of objects
  console.log("getHorsesKører");
  return horses; // return horses
}
/* ========== SHOW ALL HORSES ========== */
export function showHorses(horseArr) {
  document.querySelector("#horseGrid").innerHTML = "";
  for (const horse of horseArr) {
    showHorse(horse);
  }

  console.log("showHorses kører");
}

/* ========== SHOW HORSE ========== */
export function showHorse(horseObj) {
  const horseGridContainer = document.querySelector("#horseGrid");
  const currentHorseArticle = horseGridContainer.querySelector("article:last-child");
  const myHTML = /*html*/ `
        <article id="grid-item">
          <div>
            <div class="image-div" style="background-image: url(${horseObj.image})"></div>
            <h2>Horse name: ${horseObj.name}</h2>
            <p>Horse race: ${horseObj.race}</p>
            <p>Horse age: ${horseObj.age}</p>
            <p>Horse gender ${horseObj.gender}</p>
          </div>
          <div class="grid-item-btns">
            <span class="hidden horseID">${horseObj.id}</span>
            <button class="like-btn">Like(<span class="likes">${horseObj.likes}</span>)</button>
            <button class="dislike-btn">Dislike</button>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
          </div>
        </article>`;

    horseGridContainer.insertAdjacentHTML("beforeend", myHTML);

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
function addToolTip(horseArticleElement) {
  const tooltip = document.querySelector("#detail-tooltip");
  horseArticleElement.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
  });
  horseArticleElement.addEventListener("mousemove", (event) => {
    tooltip.style.top = event.clientY - 10 + "px";
    tooltip.style.left = event.clientX + 10 + "px";
  });
  horseArticleElement.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
}

export function prepareData(dataObject) {
  const array = []; // define empty array
  // loop through every key in dataObject
  // the value of every key is an object
  for (const key in dataObject) {
    const object = dataObject[key]; // define object
    object.id = key; // add the key in the prop id
    array.push(object); // add the object to array
  }
  console.log("prepareDataVirker");
  return array; // return array back to "the caller"
}
