"use strict";

/* ========== SEARCH BY NAME/RACE/COLOR ========== */
import { horseArr, showHorses } from "../display/display.js";

export function inputSearchChanged(event) {
    const searchValue = event.target.value;
    const filteredHorses = searchHorses(searchValue);
    showHorses(filteredHorses);
}
function searchHorses(searchValue) {
    return horseArr.filter(
        (horse) =>
            (horse["name"].toLowerCase().includes(searchValue.toLowerCase())
                || horse["race"].toLowerCase().includes(searchValue.toLowerCase())
                || horse["color"].toLowerCase().includes(searchValue.toLowerCase()))
    );
}