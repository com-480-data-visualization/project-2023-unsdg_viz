import {interpolateReds} from "https://cdn.skypack.dev/d3-scale-chromatic@3";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const ZOOM_THRESHOLD = [0.3, 7];
const OVERLAY_MULTIPLIER = 10;
const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;
const ZOOM_OUT_STEP = 1 / ZOOM_IN_STEP;
const MAX_EMISSION = 33.640438;
const FIRST_YEAR = 1950;
const colorScale = d3.scaleSequential()
		.domain([0, MAX_EMISSION])
		.interpolator(interpolateReds);

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		action();
	}
}

whenDocumentLoaded(() => {
	initMap(countries_emissions);
	let current_year = FIRST_YEAR;

	let interval = setInterval(() => {
		if (current_year < 2022) {
		   updateMap(countries_emissions, current_year)
		   current_year++;
		} else {
		   clearInterval(interval);
		}
	 }, 1000);
});


// --------------- Draw map ---------------
function initMap(data) {
	const zoom = d3
		.zoom()
		.scaleExtent(ZOOM_THRESHOLD)
		.on("zoom", zoomHandler);

	function zoomHandler() {
		g.attr("transform", d3.event.transform);
	}

	/*function mouseOutHandler(d, i) {
	d3.select(this).attr("fill", colorScale(d.properties.emitted_co2))
	}*/

	function clickHandler(d, i) {
		// TODO open details about the country
	}

	function doubleClickHandler(d, i) {
		clickToZoom(ZOOM_IN_STEP);
	}

	function clickToZoom(zoomStep) {
		svg
			.transition()
			.duration(ZOOM_DURATION)
			.call(zoom.scaleBy, zoomStep);
	}

	const svg = d3
	.select("#map__container")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "100%");

	const g = svg.call(zoom).append("g");

	g.append("rect")
		.attr("width", WIDTH * OVERLAY_MULTIPLIER)
		.attr("height", HEIGHT * OVERLAY_MULTIPLIER)
		.attr("transform",
			`translate(-${WIDTH * OVERLAY_OFFSET},-${HEIGHT * OVERLAY_OFFSET})`)
		.style("fill", "none")
		.style("pointer-events", "all");

	const projection = d3
		.geoMercator()
		.center([0, 0])
		.translate([WIDTH / 2, HEIGHT / 2]);

	const path = d3.geoPath().projection(projection);


  	g.append("g")
			.selectAll("path")
			.data(data.features)
		.enter()
		.append("path")
			.attr("d", path)
			.style("fill", d => d.properties.emitted_co2 != null &&
					d.properties.emitted_co2[FIRST_YEAR] != null ? 
				colorScale(d.properties.emitted_co2[FIRST_YEAR]) : "#AAA")
			.attr("stroke", "#000")
			.attr("stroke-width", 0.5)
			.on("click", clickHandler)
			.on("dblclick", doubleClickHandler)
		.append('title')
			.text(d => d.properties.name);

}


// --------------- Update map ---------------
function updateMap(data, year) {
	const svg = d3.select('#map__container');  
  
  	svg.selectAll('path')
   		.data(data.features)
   		.transition()
   		.delay(100)
   		.duration(1000)
   		.style('fill', d => d.properties.emitted_co2 != null &&
		   	d.properties.emitted_co2[year] != null ? 
	   		colorScale(d.properties.emitted_co2[year]) : "#AAA")

}

// resources for interactive world map
// https://github.com/ivan-ha/d3-hk-map
// https://medium.com/@ivan.ha/using-d3-js-to-plot-an-interactive-map-34fbea76bd78
// https://datamaps.github.io/
// https://vizhub.com/curran/d5ad96d1fe8148bd827a25230cc0f083
// https://towardsdatascience.com/using-d3-js-to-create-dynamic-maps-and-visuals-that-show-competing-climate-change-scenarios-for-bb0515d633d3