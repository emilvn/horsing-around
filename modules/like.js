"use strict";
import {endpoint, getOneHorse} from "../main.js";
import {showToastMessage} from "./dialogs.js";
import {updateGrid} from "./display.js";
export async function addLike(event){
    const horseID = event.target.parentElement.querySelector("span:first-child").textContent;
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = horse["likes"] + 1;
    await updateLikes(likesAmount, horseID, endpoint);
}

export async function removeLike(event){
    const horseID = event.target.parentElement.querySelector("span:first-child").textContent;
    const horse = await getOneHorse(horseID, endpoint);
    const likesAmount = horse["likes"] - 1;
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
            showToastMessage("Horse Liked", "success");
            console.log("Horse like added successfully");
            await updateGrid();
        }
        else{
            showToastMessage("Horse like failed", "error");
            console.log("Bad response at updateLikes");
        }
    }
    catch (err){
        throw new Error(`Error at updateLikes: ${err}`);
    }
}