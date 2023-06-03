import { setupAnimationSlider, currentYear } from "./animation_slider.js";
import { interpolateReds, interpolateBlues, interpolateGreens,
    interpolateRdYlGn, interpolateOranges, interpolatePurples, interpolatePuBuGn } from "https://cdn.skypack.dev/d3-scale-chromatic@3";
import { worldmap_data } from "./worldmap_data.js"

const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;

const LEFT_MAP_FEATURE = 'co2_emissions';
const RIGHT_MAP_STARTING_FEATURE = 'gdp';
const FIRST_YEAR = 1950;
const LAST_YEAR = 2021;

// TODO min values
// TODO invert mortality interpolation
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
        maxValue: 3.656346,
        maxValString: '3.66',
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
        maxValue: 84617105244160,
        maxValString: '84\'617G',
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


let currentlySelected = RIGHT_MAP_STARTING_FEATURE;

const animationCallback = function(year) {
    updateMap(d3.select('#emi_map_container'), year, LEFT_MAP_FEATURE,
        d3.scaleSequential()
            .domain([FEATURE_DATA[LEFT_MAP_FEATURE].minValue, FEATURE_DATA[LEFT_MAP_FEATURE].maxValue])
            .interpolator(FEATURE_DATA[LEFT_MAP_FEATURE].interpolator));
    updateMap(d3.select('#other_map_container'), year, d3.select("#map_sel_ft").property("value"),
    d3.scaleSequential()
        .domain([FEATURE_DATA[currentlySelected].minValue, FEATURE_DATA[currentlySelected].maxValue])
        .interpolator(FEATURE_DATA[currentlySelected].interpolator));
}

const getColor = function(scale, props, parameter, year) {
    return props[parameter] != null &&
            props[parameter][year] != null && 
            props[parameter][year] != "" ? 
        scale(props[parameter][year]) : "#AAA";
}

const getText = function(props, parameter, year) {
    return props[parameter] != null &&
            props[parameter][year] != null &&
            props[parameter][year] != -1 ? 
        props.name_long + '\n' + props[parameter][year] :
        props.name_long + '\n' + 'No data';
}

const data = worldmap_data;;
let data_csv;

export const loadMaps = () => {
    d3.csv('resources/worldmap_csv.csv').then(loadedData => {
        data_csv = loadedData;

        // init maps
        initMap(d3.select('#emi_map_container'),
            LEFT_MAP_FEATURE,
            d3.scaleSequential()
                .domain([FEATURE_DATA[LEFT_MAP_FEATURE].minValue, FEATURE_DATA[LEFT_MAP_FEATURE].maxValue])
                .interpolator(FEATURE_DATA[LEFT_MAP_FEATURE].interpolator));
        initMap(d3.select('#other_map_container'),
            RIGHT_MAP_STARTING_FEATURE,
            d3.scaleSequential()
                .domain([FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].minValue, FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].maxValue])
                .interpolator(FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].interpolator));
            
        document.getElementById('map_sel_ft').value = RIGHT_MAP_STARTING_FEATURE;
        document.getElementById('scale_grad_right').src =
        FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].legendImage;
        
        // register selection callback
        d3.select("#map_sel_ft").on("change", function () {
            currentlySelected = d3.select(this).property("value");
            document.getElementById('start-scale-map2').innerHTML =
                FEATURE_DATA[currentlySelected].minValString;
            document.getElementById('end-scale-map2').innerHTML =
                FEATURE_DATA[currentlySelected].maxValString;
            document.getElementById('scale_grad_right').src =
                FEATURE_DATA[currentlySelected].legendImage;
            updateMap(d3.select('#other_map_container'), currentYear, currentlySelected,
            d3.scaleSequential()
                .domain([FEATURE_DATA[currentlySelected].minValue, FEATURE_DATA[currentlySelected].maxValue])
                .interpolator(FEATURE_DATA[currentlySelected].interpolator));
        });

        // set animation elements
        initAnimationElements();
    });
    
}


const initMap = (container, parameter, colorScale) => {
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

    document.getElementById('start-scale-map1').innerHTML = 
        FEATURE_DATA[LEFT_MAP_FEATURE].minValString;
    document.getElementById('end-scale-map1').innerHTML =
        FEATURE_DATA[LEFT_MAP_FEATURE].maxValString;
    document.getElementById('start-scale-map2').innerHTML =
        FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].minValString;
    document.getElementById('end-scale-map2').innerHTML =
        FEATURE_DATA[RIGHT_MAP_STARTING_FEATURE].maxValString;
}