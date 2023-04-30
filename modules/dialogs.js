"use strict";

import {deleteHorseClicked, submitUpdateForm} from "./submit.js";
import {endpoint, getOneHorse} from "../main.js";
import {addLike, removeLike} from "./like.js";

/* ========== CREATE DIALOG ========== */
//todo add showCreateDialog here

/* ========== UPDATE DIALOG ========== */
export function showUpdateDialog(horseObj){
    fillUpdateForm(horseObj);
    const form = document.querySelector("#update-form");
    form.parentElement.showModal();
    form.addEventListener("submit", submitUpdateForm);
    form.querySelector("#update-cancel-btn")
        .addEventListener("click", ()=> {
            form.removeEventListener("submit", submitUpdateForm);
            form.parentElement.close();
            form.reset();
        })
}
/* ========== UPDATE HELPER FUNCTIONS ========== */
// Fills in all the fields in the update form
function fillUpdateForm(horseObj){
    const form = document.querySelector("#update-form");
    /* id */
    form.horseID.value = horseObj["id"];
    /* likes */
    form.likes.value = horseObj["likes"];
    /* image */
    form.image.value = horseObj["image"];

    /* owner info */
    form.ownerName.value = horseObj.owner["name"];
    form.ownerEmail.value = horseObj.owner["email"];
    form.ownerPhone.value = horseObj.owner["phone"];

    /* good to know */
    fillExperienceAndRegistrationInputs(form, horseObj);
    /* General information */
    fillGeneralInformationInputs(form, horseObj);

    /* Health and diet */
    form.diet.value = horseObj["diet"].join(", ");
    form.vaccinations.value = horseObj["vaccinations"].join(", ");
    form.hasTapeworm.checked = horseObj["hasTapeworm"];
}
function fillExperienceAndRegistrationInputs(form, horseObj) {
    for (let i = 0; i < form.temperament.options.length; i++) {
        const option = form.temperament.options[i];
        if (option.value === horseObj["temperament"]) {
            option.selected = true;
            break;
        }
    }
    for (let i = 0; i < form.trainingLevel.options.length; i++) {
        const option = form.trainingLevel.options[i];
        if (option.value === horseObj["trainingLevel"]) {
            option.selected = true;
            break;
        }
    }
    form.riderExperienceRequired.checked = horseObj["riderExperienceRequired"];
    form.registered.checked = horseObj["registered"];
}
function fillGeneralInformationInputs(form, horseObj) {
    form.horseName.value = horseObj["name"];
    form.age.value = horseObj["age"];
    form.horseRace.value = horseObj["race"];
    form.horseColor.value = horseObj["color"];
    for (let i = 0; i < form.gender.length; i++) {
        const radioInput = form.gender[i];
        if (radioInput.value === horseObj["gender"]) {
            radioInput.checked = true;
            break;
        }
    }
    form.height.value = horseObj["height"];
    form.topspeed.value = horseObj["topspeed"];
}

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

