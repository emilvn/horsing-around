"use strict";

import { removeLike } from "./like";
import { deleteHorse } from "./submit";

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
  //todo add showHorses here
  document.querySelector("#horseGrid").innerHTML = "";
  for (const horse of horseArr) {
    showHorse(horse);
  }

  console.log("showHorses kører");
}

/* ========== SHOW HORSE ========== */
export function showHorse(horseObj) {
  //todo add showHorse here
  const html = /*html*/ `
<article id="grid-item">
<div>
            <div class="image-div">
             <img style="background-image:" src="${horseObj.image}">
            </div>
            <h2>Horse name: ${horseObj.name}</h2>
            <p>Horse race: ${horseObj.race}</p>
            <p>Horse age: ${horseObj.age}</p>
            <p>Horse gender ${horseObj.gender}</p>
          </div>
          <div class="grid-item-btns">
            <span class="hidden horseID">${horseObj.id}</span>
            <button class="like-btn">
              Like(<span class="likes"
                >${horseObj.likes} </span
              >)
            </button>
            <button class="dislike-btn">Dislike</button>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
          </div>
</article>
`;

  const horseGridContainer = document.querySelector("#horseGrid");
  document.querySelector("#horseGrid").insertAdjacentHTML("beforeend", html);

  document.querySelector("#like-btn").addEventListener("click", addLike());
  document
    .querySelector("#dislike-btn")
    .addEventListener("click", removeLike());
  document
    .querySelector("#delete-btn")
    .addEventListener("click", deleteHorse());
  document.querySelector("#edit-btn").addEventListener("click", editHorse());

  const horseArticleElement =
    horseGridContainer.querySelector("article:last-child");
  addToolTip(horseArticleElement);
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
