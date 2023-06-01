import { setupAnimationSlider, currentYear } from "./animation_slider.js";
import { interpolateReds, interpolateBlues, interpolateGreens,
    interpolateRdYlGn, interpolateOranges, interpolatePurples, interpolatePuBuGn } from "https://cdn.skypack.dev/d3-scale-chromatic@3";
import { worldmap_data } from "./worldmapdata.js";
import { loadCountryDetails } from "./country_details.js";

const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;

const LEFT_MAP_FEATURE = 'co2_emissions';
const RIGHT_MAP_STARTING_FEATURE = 'gdp';
const FIRST_YEAR = 2005;
const LAST_YEAR = 2021;

// TODO min values
// TODO invert mortality interpolation
const FEATURE_DATA = {
    'co2_emissions': {
        maxValue: 11472369000,
        maxValString: '11\'473M',
        interpolator: interpolateReds,
        legendImage: 'resources/Reds.png', 
    },
    'air_pollution': {
        maxValue: 100,
        maxValString: '100%',
        interpolator: interpolateBlues,
        legendImage: 'resources/Blues.png', 
    },
    'mortality': {
        maxValue: 0.545,
        maxValString: '0.545',
        interpolator: interpolateRdYlGn,
        legendImage: 'resources/RdYlGn.png', 
    },
    'gdp': {
        maxValue: 14631844184064,
        maxValString: '14\'632G',
        interpolator: interpolateGreens,
        legendImage: 'resources/Greens.png', 
    },
    'growth': {
        maxValue: 0.95,
        maxValString: '0.95%',
        interpolator: interpolateOranges,
        legendImage: 'resources/Oranges.png', 
    },
    'fdi': {
        maxValue: 467625,
        maxValString: '468k',
        interpolator: interpolateBlues,
        legendImage: 'resources/Blues.png', 
    },
    'revenue_proportion': {
        maxValue: 3.656346,
        maxValString: '3.66',
        interpolator: interpolatePuBuGn,
        legendImage: 'resources/PuBuGn.png', 
    },
}


let currentlySelected = RIGHT_MAP_STARTING_FEATURE;

const animationCallback = function(year) {
    updateMap(d3.select('#emi_map_container'), year, LEFT_MAP_FEATURE,
        d3.scaleSequential()
            .domain([0, FEATURE_DATA[LEFT_MAP_FEATURE].maxValue])
            .interpolator(FEATURE_DATA[LEFT_MAP_FEATURE].interpolator));
    updateMap(d3.select('#other_map_container'), year, d3.select("#map_sel_ft").property("value"),
    d3.scaleSequential()
        .domain([0, FEATURE_DATA[currentlySelected].maxValue])
        .interpolator(FEATURE_DATA[currentlySelected].interpolator));
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
let data_csv;

export const loadMaps = () => {
    d3.csv('resources/worldmap_csv.csv').then(loadedData => {
        data_csv = loadedData;

        // init maps
        initMap(d3.select('#emi_map_container'),
            document.getElementById('details-container'),
            LEFT_MAP_FEATURE,
            d3.scaleSequential()
                .domain([0, FEATURE_DATA[LEFT_MAP_FEATURE].maxValue])
                .interpolator(FEATURE_DATA[LEFT_MAP_FEATURE].interpolator));
        initMap(d3.select('#other_map_container'),
            document.getElementById('details-container'),
            RIGHT_MAP_STARTING_FEATURE,
            d3.scaleSequential()
                .domain([0, FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].maxValue])
                .interpolator(FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].interpolator));

        document.getElementById('map_sel_ft').value = RIGHT_MAP_STARTING_FEATURE;
        document.getElementById('scale_grad_rigth').src =
                FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].legendImage;

        // register selection callback
        d3.select("#map_sel_ft").on("change", function () {
            currentlySelected = d3.select(this).property("value");
            document.getElementById('end-scale-map2').innerHTML =
                FEATURE_DATA[currentlySelected].maxValString;
            document.getElementById('scale_grad_rigth').src =
                FEATURE_DATA[currentlySelected].legendImage;
            updateMap(d3.select('#other_map_container'), currentYear, currentlySelected,
                d3.scaleSequential()
                    .domain([0, FEATURE_DATA[currentlySelected].maxValue])
                    .interpolator(FEATURE_DATA[currentlySelected].interpolator));
        });

        // set animation elements
        initAnimationElements();
    });
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

    // click callback
    function clickHandler(event, d) {
        if (event.detail === 1) {
            fillDetailsBox(d, detailsContainer);
          } else if (event.detail === 2) {
            clickToZoom(ZOOM_IN_STEP);
          }
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
        FEATURE_DATA[LEFT_MAP_FEATURE].maxValString;
    document.getElementById('start-scale-map2').innerHTML = '0';
    document.getElementById('end-scale-map2').innerHTML =
        FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].maxValString;
}

const fillDetailsBox = function(d, detailsContainer) {
    let countryName = document.getElementById('country-name')
        if (countryName.innerHTML === d.properties.name){
            // clicked on same country -> hide details
            countryName.innerHTML = '';
            detailsContainer.style.display = "none";
        } else {
            // show details of clicked country
            countryName.innerHTML = d.properties.name;
            detailsContainer.style.display = "block";
            let flt = data_csv.filter(e => e.country === d.properties.name)
            loadCountryDetails(flt, Object.keys(MAX_VALUES));
            
            // scroll to container
            /*detailsContainer.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });*/
        }
}