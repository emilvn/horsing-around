"use strict";

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
    form.horseId.value = horseObj["id"];
    /* image */
    form.image.value = horseObj["image"];
    /* owner info */
    form.ownerName.value = horseObj.owner["name"];
    form.ownerEmail.value = horseObj.owner["email"];
    form.ownerPhone.value = horseObj.owner["phone"];
    /* good to know */
    for(let i=0; i<form.temperament.options.length; i++){
        const option = form.temperament.options[i];
        if(option.value === horseObj["temperament"]){
            option.selected = true;
            break;
        }
    }
    for(let i=0; i<form.trainingLevel.options.length; i++){
        const option = form.trainingLevel.options[i];
        if(option.value === horseObj["trainingLevel"]){
            option.selected = true;
            break;
        }
    }
    form.riderExperienceRequired.checked = horseObj["riderExperienceRequired"];
    form.registered.checked = horseObj["registered"]
    /* General information */
    form.horseName.value = horseObj["name"];
    form.age.value = horseObj["age"];
    form.horseRace.value = horseObj["race"];
    form.horseColor.value = horseObj["color"];
    for(let i=0; i<form.gender.length; i++){
        const radioInput = form.gender[i];
        if(radioInput.value === horseObj["gender"]){
            radioInput.checked = true;
            break;
        }
    }
    form.height.value = horseObj["height"];
    form.topspeed.value = horseObj["topspeed"];
    /* Health and diet */
    form.diet.value = horseObj["diet"].join(", ");
    form.vaccinations.value = horseObj["vaccinations"].join(", ");
    form.hasTapeworm.checked = horseObj["hasTapeworm"];
}

/* ========== DELETE DIALOG ========== */
//todo add showDeleteDialog here

/* ========== CREATE SUCCESS DIALOG ========== */
//todo add showCreateSuccess here

/* ========== UPDATE SUCCESS DIALOG ========== */
//todo add showUpdateSuccess here

/* ========== DELETE SUCCESS DIALOG ========== */
//todo add showDeleteSuccess here