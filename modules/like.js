"use strict";
import {endpoint, getOneHorse} from "../main.js";
import {showToastMessage} from "./dialogs.js";
import {updateGrid} from "./display.js";
export async function addLike(event){
    const likeButton = event.target;
    const dislikeButton = likeButton.parentElement.querySelector(".dislike-btn");
    const horseID = likeButton.parentElement.querySelector(".horseID").textContent;
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = horse["likes"] + 1;
    likeButton.disabled = true;
    dislikeButton.disabled = false;
    await updateLikes(likesAmount, horseID, endpoint);
}

export async function removeLike(event){
    const dislikeButton = event.target;
    const likeButton = dislikeButton.parentElement.querySelector(".like-btn");
    const horseID = dislikeButton.parentElement.querySelector(".horseID").textContent;
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = horse["likes"] - 1;
    dislikeButton.disabled = true;
    likeButton.disabled = false;
    await updateLikes(likesAmount, horseID, endpoint);
}

/* ========== HTTP PATCH ========== */
//sends patch request with the updated amount of likes
async function updateLikes(likesAmount, horseID, endpoint){
    try{
        const response = await fetch(`${endpoint}horses/${horseID}.json`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                likes: likesAmount
            })
        })
        if(response.ok){
            showToastMessage("Horse liked/disliked", "success");
            console.log("Horse like added successfully");
            await updateGrid();
        }
        else{
            showToastMessage("Horse like/dislike failed", "error");
            console.log("Bad response at updateLikes");
        }
    }
    catch (err){
        throw new Error(`Error at updateLikes: ${err}`);
    }
}