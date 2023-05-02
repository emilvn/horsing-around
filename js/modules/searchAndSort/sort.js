import { showHorses, horseArr } from "../display/display.js";

export async function sortHorses(event) {
    const select = event.target;
    
    function sortBy(a,b) {
        if (select.value === "likes") {
            return b.likes-a.likes;
        } else if (select.value === "name") {
            return a.name.localeCompare(b.name);
        } else if (select.value === "race") {
            return a.race.localeCompare(b.race);
        }
    }
    horseArr.sort(sortBy)
    showHorses(horseArr);
}