import { emptymap_data } from "./emptymap.js"

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;
const FEATURE_NAMES = {
    'co2_emissions': 'Annual CO₂ emissions',
    'air_pollution': 'Population above WHO air pollution guidelines',
    'mortality': 'Mortality rate',
    'gdp': 'GDP (constant 2015 US$)',
    'growth': 'Annual growth rate',
    'fdi': 'FDI',
    'revenue_proportion': 'Gov. revenue proportion of GDP',
};
const displayFeatures = [
    'air_pollution',
    'mortality',
    'gdp',
    'growth',
    'fdi',
    'revenue_proportion',
];
const color = d3.scaleOrdinal()
    .domain(displayFeatures)
    .range(d3.schemeSet3);

// json { country { feature { min, max } } }
let minMaxValues = {};

// Highlight the feature that is hovered
const highlight = function(event,d){

    let selected_feature = d.feature;

    d3.selectAll(".dot")
    .transition()
    .duration(200)
    .style("fill", "lightgrey")
    .attr("r", 3)

    d3.selectAll("." + selected_feature)
    .transition()
    .duration(200)
    .style("fill", color(selected_feature))
    .attr("r", 7)
}

// remove highlight of feature that was hovered
const doNotHighlight = function(event,d){
    d3.selectAll(".dot")
    .transition()
    .duration(200)
    .style("fill", d => color(d.feature))
    .attr("r", 5 )
}

let parsedData;


export const loadCountryDetailsViz = function() {

    Promise.all([
        d3.csv("resources/countries_min.csv"),
        d3.csv("resources/countries_max.csv"),
    ]).then(function(files) {
        const minData = files[0];
        const maxData = files[1];

        minData.forEach(m => {
            minMaxValues[m['country']] = {}
            Object.keys(FEATURE_NAMES).forEach(f => {
                minMaxValues[m['country']][f.toString()] = {};
                minMaxValues[m['country']][f.toString()]['min'] = m[f.toString()];
            }) 
        });
        maxData.forEach(m => {
            Object.keys(FEATURE_NAMES).forEach(f => {
                minMaxValues[m['country']][f.toString()]['max'] = m[f.toString()];
            }) 
        });

        console.log(minMaxValues);

        d3.csv('resources/worldmap_csv.csv').then(csvData => {
            // draw the map
            initMap();

            parsedData = parseData(csvData);

            // draw country details
            //initDetailsGraph();

        });
    });
}

function parseData(rawData) {
    let data = [];
    // console.log(data);
    const features = Object.keys(FEATURE_NAMES);

    rawData.forEach(e => {
        const year = e.year;
        // if emissions exist, normalize value
        if (e.co2_emissions !== null && e.co2_emissions !== "") {
            // for each feature add an entry
            // {year,feature,emisisons,feature_value}
            features.forEach(f => {
                if (e[f.toString()] !== null && e[f.toString()] !== "" &&
                    f.toString() !== 'co2_emissions') {
                    let entry = {};
                    entry.country = e.country;
                    entry.year = year;
                    entry.feature = f;
                    entry.emissions = e.co2_emissions;
                    entry.value = e[f.toString()];

                    data.push(entry);
                }
            });
        }
    });

    data.map(e => {
        e.emissions = clamp(normalize(e.emissions,
            minMaxValues[e.country]['co2_emissions'].min,
            minMaxValues[e.country]['co2_emissions'].max));
        e.value = clamp(normalize(e.value,
            minMaxValues[e.country][e.feature].min,
            minMaxValues[e.country][e.feature].max));

        //if (e.value > 1 || e.value < 0) {
        //    console.log(e.feature + ' ' + e.value);
        //}
    });

    return data;
}

function initMap() {
    const container = d3.select('#select_map_container');

    /* event handlers */
    const zoom = d3
        .zoom()
        .scaleExtent(ZOOM_THRESHOLD)
        .on("zoom", zoomHandler);

    function zoomHandler() {
        g.attr("transform", d3.zoomTransform(this));
    }

    // click callback
    function clickHandler(event, d, svg) {
        if (event.detail === 1) {
            fillDetailsBox(svg, d.properties.name);
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
        .fitSize([750, 350], emptymap_data);
    const path = d3.geoPath().projection(projection);
    
    const g = container
        .call(zoom).on("wheel.zoom", null) // remove scroll wheel zoom
        .append("g");
    
    const svg = g.append("g");
    svg.selectAll("path")
        .data(emptymap_data.features)
        .enter()
        .append("path")
            .attr("d", path)
            .style('fill', '#EEE')
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .on("click", function(event,d) { clickHandler(event, d, svg) });
    
    

};

function initDetailsGraph() {
    let container = d3.select("#country_scatter");

    // append the svg object to the body of the page
    const svg = container
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, 1])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // add legend
    const legend = container
        .append("svg")
            .attr("width", width / 1.75)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);
    for (let i = 0; i < displayFeatures.length; i++) {
        if (displayFeatures[i] !== 'co2_emissions') {
            legend.append("circle").attr("cx", 0).attr("cy", i * 30 - 3).attr("r", 6)
            .style("fill", color(displayFeatures[i]));
            legend.append("text").attr("x", 15).attr("y", i * 30).text(features[i].toString())
            .style("font-size", "15px").attr("alignment-baseline","middle");
        }
    }
}

const fillDetailsBox = function(svg, country) {
    let countryName = document.getElementById('country-name')
        if (countryName.innerHTML === country){
            // clicked on same country -> hide details
            countryName.innerHTML = '';
            visContainer.style.display = "none";
        } else {
            // show details of clicked country
            countryName.innerHTML = country;
            visContainer.style.display = "block";
            let flt = data_csv.filter(e => e.country === country)
            drawDots(svg, flt);
        }
}

function drawDots(svg, data) {
    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function (d) { return "dot " + d.feature } )
        .attr("cx", function (d) { return x(clamp(normalize(d.emissions, d.name, d.feature))); } )
        .attr("cy", function (d) { return y(clamp(normalize(d.value, d.name, d.feature))); } )
        .attr("r", 5)
        .style("fill", function (d) { return color(d.feature); } )
        .on("mouseover", highlight)
        .on("mouseleave", doNotHighlight );
}

function normalize(val, min, max) {
    return (val - min) / (max - min);
}

// TODO temporary solution while I try to understand the problem
function clamp(val) {
    if (val > 1) return 1;
    if (val < 0) return 0;
    return val;
}