/* ========== DETAIL DIALOG ========== */
export async function showDetailDialog(horse) {
    const horseID = horse["id"];
    const horseObj = await getOneHorse(horseID, endpoint);
    const detailDialog = document.querySelector("#detail-dialog");

    /* Horse ID */
    detailDialog.querySelector("#detail-horseID").textContent = horseID;
    /* Image */
    detailDialog.querySelector("#detail-image").innerHTML = /*html*/ `<img src="${horseObj["image"]}" alt="">`;
    /* Health And Diet info */
    generateHealthAndDietInfo(horseObj, detailDialog);
    /* Name and Likes */
    generateNameAndLikesInfo(detailDialog, horseObj);
    /* General Information */
    generateGeneralInfo(horseObj, detailDialog);
    /* Experience and Registration */
    generateExperienceAndRegistrationInfo(detailDialog, horseObj);
    /* Owner information */
    generateOwnerInfo(horseObj, detailDialog);

    /* Event listeners */
    addDetailDialogEventListeners(detailDialog, horseObj);

    /* Show dialog */
    detailDialog.showModal();
}
/* ========== DETAIL DIALOG HELPER FUNCTIONS ========== */
// Detail information generation
function generateHealthAndDietInfo(horseObj, detailDialog) {
    const dietArr = horseObj["diet"];
    for (const food of dietArr) {
        detailDialog
            .querySelector("#detail-diet")
            .insertAdjacentHTML("beforeend", /*html*/ `<li>${food}</li>`);
    }
    const vaccinationsArr = horseObj["vaccinations"];
    for (const vaccination of vaccinationsArr) {
        detailDialog
            .querySelector("#detail-vaccinations")
            .insertAdjacentHTML("beforeend", /*html*/ `<li>${vaccination}</li>`);
    }
    detailDialog.querySelector("#detail-hasTapeworm").textContent = horseObj[
        "hasTapeworm"
        ]
        ? "Has tapeworm.."
        : "Tapeworm free!";
}
function generateNameAndLikesInfo(detailDialog, horseObj) {
    detailDialog.querySelector("#detail-name").textContent = horseObj["name"];
    let likesText;
    if (horseObj["likes"] > 0) {
        likesText = horseObj["likes"] + " likes.";
    } else if (horseObj["likes"] < 0) {
        likesText = Math.abs(horseObj["likes"]) + " dislikes.";
    } else {
        likesText = "No likes/dislikes.";
    }
    detailDialog.querySelector("#detail-likes").textContent = likesText;
}
function generateGeneralInfo(horseObj, detailDialog) {
    const isMale = horseObj["gender"] === "male";
    detailDialog.querySelector("#detail-generalInformation").textContent = `${
        horseObj["name"]
    } is a ${horseObj["age"]} year-old, very ${horseObj["temperament"]}, ${
        horseObj["color"]
    } ${horseObj["race"]} ${isMale ? "stallion" : "mare"}.
        ${isMale ? "He" : "She"} is ${
        horseObj["height"]
    }ft tall, and can run a ${
        horseObj["topspeed"] >= 40 ? "blistering" : "modest"
    } ${horseObj["topspeed"]}mph.`;
}
function generateExperienceAndRegistrationInfo(detailDialog, horseObj) {
    detailDialog.querySelector(
        "#detail-trainingLevel"
    ).textContent = `${horseObj["trainingLevel"]} level of training.`;
    detailDialog.querySelector("#detail-riderExperienceRequired").textContent =
        horseObj["riderExperienceRequired"]
            ? "Rider experience is required."
            : "Beginner friendly";
    detailDialog.querySelector("#detail-registered").textContent = horseObj[
        "registered"
        ]
        ? "Registered"
        : "Unregistered";
}
function generateOwnerInfo(horseObj, detailDialog) {
    const owner = horseObj["owner"];
    for (const key in owner) {
        detailDialog
            .querySelector("#detail-owner")
            .insertAdjacentHTML(
                "beforeend",
                /*html*/ `<li>${key}: ${owner[key]}</li>`
            );
    }
}
/* event listeners for detail dialog */
function addDetailDialogEventListeners(detailDialog, horseObj) {
    /* Event listeners for like/dislike buttons */
    const likeButton = detailDialog.querySelector("#detail-like-btn");
    const dislikeButton = detailDialog.querySelector("#detail-dislike-btn");
    async function like(event) {
        await addLike(event, likeButton, dislikeButton, horseObj);
    }
    async function dislike(event) {
        await removeLike(event, likeButton, dislikeButton, horseObj);
    }
    likeButton.addEventListener("click", like);
    dislikeButton.addEventListener("click", dislike);

    /* event listeners for closing dialog */
    function clearWithEscape(event) {
        if (event.key === "Escape") {
            window.removeEventListener("keydown", clearWithEscape);
            likeButton.removeEventListener("click", like);
            dislikeButton.removeEventListener("click", dislike);
            clearDetailDialog();
        }
    }
    function clearWithButton() {
        detailDialog.querySelector("#detail-cancel-btn").removeEventListener("click", clearWithButton);
        likeButton.removeEventListener("click", like);
        dislikeButton.removeEventListener("click", dislike);
        clearDetailDialog()
    }
    //cancel button
    detailDialog.querySelector("#detail-cancel-btn").addEventListener("click", clearWithButton);
    //Keyboard Escape button
    window.addEventListener("keydown", clearWithEscape);
}
//Clears all fields in the detail dialog
function clearDetailDialog() {
    const detailDialog = document.querySelector("#detail-dialog");
    detailDialog.close();
    detailDialog.querySelector("#detail-like-btn").disabled = false;
    detailDialog.querySelector("#detail-dislike-btn").disabled = false;

    /* Image */
    detailDialog.querySelector("#detail-image")
        .innerHTML = "";

    /* Health And Diet info */
    detailDialog.querySelector("#detail-diet")
        .innerHTML = "";
    detailDialog.querySelector("#detail-vaccinations")
        .innerHTML = "";
    detailDialog.querySelector("#detail-hasTapeworm")
        .textContent = "";

    /* Name and Likes */
    detailDialog.querySelector("#detail-name")
        .textContent = "";
    detailDialog.querySelector("#detail-likes")
        .textContent = "";

    /* General Information */
    detailDialog.querySelector("#detail-generalInformation")
        .textContent = "";

    /* Experience and Registration information */
    detailDialog.querySelector("#detail-trainingLevel")
        .textContent = "";
    detailDialog.querySelector("#detail-riderExperienceRequired")
        .textContent = "";
    detailDialog.querySelector("#detail-registered")
        .textContent = "";

    /* Owner information */
    detailDialog.querySelector("#detail-owner")
        .innerHTML = "";
}

/* ========== SUCCESS/ERROR TOAST MESSAGE ========== */
//type is success or error
export function showToastMessage(message, type) {
    const toastContainer = document.querySelector("#toast-container");
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.classList.add("toast", type);
    toastContainer.appendChild(toast);

    setTimeout(() => {
            toastContainer.removeChild(toast);
            }, 3000);
}