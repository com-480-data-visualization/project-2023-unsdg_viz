export const loadStatsGraph =  function() { 
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 400, left: 200},
        width =800 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#stats_graph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/project-2023-unsdg_viz/master/milestone2/Plots_stats/stats_res_feats.csv").then(data => {
        // X axis
        var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.Features; }))
        .padding(0.2);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
        .style('color', '#FFF'); // Color of the x axis 

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([-1, 1])
        .range([ height, 0]);

        svg.append("g")
        .call(d3.axisLeft(y))
        .style('color', '#FFF'); // Color of the y axis 

        // create a tooltip
        var Tooltip = d3.select("#stats_graph")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "transparent") // Background of tooltip 
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style('color', '#FFF'); // color of tooltip 

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
            Tooltip
            .style("opacity", 1)
        }
        var mousemove = function(event, d) {
            d3.select(this).style("fill", "#012B4E"); // color of the bars when touched 

            // d.Features

            var newHtml = [];
            newHtml.push("Top Five Countries with values <\n>");
            newHtml.push("Last Five Countries with values");

            
            Tooltip
            .classed("hidden", false)
            .style("opacity", 1)
            .html(newHtml.join("\t"));
        }   

        var mouseleave = function(d) {
            d3.select(this).style("fill", "#69b3a2"); // color of the bars 

            Tooltip
            .style("opacity", 0)
        }

        // Bars
        svg.selectAll("mybar")
        .data(data)        
        .enter()
        .append("rect")
            .attr("class", function (d) {
                return "bar bar--" + (d.SpearmanR < 0 ? "negative" : "positive");
            })
            .attr("x", function(d) { return x(d.Features); })
            .attr("width", x.bandwidth())
            .attr("fill", "#69b3a2") // color of the bars 
            // no bar at the beginning thus: // always equal to 0 height - y(0);
            .attr("height", function(d) { return Math.abs(y(d.SpearmanR) - y(0)); })  
            .attr("y", function(d) { return y(Math.max(0, d["SpearmanR"])); })
        .on("click", function (d) {
            d3.selectAll('.allbars').style('fill', '#2296F3'); //fill all circles black
            d3.select(this).style("fill", "#012B4E"); //then fill this circle lightcoral
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

        // Animation
        /*svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return Math.abs(y(d.SpearmanR) - y(0)); })
        .attr("height", function(d) { return height - Math.abs(y(d.SpearmanR) - y(0)); })
        .delay(function(d,i){console.log(i) ; return(i*100)})*/
    })


}
