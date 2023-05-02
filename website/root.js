import { initMap, updateMap } from "./datamap.js";
import { countries_emissions } from "./countries_emissions.js";

const FIRST_YEAR = 1950;
let current_year = FIRST_YEAR;
var slider;

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		action();
	}
}

whenDocumentLoaded(() => {
	initMap('#emi_map_container', countries_emissions);
	initMap('#other_map_container', countries_emissions);
	slider = document.getElementById("myRange");
	slider.value = FIRST_YEAR;
	d3.select('#map_year').text('Year ' + slider.value);

	let interval = setInterval(() => {
		if (current_year < 2022) {
		   updateMap('#emi_map_container', countries_emissions, current_year);
		   updateMap('#other_map_container', countries_emissions, current_year);
		   d3.select('#map_year').text('Year ' + current_year);
		   slider.value = current_year;
		   current_year++;
		} else {
		   clearInterval(interval);
		}
	 }, 1000);
});

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
	current_year = this.value;
	d3.select('#map_year').text('Year ' + current_year);
	updateMap('#emi_map_container', countries_emissions, current_year);
	updateMap('#other_map_container', countries_emissions, current_year);
}


// resources for interactive world map
// https://github.com/ivan-ha/d3-hk-map
// https://medium.com/@ivan.ha/using-d3-js-to-plot-an-interactive-map-34fbea76bd78
// https://datamaps.github.io/
// https://vizhub.com/curran/d5ad96d1fe8148bd827a25230cc0f083
// https://towardsdatascience.com/using-d3-js-to-create-dynamic-maps-and-visuals-that-show-competing-climate-change-scenarios-for-bb0515d633d3