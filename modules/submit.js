"use strict";

import { endpoint, updateHorse, deleteHorseClicked } from "../main.js";

/* ========== SUBMIT CREATE ========== */
//todo add submitCreateForm here

/* ========== SUBMIT UPDATE ========== */
export async function submitUpdateForm(event) {
  event.preventDefault();
  const form = event.target;
  const horseID = form.horseId.value;
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
      phone: form.ownerPhone.value,
    },
    topspeed: Number(form.topspeed.value),
  };
  await updateHorse(horse, horseID, endpoint);
  form.parentElement.close();
  form.reset();
}

/* ========== SUBMIT DELETE ========== */
export async function deleteHorse(event, id) {
  event.preventDefault();
  const response = await fetch(`${endpoint}/horses/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleteDialog = document.querySelector("#dialogDeleteForm");
    const deleteForm = document.querySelector("#deleteForm");
    deleteDialog.close();
    deleteForm.reset();
  }
}

/* ========== SUBMIT CANCEL IN DELETE ========== */
export function cancelDelete() {
  const deleteForm = document.querySelector("#deleteForm");
  const deleteDialog = document.querySelector("#dialogDeleteForm");
  deleteDialog.close();
  deleteForm.reset();
}
