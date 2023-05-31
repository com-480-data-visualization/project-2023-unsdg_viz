// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


export const loadCountryDetails = function(rawData, features) {
    const data = parseData(rawData, features);
    const color = d3.scaleOrdinal()
        .domain(features)
        .range(d3.schemeSet3);

    // clear container
    let container = d3.select("#country_scatter");

    container.selectAll("*").remove();

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


    // Highlight the specie that is hovered
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

    // Highlight the specie that is hovered
    const doNotHighlight = function(event,d){
        d3.selectAll(".dot")
        .transition()
        .duration(200)
        .style("fill", d => color(d.feature))
        .attr("r", 5 )
    }

    // Add dots
    svg.append('g')
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
        .on("mouseleave", doNotHighlight )

    // add legend
    const legend = container
        .append("svg")
            .attr("width", width / 1.75)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);
    for (let i = 0; i < features.length; i++) {
        if (features[i] !== 'co2_emissions') {
            legend.append("circle").attr("cx", 0).attr("cy", i * 30 - 3).attr("r", 6)
            .style("fill", color(features[i]));
            legend.append("text").attr("x", 15).attr("y", i * 30).text(features[i].toString())
            .style("font-size", "15px").attr("alignment-baseline","middle");
        }
    }
}

function parseData(data, features) {
    let parsedData = [];
    // console.log(data);

    data.forEach(e => {
        const year = e.year;
        // if emissions exist, normalize value
        if (e.co2_emissions !== null && e.co2_emissions !== "") {
            // for each feature add an entry
            // {year,feature,emisisons,feature_value}
            features.forEach(f => {
                if (e[f.toString()] !== null && e[f.toString()] !== "" &&
                    f.toString() !== 'co2_emissions') {
                    let entry = {};
                    entry.year = year;
                    entry.feature = f;
                    entry.emissions = e.co2_emissions;
                    entry.value = e[f.toString()];

                    parsedData.push(entry);
                }
            });
        }
    });

    // max values for each feature
    let maxValues = {};
    features.forEach(f => {
        if (f.toString() !== 'co2_emissions') {
            maxValues[f.toString()] = d3.max(
                parsedData.filter(e => e.feature === f), function(d) {
                    return d.value;
            }); 
        }
    });
    maxValues['co2_emissions'] = d3.max(
        parsedData, function(d) { return d.emissions; });

    let minValues = {};
    features.forEach(f => {
        if (f.toString() !== 'co2_emissions') {
            minValues[f.toString()] = d3.min(
                parsedData.filter(e => e.feature === f), function(d) {
                    console.log(f + ' ' + d.value);
                    return d.value;
            });
        }
    });
    minValues['co2_emissions'] = d3.min(
        parsedData, function(d) { return d.emissions; });
    
    console.log(maxValues);
    console.log(minValues);

    parsedData.forEach(e => {
        e.emissions = clamp(normalize(e.emissions,
            minValues['co2_emissions'], maxValues['co2_emissions']));
        e.value = clamp(normalize(e.value,
            minValues[e.feature], maxValues[e.feature]));

        //if (e.value > 1 || e.value < 0) {
        //    console.log(e.feature + ' ' + e.value);
        //}
    });

    return parsedData;
}

function normalize(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

// TODO temporary solution while I try to understand the problem
function clamp(val) {
    if (val > 1) return 1;
    if (val < 0) return 0;
    return val;
}