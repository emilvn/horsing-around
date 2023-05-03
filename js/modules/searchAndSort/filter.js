/* ========== FILTER BY MALE/FEMALE ========== */

import {horseArr, showHorses} from "../display/display.js";

export function filterByGender(event){
	const filterSelect = event.target;
	if(filterSelect.value !== "none"){
		const filtered = horseArr.filter(horse => horse["gender"] === filterSelect.value);
		showHorses(filtered);
	}
	else{
		showHorses(horseArr);
	}
}