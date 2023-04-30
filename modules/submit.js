"use strict";

import {deleteHorse, endpoint, updateHorse,} from "../main.js";
import {validatePassword} from "./validation";
import {showToastMessage} from "./dialogs";

/* ========== SUBMIT CREATE ========== */
//todo add submitCreateForm here

/* ========== SUBMIT UPDATE ========== */
export async function submitUpdateForm(event){
    event.preventDefault();
    const form = event.target;
    const horseID = form.horseID.value;
    const horse = {
        image: form.image.value,
        name: form.horseName.value,
        race: form.horseRace.value,
        likes: form.likes.value,
        height: form.height.value,
        gender: form.gender.value,
        hasTapeworm: form.hasTapeworm.checked,
        age: form.age.value,
        color: form.horseColor.value,
        temperament: form.temperament.value,
        riderExperienceRequired: form.riderExperienceRequired.checked,
        registered: form.registered.checked,
        vaccinations: form.vaccinations.value.split(", "),
        diet: form.diet.value.split(", "),
        trainingLevel: form.trainingLevel.value,
        owner: {
            name: form.ownerName.value,
            email: form.ownerEmail.value,
            phone: form.ownerPhone.value
        },
        topspeed: Number(form.topspeed.value)
    }
    await updateHorse(horse, horseID, endpoint);
    form.parentElement.close();
    form.reset();
}


/* ========== SUBMIT DELETE ========== */
async function submitDeleteForm(horseID){
    const deleteForm = document.querySelector("#deleteForm");
    deleteForm.removeEventListener("submit", deleteHorseClicked);
    deleteForm.parentElement.close();
    await deleteHorse(horseID, endpoint);
}
export async function deleteHorseClicked(event) {
    event.preventDefault();
    const deleteForm = document.querySelector("#deleteForm");
    const horseID = deleteForm.querySelector("#delete-horseID");
    if(validatePassword(deleteForm["password"].value)){
        await submitDeleteForm(horseID);
    }
    else{
        showToastMessage("Wrong password", "error");
    }
}

/* ========== SUBMIT CANCEL IN DELETE ========== */
export function closeDeleteDialog() {
    const deleteForm = document.querySelector("#deleteForm");
    deleteForm.parentElement.close();
    deleteForm.reset();
}

