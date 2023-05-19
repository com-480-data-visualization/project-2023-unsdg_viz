import { interpolateReds, interpolateBlues } from "https://cdn.skypack.dev/d3-scale-chromatic@3";
import { loadStatsGraph } from "./stats_graph.js";
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
	loadStatsGraph();
    /* STATS GRAPH */
    loadClimateGraph();
});


