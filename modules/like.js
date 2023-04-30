"use strict";
import { endpoint, getOneHorse } from "../main.js";
import { showToastMessage } from "./dialogs.js";

export async function addLike(event, likeButton, dislikeButton, horseObj) {
    event.stopPropagation();
    const horseID = horseObj["id"];
    /*const horseID = likeButton.parentElement.querySelector(".horseID").textContent;*/
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = horse["likes"] + 1;
    likeButton.disabled = !dislikeButton.disabled;
    dislikeButton.disabled = false;
    await updateLikes(likesAmount, horseID, endpoint, likeButton);
}

export async function removeLike(event, likeButton, dislikeButton, horseObj) {
    event.stopPropagation();
    const horseID = horseObj["id"];
    /*const horseID = dislikeButton.parentElement.querySelector(".horseID").textContent;*/
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = horse["likes"] - 1;
    dislikeButton.disabled = !likeButton.disabled;
    likeButton.disabled = false;
    await updateLikes(likesAmount, horseID, endpoint, likeButton);
}

/* ========== HTTP PATCH ========== */
//sends patch request with the updated amount of likes
async function updateLikes(likesAmount, horseID, endpoint, button) {
    // location is "detailDialog" or "horseGrid"
    try {
    const response = await fetch(`${endpoint}horses/${horseID}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likes: likesAmount,
      }),
    });
    if (response.ok) {
      showToastMessage("Horse liked/disliked", "success");
      console.log("Horse like added successfully");
      await displayUpdatedLikes(button, horseID);
    } else {
      showToastMessage("Horse like/dislike failed", "error");
      console.log("Bad response at updateLikes");
    }
  } catch (err) {
    throw new Error(`Error at updateLikes: ${err}`);
  }
}
async function displayUpdatedLikes(button, horseID){
    const horse = await getOneHorse(horseID, endpoint);
    if(button.classList.contains("detailDialog")){
        document.querySelector("#detail-likes")
            .textContent = horse["likes"];
    }
    else{
        button.querySelector(".likes").textContent = horse["likes"];
    }
}