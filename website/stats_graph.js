export const loadStatsGraph = () => {
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 220, left: 100},
        width = 700 - margin.left - margin.right,
        height = 620 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#stats_graph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/project-2023-unsdg_viz/master/website/resources/stats_res_feats.csv").then(data => {
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
        .style('color', '#000'); // Color of the x axis 

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([-1, 1])
        .range([ height, 0]);

        svg.append("g")
        .call(d3.axisLeft(y))
        .style('color', '#000'); // Color of the y axis 

        // create a tooltip
        var tooltip = d3.select("#stats_tooltip");

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(event, d) {
            getDetails(event, d, tooltip)

            tooltip
            .style('left', event.pageX + 'px')
            .style('top', event.pageY + 'px')

            tooltip
            .transition()
            .duration(200)
            .style("opacity", "1");
        }
        var mousemove = function(event, d) {
            d3.select(this).style("fill", "#012B4E"); // color of the bars when touched 
            // d3.select(x(d.Features)).style('color', '#FFF'); // color of x label when touched
                      
            
        }   

        var mouseleave = function(d) {
            d3.select(this).style("fill", "#69b3a2"); // color of the bars 
            tooltip
            .transition()
            .duration(200)
            .style("opacity", "0");
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
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    });

    // Get the tops data 
    let data_top;

    d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/project-2023-unsdg_viz/master/website/resources/stats_res_tops.csv").then(dt => {
        data_top = dt
    });

    var parseData = function(data) {
        let parsedData = [];
        data.forEach(e => {
            const feat = e.features;
            // Get the top 5 and last 5 
            let entry = {};
            entry.top5 = e.top5;
            entry.last5 = e.last5;

            parsedData.push(entry);
            });

        return parsedData;
    }

    // Function to show the tops in tooltip 
    var getDetails = function(event, d, container) {
        // show details of clicked country
        let flt = data_top.filter(e => e.features === d.Features)
        const data = parseData(flt);        
        //console.log(data[0].top5)
        var newHtml = [];
        newHtml.push("<p>Top Five Countries: ");
        newHtml.push(data[0].top5);
        newHtml.push("<\p>")
        newHtml.push("<p>Last Five Countries: ");
        newHtml.push(data[0].last5);
        newHtml.push("<\p>")
        
        container
        .style("opacity", 1)
        .html(newHtml.join("\n"))
        
    }

}









