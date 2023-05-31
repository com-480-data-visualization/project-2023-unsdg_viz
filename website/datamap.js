import { setupAnimationSlider, currentYear } from "./animation_slider.js";
import { interpolateReds, interpolateBlues } from "https://cdn.skypack.dev/d3-scale-chromatic@3";
import { worldmap_data } from "./worldmapdata.js";

const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;

const LEFT_MAP_FEATURE = 'co2_emissions';
const RIGHT_MAP_STARTING_FEATURE = 'gdp';
const FIRST_YEAR = 2005;
const LAST_YEAR = 2021;
const MAX_VALUES = {
    'co2_emissions': 11472369000,
    'air_pollution': 100,
    'mortality': 0.545,
    'gdp': 14631844184064,
    'growth': 0.95,
    'fdi': 467625,
    'revenue_proportion': 3.656346,
}
const MAX_VALUES_STRINGS = {
    'co2_emissions': '11\'473M',
    'air_pollution': '100',
    'mortality': '0.545',
    'gdp': '14\'632G',
    'growth': '0.95',
    'fdi': '468k',
    'revenue_proportion': '3.66',
}
const colorScaleRed = d3.scaleSequential()
		.domain([0, MAX_VALUES[LEFT_MAP_FEATURE]])
		.interpolator(interpolateReds);
let colorScaleBlue;

const animationCallback = function(year) {
    updateMap(d3.select('#emi_map_container'), year, LEFT_MAP_FEATURE, colorScaleRed);
    updateMap(d3.select('#other_map_container'), year, d3.select("#map_sel_ft").property("value"), colorScaleBlue);
}

const getColor = function(scale, props, parameter, year) {
    return props[parameter] != null &&
            props[parameter][year] != null && 
            props[parameter][year] != -1 ? 
        scale(props[parameter][year]) : "#AAA";
}

const getText = function(props, parameter, year) {
    return props[parameter] != null &&
            props[parameter][year] != null &&
            props[parameter][year] != -1 ? 
        props.name_long + '\n' + props[parameter][year] :
        props.name_long + '\n' + 'No data';
}

const data = worldmap_data;


export const loadMaps = () => {
    // init maps
    initMap(d3.select('#emi_map_container'),
        document.getElementById('details-container'),
        LEFT_MAP_FEATURE, colorScaleRed);
    
    colorScaleBlue = d3.scaleSequential()
		.domain([0, MAX_VALUES[RIGHT_MAP_STARTING_FEATURE]])
		.interpolator(interpolateBlues)
    initMap(d3.select('#other_map_container'),
        document.getElementById('details-container'),
        RIGHT_MAP_STARTING_FEATURE, colorScaleBlue);
    
    // register selection callback
    d3.select("#map_sel_ft").on("change", function () {
        var selectedValue = d3.select(this).property("value");
        colorScaleBlue = d3.scaleSequential()
            .domain([0, MAX_VALUES[selectedValue]])
            .interpolator(interpolateBlues);
        document.getElementById('end-scale-map2').innerHTML = MAX_VALUES_STRINGS[selectedValue];

        updateMap(d3.select('#other_map_container'), currentYear, selectedValue, colorScaleBlue);
    });

    // set animation elements
    initAnimationElements();
}


const initMap = (container, detailsContainer, parameter, colorScale) => {
    /* event handlers */
    const zoom = d3
    .zoom()
    .scaleExtent(ZOOM_THRESHOLD)
    .on("zoom", zoomHandler);

    function zoomHandler() {
        g.attr("transform", d3.zoomTransform(this));
    }

    // country click callback
    function clickHandler(event, d) {
        let countryName = document.getElementById('country-name')
        // TODO refactor once we know exactly what data to put
        if (countryName.innerHTML === d.properties.name){
            // clicked on same country -> hide details
            countryName.innerHTML = '';
            detailsContainer.style.display = "none";
        } else {
            // show details of clicked country
            countryName.innerHTML = d.properties.name;
            detailsContainer.style.display = "block";
            detailsContainer.scrollIntoView();
        }
    }

    function doubleClickHandler(event, d) {
        clickToZoom(ZOOM_IN_STEP);
    }

    function clickToZoom(zoomStep) {
        container
            .transition()
            .duration(ZOOM_DURATION)
            .call(zoom.scaleBy, zoomStep);
    }


    /* build map */
    const projection = d3
        .geoNaturalEarth1()
        .fitSize([750, 350], data);
    const path = d3.geoPath().projection(projection);

    const g = container
        .call(zoom).on("wheel.zoom", null) // remove scroll wheel zoom
        .append("g");

    g.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("d", path)
            .style("fill", d => getColor(colorScale, d.properties, parameter, FIRST_YEAR))
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .on("click", clickHandler)
            .on("dblclick", doubleClickHandler)
        .append('title')
            .text(d => getText(d.properties, parameter, FIRST_YEAR));

}

const updateMap = (container, year, parameter, colorScale) => {
	container.selectAll('path')
   		.data(data.features)
   		.transition()
   		.duration(500)
   		.style('fill', d => getColor(colorScale, d.properties, parameter, year))

    container.selectAll('title')
        .data(data.features)
        .text(d => getText(d.properties, parameter, year));
}

const initAnimationElements = () => {
    const animation_btn = document.getElementById('animation_btn');
    const btn_img = document.getElementById('btn_icon');
    const slider = document.getElementById("myRange");
    const text = d3.select('#map_year');
    
    setupAnimationSlider(animation_btn, btn_img, text, slider,
        FIRST_YEAR, LAST_YEAR, animationCallback);

    document.getElementById('start-scale-map1').innerHTML = '0';
    document.getElementById('end-scale-map1').innerHTML =
        MAX_VALUES_STRINGS[LEFT_MAP_FEATURE];
    document.getElementById('start-scale-map2').innerHTML = '0';
    document.getElementById('end-scale-map2').innerHTML =
        MAX_VALUES_STRINGS[RIGHT_MAP_STARTING_FEATURE];
}