"use strict";
import { showHorses } from "../display/display.js";
import { horseArr } from "../display/display.js";


export async function sortHorses(event) {
    const select = event.target;
    
    function sortBy(a,b) {
        if (select.value === "likes") {
            return a.likes-b.likes; 
        } else if (select.value === "names") {
            return a.name.localeCompare(b.name);
        } else if (select.value === "race") {
            return a.race.localeCompare(b.race);
        }
    }

    horseArr.sort(sortBy)
    
    showHorses(horseArr);
}