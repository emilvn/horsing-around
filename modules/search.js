"use strict";

/* ========== SEARCH BY NAME/RACE/COLOR ========== */
import {horseArr, showHorses} from "./display.js";

export function inputSearchChanged(event){
    const searchValue = event.target.value;
    const filteredHorses = searchHorses(searchValue);
    showHorses(filteredHorses);
}
function searchHorses(searchValue){
    return horseArr.filter((horse)=>
    horse["name"].includes(searchValue)
            || horse["race"].includes(searchValue)
            || horse["color"].includes(searchValue)
    );
}