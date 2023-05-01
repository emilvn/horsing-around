"use strict";
import {showDeleteDialog} from "../dialogs/deleteDialog.js";
import {showUpdateDialog} from "../dialogs/updateDialog.js";
import {showDetailDialog} from "../dialogs/detailDialog.js";
import {getHorses, endpoint} from "../../main.js";
import {addLike, removeLike} from "../likes/like.js";

/* ========== Horse Array ========== */
export let horseArr;

/* ========== UPDATE GRID VIEW ========== */
export async function updateGrid() {
    horseArr = await getHorses(endpoint); // get posts from rest endpoint and save in global variable
    showHorses(horseArr); // show all posts (append to the DOM) with posts as argument
}

/* ========== SHOW ALL HORSES ========== */
export function showHorses(horseArr) {
    document.querySelector("#horseGrid").innerHTML = "";
    for (const horse of horseArr) {
        showHorse(horse);
    }
}

/* ========== SHOW HORSE ========== */
export function showHorse(horseObj) {
    const horseGridContainer = document.querySelector("#horseGrid");
    const myHTML = /*html*/ `
        <article id="grid-item">
            <div>
                <div class="image-div" style="background-image: url(${horseObj.image})"></div>
                    <h2>${horseObj.name}</h2>
                    <p>${horseObj.age} years old ${horseObj.race} ${(horseObj.gender==="male")?"stallion":"mare"}</p>
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
        const currentHorseArticle = horseGridContainer.querySelector("article:last-child");

    addShowHorseEventListeners(currentHorseArticle, horseObj);

    //tooltip for showDetailDialog
        addToolTip(currentHorseArticle);
}

function addShowHorseEventListeners(currentHorseArticle, horseObj) {
    //detail dialog event listener
    currentHorseArticle.addEventListener("click", () => showDetailDialog(horseObj));

    //like button event listener
    const likeButton = currentHorseArticle.querySelector(".like-btn");
    likeButton.addEventListener("click", (event) => addLike(event, likeButton, dislikeButton, horseObj));

    //dislike button event listener
    const dislikeButton = currentHorseArticle.querySelector(".dislike-btn");
    dislikeButton.addEventListener("click", (event) => removeLike(event, likeButton, dislikeButton, horseObj));

    //update button event listener
    const updateButton = currentHorseArticle.querySelector(".edit-btn");
    updateButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showUpdateDialog(horseObj);
    });

    //delete button event listener
    const deleteButton = currentHorseArticle.querySelector(".delete-btn");
    deleteButton.addEventListener("click", showDeleteDialog);
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