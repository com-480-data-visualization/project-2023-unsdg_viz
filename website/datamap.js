import { setupAnimationSlider, currentYear } from "./animation_slider.js";
import { interpolateReds, interpolateBlues, interpolateGreens,
    interpolateRdYlGn, interpolateOranges, interpolatePurples, interpolatePuBuGn } from "https://cdn.skypack.dev/d3-scale-chromatic@3";
import { worldmap_data } from "./resources/worldmap_data.js"

/* ### CONST VALUES ### */

const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;

const LMAP_FEATURE = 'co2_emissions';
const RMAP_START_FEATURE = 'gdp';
const FIRST_YEAR = 2002;
const LAST_YEAR = 2021;

// hardcoded min and max values from data processing
// because it would be too much of a pain to individually
// format each number to string
const FEATURE_DATA = {
    'co2_emissions': {
        minValue: 0.0,
        minValString: '0',
        maxValue: 11472369000,
        maxValString: '11\'473M',
        interpolator: interpolateReds,
        legendImage: 'resources/Reds.png', 
    },
    'revenue': {
        minValue: 0.0,
        minValString: '0',
        maxValue: 0.9579373,
        maxValString: '0.96',
        interpolator: interpolateRdYlGn,
        legendImage: 'resources/RdYlGn.png', 
    },
    'fdi': {
        minValue: -79077.2787,
        minValString: '-79k',
        maxValue: 467625,
        maxValString: '468k',
        interpolator: interpolatePurples,
        legendImage: 'resources/Purples.png', 
    },
    'growth_rate': {
        minValue: -0.602688,
        minValString: '-0.6%',
        maxValue: 0.94614,
        maxValString: '0.95%',
        interpolator: interpolateOranges,
        legendImage: 'resources/Oranges.png', 
    },
    'gdp': {
        minValue: 19994710.0,
        minValString: '20M',
        maxValue: 19974533939200,
        maxValString: '19\'975G',
        interpolator: interpolateGreens,
        legendImage: 'resources/Greens.png', 
    },
    'mortality_rate': {
        minValue: 0.073,
        minValString: '0.07',
        maxValue: 0.545,
        maxValString: '0.545',
        interpolator: interpolatePuBuGn,
        legendImage: 'resources/PuBuGn.png', 
    },
    'air_pollution': {
        minValue: 0,
        minValString: '0%',
        maxValue: 100,
        maxValString: '100%',
        interpolator: interpolateBlues,
        legendImage: 'resources/Blues.png', 
    },
    'literacy_rate': {
        minValue: 5.40465,
        minValString: '5.4%',
        maxValue: 99.999947,
        maxValString: '100%',
        interpolator: interpolateBlues,
        legendImage: 'resources/Blues.png', 
    },
    'renewable': {
        minValue: 0,
        minValString: '0%',
        maxValue: 100,
        maxValString: '100%',
        interpolator: interpolateGreens,
        legendImage: 'resources/Greens.png', 
    },
    
}

const data = worldmap_data;
let currentlySelected = RMAP_START_FEATURE;


/* ### CALLBACKS ### */

// callback on year update
const animationCallback = function(year) {
    updateMap(d3.select('#emi_map_container'), year, LMAP_FEATURE,
        d3.scaleSequential()
            .domain([FEATURE_DATA[LMAP_FEATURE].minValue, FEATURE_DATA[LMAP_FEATURE].maxValue])
            .interpolator(FEATURE_DATA[LMAP_FEATURE].interpolator));
    updateMap(d3.select('#other_map_container'), year, d3.select("#map_sel_ft").property("value"),
    d3.scaleSequential()
        .domain([FEATURE_DATA[currentlySelected].minValue, FEATURE_DATA[currentlySelected].maxValue])
        .interpolator(FEATURE_DATA[currentlySelected].interpolator));
}

// callback on new feature selected
const dropdownSelectionCallback = function() {
    // get value selected
    currentlySelected = d3.select(this).property("value");
        
    // set min and max values, color scale for legend
    document.getElementById('start-scale-map2').innerHTML =
        FEATURE_DATA[currentlySelected].minValString;
    document.getElementById('end-scale-map2').innerHTML =
        FEATURE_DATA[currentlySelected].maxValString;
    document.getElementById('scale_grad_right').src =
        FEATURE_DATA[currentlySelected].legendImage;
    
    // update right map with values of new feature
    const colorScale = d3.scaleSequential()
        .domain([
            FEATURE_DATA[currentlySelected].minValue,
            FEATURE_DATA[currentlySelected].maxValue])
        .interpolator(FEATURE_DATA[currentlySelected].interpolator); 
    updateMap(d3.select('#other_map_container'), currentYear,
        currentlySelected, colorScale);
}


