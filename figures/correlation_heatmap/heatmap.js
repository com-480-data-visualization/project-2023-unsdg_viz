
// Correlation heatmap SVG------------------------------------
// Define variable for color gradient of heatmap
const color4 = "#ed492d"
const color3 = "#F4F267"
const color2 = "#8DE9F0"
const color1 = "#3A27AE"

// set the dimensions and margin_corrs of the graph
var margin_corr = { top: 50, right: 0, bottom: 170, left: 200 },
    width_corr = 500 - margin_corr.left - margin_corr.right,
    height_corr = 530 - margin_corr.top - margin_corr.bottom;

// append the correlation_matrix object to the body of the page
var correlation_matrix = d3.select("#correlation_heatmap")
    .append("svg")
    .attr("width", width_corr + margin_corr.left + margin_corr.right)
    .attr("height", height_corr + margin_corr.top + margin_corr.bottom)
    .append("g") //  create a new SVG group element inside the previously created SVG element
    .attr("transform",
        "translate(" + margin_corr.left + "," + margin_corr.top + ")");

// Create dropdown menu-------------------------------------------
// Extract unique values for dropdown menu
var menuValues = ["2015 - 2021", "2010 - 2015", "2005 - 2010", "2002 - 2005"];
// Create select element
var select_menu = d3.select("#dropdown-menu_correlation")
    .append("select")
var options = select_menu.selectAll("option")
    .data(menuValues)
    .enter()
    .append("option")
    .text(function (d) { return d; });



// Build first graph------------------------------------

d3.csv("resources/viz_df_p4.csv")
    .then(function (data) {
        corr_chart(data);

    })
    .catch(function (error) {
        console.error("An error occurred while loading the CSV file:", error);
    });

// Update graph depending on selection---------------------
select_menu.on("change", function () {
    // Remove all child elements
    correlation_matrix.selectAll("*").remove();
    var selectedValue = d3.select(this).property("value");

    if (selectedValue == "2010 - 2015") {
        d3.csv("resources/viz_df_p3.csv")
            .then(function (data) {
                corr_chart(data);
            })
    } else if (selectedValue == "2005 - 2010") {
        d3.csv("resources/viz_df_p2.csv")
            .then(function (data) {
                corr_chart(data);
            })
    } else if (selectedValue == "2002 - 2005") {
        d3.csv("resources/viz_df_p1.csv")
            .then(function (data) {
                corr_chart(data);
            })
    } else {
        d3.csv("resources/viz_df_p4.csv")
            .then(function (data) {
                corr_chart(data);
            })
    }
});

// Given data
const data = [
    { y_axis: 'Revenue', x_axis: '', value: '' },
    { y_axis: 'Revenue', x_axis: 'FDI', value: '0.053129735040847254' },
    { y_axis: 'Revenue', x_axis: 'Growth rate', value: '0.0022134001978587406' },
    { y_axis: 'Revenue', x_axis: 'CO2 emission', value: '-0.01677827445312875' },
    { y_axis: 'Revenue', x_axis: 'GDP', value: '0.06335451301297643' },
    { y_axis: 'Revenue', x_axis: 'Mortality rate', value: '-0.03036350356657519' },
    { y_axis: 'Revenue', x_axis: 'Air pollution', value: '-0.25719467486276604' },
    { y_axis: 'Revenue', x_axis: 'Renewable energy', value: '-0.06137199097010156' },
    { y_axis: 'FDI', x_axis: '', value: '' },
    { y_axis: 'FDI', x_axis: 'FDI', value: '' },
    { y_axis: 'FDI', x_axis: 'Growth rate', value: '0.07726139383951637' },
    { y_axis: 'FDI', x_axis: 'CO2 emission', value: '0.5786355695760714' },
    { y_axis: 'FDI', x_axis: 'GDP', value: '0.6313719675044197' },
    { y_axis: 'FDI', x_axis: 'Mortality rate', value: '-0.268463468869044' },
    { y_axis: 'FDI', x_axis: 'Air pollution', value: '-0.1708720462840437' },
    { y_axis: 'FDI', x_axis: 'Renewable energy', value: '-0.0800138482892717' }
];

// const x_axis_values = [...new Set(data.map(obj => obj.x_axis))];
const x_axis_values = [...new Set(data.map(obj => obj.x_axis))];

console.log(x_axis_values);
// Output: ['', 'FDI', 'Growth rate', 'CO2 emission', 'GDP', 'Mortality rate', 'Air pollution', 'Renewable energy']

