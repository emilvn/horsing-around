"use strict";
import { endpoint, getOneHorse } from "../../main.js";
import { showToastMessage } from "../display/toastMessage.js";

export async function addLike(event, likeButton, dislikeButton, horseObj) {
    event.stopPropagation();
    const horseID = horseObj["id"];
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = Number(horse["likes"]) + 1;
    likeButton.disabled = !dislikeButton.disabled;
    dislikeButton.disabled = false;
    await updateLikes(likesAmount, horseID, endpoint, likeButton, "like");
}

export async function removeLike(event, likeButton, dislikeButton, horseObj) {
    event.stopPropagation();
    const horseID = horseObj["id"];
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = Number(horse["likes"]) - 1;
    dislikeButton.disabled = !likeButton.disabled;
    likeButton.disabled = false;
    await updateLikes(likesAmount, horseID, endpoint, likeButton, "dislike");
}

/* ========== HTTP PATCH ========== */
//sends patch request with the updated amount of likes
async function updateLikes(likesAmount, horseID, endpoint, button, likeType) {
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
        if(likeType === "like") showToastMessage("Horse liked", "success");
        else showToastMessage("Horse disliked", "success");
        console.log("Horse like added successfully");
        await displayUpdatedLikes(button, horseID);
    } else {
        if(likeType === "like") showToastMessage("Horse like failed", "error");
        else showToastMessage("Horse dislike failed", "error");
        console.log("Bad response at updateLikes");
    }
    } catch (err) {
        throw new Error(`Error at updateLikes: ${err}`);
    }
}
async function displayUpdatedLikes(button, horseID){
    const horseObj = await getOneHorse(horseID, endpoint);
    if(button.classList.contains("detailDialog")){
        let likesText;
        if (horseObj["likes"] > 0) {
            likesText = horseObj["likes"] + " likes.";
        } else if (horseObj["likes"] < 0) {
            likesText = Math.abs(horseObj["likes"]) + " dislikes.";
        } else {
            likesText = "No likes/dislikes.";
        }
        document.querySelector("#detail-likes").textContent = likesText;
    }
    else{
        button.querySelector(".likes").textContent = horseObj["likes"];
    }
}