/* ### VIZ METHOD ### */

export const loadMaps = () => {
    // color scales for country color fill
    const leftColorScale = d3.scaleSequential()
        .domain([
            FEATURE_DATA[LMAP_FEATURE].minValue,
            FEATURE_DATA[LMAP_FEATURE].maxValue])
        .interpolator(FEATURE_DATA[LMAP_FEATURE].interpolator);

    const rightColorScale = d3.scaleSequential()
        .domain([
            FEATURE_DATA[RMAP_START_FEATURE].minValue,
            FEATURE_DATA[RMAP_START_FEATURE].maxValue])
        .interpolator(FEATURE_DATA[RMAP_START_FEATURE].interpolator);

    // init left map
    initMap(d3.select('#emi_map_container'),
        LMAP_FEATURE, leftColorScale);
    
    // init right map
    initMap(d3.select('#other_map_container'),
        RMAP_START_FEATURE, rightColorScale);
    
    // set init value of dropdown box
    document.getElementById('map_sel_ft').value = RMAP_START_FEATURE;
    
    // set color scale of right map legend
    document.getElementById('scale_grad_right').src =
        FEATURE_DATA[RMAP_START_FEATURE].legendImage;
    
    // register feature selection callback
    d3.select("#map_sel_ft").on("change", dropdownSelectionCallback);

    // set animation elements
    initAnimationElements();
}


/* initialize a map */
function initMap(container, feature, colorScale) {
    // zoom handlers 
    const zoom = d3
        .zoom()
        .scaleExtent(ZOOM_THRESHOLD)
        .on("zoom", zoomHandler);
    
    function zoomHandler() {
        g.attr("transform", d3.zoomTransform(this));
    }

    // click callbacks
    function clickHandler(event, d) {
        if (event.detail === 2) {
            clickToZoom(ZOOM_IN_STEP);
        }
    }

    function clickToZoom(zoomStep) {
        container
            .transition()
            .duration(ZOOM_DURATION)
            .call(zoom.scaleBy, zoomStep);
    }


    // draw map
    const projection = d3
        .geoNaturalEarth1()
        .fitSize([750, 350], data);
    const path = d3.geoPath().projection(projection);

    const g = container
        .call(zoom).on("wheel.zoom", null) // remove scroll wheel zoom
        .append("g");

    // draw countries and fill with color
    g.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("d", path)
            .style("fill", d => getColor(colorScale, d.properties, feature, FIRST_YEAR))
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .on("click", clickHandler)
        .append('title')
            .text(d => getText(d.properties, feature, FIRST_YEAR));

    // set legends values
    document.getElementById('start-scale-map1').innerHTML = 
        FEATURE_DATA[LMAP_FEATURE].minValString;
    document.getElementById('end-scale-map1').innerHTML =
        FEATURE_DATA[LMAP_FEATURE].maxValString;
    document.getElementById('start-scale-map2').innerHTML =
        FEATURE_DATA[RMAP_START_FEATURE].minValString;
    document.getElementById('end-scale-map2').innerHTML =
        FEATURE_DATA[RMAP_START_FEATURE].maxValString;
}


/* update map with data of given year */
function updateMap(container, year, feature, colorScale) {
    // select all countries, update fill color
	container.selectAll('path')
   		.data(data.features)
   		.transition()
   		.duration(500)
   		.style('fill', d => getColor(colorScale, d.properties, feature, year))

    // update hint text of countries
    container.selectAll('title')
        .data(data.features)
        .text(d => getText(d.properties, feature, year));
}


/* initialize elements of animation controls */
function initAnimationElements() {
    const animation_btn = document.getElementById('animation_btn');
    const btn_img = document.getElementById('btn_icon');
    const slider = document.getElementById("myRange");
    const text = d3.select('#map_year');
    
    setupAnimationSlider(animation_btn, btn_img, text, slider,
        FIRST_YEAR, LAST_YEAR, animationCallback);
}


/* ### HELPER METHODS ### */

function getColor(scale, props, parameter, year) {
    return props[parameter] != null &&
            props[parameter][year] != null && 
            props[parameter][year] != "" ? 
        scale(props[parameter][year]) : "#AAA";
}

function getText(props, parameter, year) {
    return props[parameter] != null &&
            props[parameter][year] != null &&
            props[parameter][year] != -1 ? 
        props.name_long + '\n' + props[parameter][year] :
        props.name_long + '\n' + 'No data';
}