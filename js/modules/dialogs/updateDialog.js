import {submitUpdateForm} from "../submit/submit.js";

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
    const temperamentOptions = Array.from(form.temperament.options);
    const selectedTemperamentOption = temperamentOptions.find( option => option.value === horseObj["temperament"] );
    selectedTemperamentOption.selected = true;

    const trainingLevelOptions = Array.from(form.trainingLevel.options);
    const selectedTrainingLevelOption = trainingLevelOptions.find( option => option.value === horseObj["trainingLevel"] );
    selectedTrainingLevelOption.selected = true;

    form.riderExperienceRequired.checked = horseObj["riderExperienceRequired"];
    form.registered.checked = horseObj["registered"];
}
function fillGeneralInformationInputs(form, horseObj) {
    form.horseName.value = horseObj["name"];
    form.age.value = horseObj["age"];
    form.horseRace.value = horseObj["race"];
    form.horseColor.value = horseObj["color"];

    const genderRadioInputs = Array.from(form.gender);
    const selectedGenderRadioInput = genderRadioInputs.find( input => input.value === horseObj["gender"] );
    selectedGenderRadioInput.checked = true;

    form.height.value = horseObj["height"];
    form.topspeed.value = horseObj["topspeed"];
}