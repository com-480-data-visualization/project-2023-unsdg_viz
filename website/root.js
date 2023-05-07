import { initMap, updateMap } from "./datamap.js";
import { co2_air } from "./co2_air.js"
import { setupAnimationSlider } from "./animation_slider.js";
import { interpolateReds, interpolateBlues } from "https://cdn.skypack.dev/d3-scale-chromatic@3";
import { loadClimateGraph } from "./climate_graph.js";


const FIRST_YEAR = 1950;
const LAST_YEAR = 2021;
const MAX_EMISSION = 33.640438;

const colorScaleRed = d3.scaleSequential()
		.domain([0, MAX_EMISSION])
		.interpolator(interpolateReds);
const colorScaleBlue = d3.scaleSequential()
		.domain([0, 100])
		.interpolator(interpolateBlues);

const animationCallback = function(year) {
	updateMap(d3.select('#emi_map_container'), co2_air, year, 'emitted_co2', colorScaleRed);
	updateMap(d3.select('#other_map_container'), co2_air, year, 'air_pollution', colorScaleBlue);
}

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		action();
	}
}

whenDocumentLoaded(() => {
	/* WORLD MAPS */
	initMap(d3.select('#emi_map_container'),
		document.getElementById('details-container'),
		co2_air, 'emitted_co2', colorScaleRed);
	initMap(d3.select('#other_map_container'),
		document.getElementById('details-container'),
		co2_air, 'air_pollution', colorScaleBlue);
	const animation_btn = document.getElementById('animation_btn');
	const btn_img = document.getElementById('btn_icon');
	const slider = document.getElementById("myRange");
	const text = d3.select('#map_year');
	
	setupAnimationSlider(animation_btn, btn_img, text, slider,
		FIRST_YEAR, LAST_YEAR, animationCallback);

	document.getElementById('start-scale-map1').innerHTML = '0';
	document.getElementById('end-scale-map1').innerHTML = MAX_EMISSION.toString();
	document.getElementById('start-scale-map2').innerHTML = '0%';
	document.getElementById('end-scale-map2').innerHTML = '100%';

	/* CLIMATE GRAPH */
	loadClimateGraph();
});




// resources for interactive world map
// https://github.com/ivan-ha/d3-hk-map
// https://medium.com/@ivan.ha/using-d3-js-to-plot-an-interactive-map-34fbea76bd78
// https://datamaps.github.io/
// https://vizhub.com/curran/d5ad96d1fe8148bd827a25230cc0f083
// https://towardsdatascience.com/using-d3-js-to-create-dynamic-maps-and-visuals-that-show-competing-climate-change-scenarios-for-bb0515d633d3