import { initMap, updateMap } from "./datamap.js";
import { countries_emissions } from "./countries_emissions.js";
import { setupAnimationSlider } from "./animation_slider.js";

const FIRST_YEAR = 1950;
const LAST_YEAR = 2021;

const animationCallback = function(year) {
	updateMap('#emi_map_container', countries_emissions, year);
	updateMap('#other_map_container', countries_emissions, year);
}

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
	const animation_btn = document.getElementById('animation_btn');
	const btn_img = document.getElementById('btn_icon');
	const slider = document.getElementById("myRange");
	const text = d3.select('#map_year');
	
	setupAnimationSlider(animation_btn, btn_img, text, slider,
		FIRST_YEAR, LAST_YEAR, animationCallback);
});




// resources for interactive world map
// https://github.com/ivan-ha/d3-hk-map
// https://medium.com/@ivan.ha/using-d3-js-to-plot-an-interactive-map-34fbea76bd78
// https://datamaps.github.io/
// https://vizhub.com/curran/d5ad96d1fe8148bd827a25230cc0f083
// https://towardsdatascience.com/using-d3-js-to-create-dynamic-maps-and-visuals-that-show-competing-climate-change-scenarios-for-bb0515d633d3