// Building graph- function ------------------------------------
function corr_chart(data) {
    // Labels of row and columns -> unique identifier of the column called 'x_axis' and 'y_axis'
    var x_data = [...new Set(data.map(obj => obj.x_axis))];
    var y_data = [...new Set(data.map(obj => obj.y_axis))];

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([0, width_corr])
        .domain(x_data)
        .padding(0.05);
    correlation_matrix.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height_corr + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .style("text-anchor", "end")
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
    correlation_matrix     // Remove vertical matrix line
        .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([height_corr, 0])
        .domain(y_data)
        .padding(0.05);
    correlation_matrix.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove() // remove y axis line

    // Build color scale
    var myColor = d3.scaleLinear()
        .range([color1, color2, color3, color4])
        .domain([-1, -0.01, 0.01, 1]);

    // create a tooltip: div that appears containing details about correlation heatmap
    var tooltip = d3.select("#correlation_heatmap")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("left", 0)
        .style("top", 0)

    // Appear tooltip and add black frame around heatmap rectangle
    const mouseover = (event, d) => {
        console.log('hover')
        const [x, y] = d3.pointer(event, d);
        tooltip
            .style("opacity", 1)
            .html(`Correlation: ${Math.round(d.value * 1000) / 1000}<br>x: ${d.x_axis}<br>y: ${d.y_axis}`)
            .style("left", `${x + 70}px`)
            .style("top", `${y}px`);
        d3.select(event.currentTarget)
            .style("stroke", "black")
            .attr("stroke-width", 2);
    };


    const mousemove = (event, d) => {
        console.log('hmoveover')
        const [x, y] = d3.pointer(event); //mouse coordinates relative to the container element.
        tooltip
            .style("opacity", 1)
            .html(`Correlation: ${Math.round(d.value * 1000) / 1000}<br>x: ${d.x_axis}<br>y: ${d.y_axis}`)
            .style("left", `${x + 70}px`)
            .style("top", `${y}px`);
    };






    // remove tooldiv and black frame around heatmap rectangle
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "#404040")
            .attr("stroke-width", 1)
    }

    // add the heatmap rectangle
    correlation_matrix.selectAll()
        .data(data, function (d) { return d.x_axis + ':' + d.y_axis; }) // Call and insert data for viz
        .enter()
        .filter(function (d) {
            return d.value; // filter empty values
        })
        .append("rect")
        .attr("x", function (d) { return x(d.x_axis) })
        .attr("y", function (d) { return y(d.y_axis) })
        .attr("rx", 4) // defines shape of rectangle
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return myColor(d.value) })
        .attr("stroke", "#404040")
        .attr("stroke-width", 1)
        .style("opacity", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

}


// Color bar--------------------------------------------------------------------
// Define variables 
var ymargin_bar = 10 // Top margin of bar and scale

var margin_bar = { top: 0, right: 0, bottom: 170, left: 100 },
    width_bar = 500 - margin_bar.left - margin_bar.right,
    height_bar = 500 - margin_bar.top - margin_bar.bottom;

var colorbar = d3.select("#correlation_heatmap")
    .append("svg")
    .attr("width", width_bar + margin_bar.left + margin_bar.right)
    .attr("height", height_bar + margin_bar.top + margin_bar.bottom)
    .append("g") //  create a new SVG group element inside the previously created SVG element
    .attr("transform",
        "translate(" + margin_bar.left + "," + margin_bar.top + ")");

var colorScale = d3.scaleLinear()
    .range([color4, color3, color2, color1]) // inverse of proper colorange of heatmap because colorbar is filled y-high to y-low. 
    .domain([-1, -0.01, 0.01, 1]);

var rect = colorbar.append("rect")
    .attr("x", 50)
    .attr("y", ymargin_bar)
    .attr("stroke", "#404040")
    .attr("width", 30)
    .attr("height", height_bar)

rect.style("fill", "url(#gradient)");

var gradient = colorbar.append("defs") // Create gradient, to be filled later
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

gradient.selectAll("stop") // Update gradient with colors according to colorScale
    .data(colorScale.ticks())
    .enter().append("stop")
    .attr("offset", function (d) { return ((d + 1) / 2) * 100 + "%"; }) // Recalculates ticks from -1 to 1 -> 0 to 1
    .attr("stop-color", function (d) { return colorScale(d); });

// Create color bar label
// Define the scale for the axis
var axisScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([height_bar, 0]);

// Create the axis
var axis = d3.axisRight(axisScale)
// .ticks(5); // number of labels

// Add the axis to the svg element
colorbar.append("g")
    .attr("transform", "translate(100," + ymargin_bar + ")") // Move to the right side of the bar and align y
    .call(axis);
