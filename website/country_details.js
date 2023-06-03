import { emptymap_data } from "./resources/emptymap.js"

/* ### CONST VALUES ### */

// set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 50, left: 60},
    width = 420 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const MAP_SIZE = [700, 350];
const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;
const FEATURE_NAMES = {
    'revenue': 'Gov. revenue proportion of GDP',
    'fdi': 'FDI',
    'growth_rate': 'Annual growth rate',
    'co2_emissions': 'Annual CO₂ emissions',
    'gdp': 'GDP (constant 2015 US$)',
    'mortality': 'Mortality rate',
    'air_pollution': 'Air pollution',
    'literacy_rate':'Literacy rate',
    'renewable':'Renewable energy rate'
};
const displayFeatures = [
    'revenue',
    'fdi',
    'growth_rate',
    'gdp',
    'mortality',
    'air_pollution',
    'literacy_rate',
    'renewable'
];
const color = d3.scaleOrdinal()
    .domain(displayFeatures)
    .range(d3.schemeSet3);

// json { country { feature { min, max } } }
let minMaxValues = {};
let graphSvg; // svg of the graph
// graph axes
let x;
let y;
// data parsed and filtered
let parsedData;


/* ### CALLBACKS ### */

/* Highlight the feature that is being hovered */
const highlight = function(event,d){
    // select all dots, make them small and grey
    d3.selectAll(".dot")
        .transition()
        .duration(200)
        .style("fill", "lightgrey")
        .attr("r", 3)

    // select all dots of the selected feature, make them big and colored
    d3.selectAll("." + d.feature)
        .transition()
        .duration(200)
        .style("fill", color(d.feature))
        .attr("r", 7)
}

/* remove highlight of feature that was hovered */
const doNotHighlight = function(event,d){
    // select all dots, make them regular size and normal color
    d3.selectAll(".dot")
        .transition()
        .duration(200)
        .style("fill", d => color(d.feature))
        .attr("r", 5 )
}


/* ### VIZ LOADER */

export const loadCountryDetailsViz = function() {
    // wait for load of csv files
    Promise.all([
        d3.csv("resources/countries_min.csv"),
        d3.csv("resources/countries_max.csv"),
    ]).then(function(files) {
        const minData = files[0];
        const maxData = files[1];

        // fill minMaxValues with loaded data
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

        // load full detail data
        d3.csv('resources/worldmap_csv.csv').then(csvData => {
            // draw the map only when detail data is ready
            initMap();

            // parse and filter data
            parsedData = parseData(csvData);

            // draw country details
            initDetailsGraph();
        });
    });
}

/* parse and filter data */
function parseData(rawData) {
    // keep only data after yeaer 2000
    rawData = rawData.filter(function(d) { return d.year >= 2000; });

    let data = [];
    const features = Object.keys(FEATURE_NAMES);

    rawData.forEach(e => {
        const year = e.year;
        // if emissions exist, normalize value
        if (e.co2_emissions !== null && e.co2_emissions !== "") {
            // for each feature, if value exists add an entry
            displayFeatures.forEach(f => {
                if (e[f.toString()] !== null && e[f.toString()] !== "") {
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

    // normalize data
    data.map(e => {
        e.emissions = normalize(e.emissions,
            minMaxValues[e.country]['co2_emissions'].min,
            minMaxValues[e.country]['co2_emissions'].max);
        e.value = normalize(e.value,
            minMaxValues[e.country][e.feature].min,
            minMaxValues[e.country][e.feature].max);
    });

    return data;
}


/* initialize selection map */
function initMap() {
    const container = d3.select('#select_map_container');

    // event handlers
    const zoom = d3
        .zoom()
        .scaleExtent(ZOOM_THRESHOLD)
        .on("zoom", zoomHandler);

    function zoomHandler() {
        g.attr("transform", d3.zoomTransform(this));
    }

    // click callbacks
    function clickHandler(event, d) {
        if (event.detail === 1) {
            fillDetailsBox(d.properties.name);
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

    // draw map
    const projection = d3
        .geoNaturalEarth1()
        .fitSize(MAP_SIZE, emptymap_data);
    const path = d3.geoPath().projection(projection);
    
    const g = container
        .call(zoom).on("wheel.zoom", null) // remove scroll wheel zoom
        .append("g");
    
    g.append("g")
        .selectAll("path")
        .data(emptymap_data.features)
        .enter()
        .append("path")
            .attr("d", path)
            .style('fill', '#EEE')
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .on("click", clickHandler );

};


/* draw empty graph and legend */
function initDetailsGraph() {
    let container = d3.select("#country_scatter");

    // append the svg object to the body of the page
    graphSvg = container
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    x = d3.scaleLinear()
        .domain([0, 1])
        .range([ 0, width ]);
    graphSvg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
    
    // append co2 emissions axis label
    const labelX = width / 2 - 60;
    const labelY = height + 40; 
    graphSvg.append("text")
        .attr("transform", `translate(${labelX}, ${labelY})`)
        .text("CO2 emissions");

    // Add Y axis
    y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
    graphSvg.append("g")
        .call(d3.axisLeft(y));

    // add legend
    const legend = d3.select("#country_legend")
        .append("svg")
            .attr("width", width )
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                `translate(6, ${margin.top})`);

    // append all display features to legend
    for (let i = 0; i < displayFeatures.length; i++) {
        legend.append("circle")
            .attr("cx", 0).attr("cy", i * 30).attr("r", 6)
            .style("fill", color(displayFeatures[i]));
        legend.append("text")
            .attr("x", 15).attr("y", i * 30 + 6)
            .text(FEATURE_NAMES[displayFeatures[i].toString()])
            .style("font-size", "15px")
            .attr("alignment-baseline","middle");
    }
}


/* update graph based on selected country */
function fillDetailsBox(country) {
    // clear dots
    graphSvg.selectAll('.dot').remove();

    let countryName = document.getElementById('country_name')
    if (countryName.innerHTML === country){
        // clicked on same country -> hide details
        countryName.innerHTML = 'No Country Selected';
    } else {
        // set name of country
        countryName.innerHTML = country;
        // get data for selected country
        let flt = parsedData.filter(e => e.country === country);
        // draw dots for country data
        drawDots(flt);
    }
}


/* draw dots on the graph given the data */
function drawDots(data) {
    // Add dots
    graphSvg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", function (d) { return "dot " + d.feature } )
            .attr("cx", function (d) { return x(d.emissions); } )
            .attr("cy", function (d) { return y(d.value); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.feature); } )
            .on("mouseover", highlight)
            .on("mouseleave", doNotHighlight);
}


/* ### HELPER METHODS ### */

/* normalize a value given min and max */
function normalize(val, min, max) {
    return (val - min) / (max - min);
}