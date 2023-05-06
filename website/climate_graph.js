export const loadClimateGraph = function() {
    // Define the SVG element
	// set the dimensions and margins of the graph. Set margins so that axis ticks can be seen
	var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 750 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg_co2 = d3.select("#climate_graph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g") // For the axis ticks
            .attr("class", "y-axis")
            .attr("transform", // Transform so that axis ticks are seeable
                "translate(" + margin.left + "," + margin.top + ")")
            .style('color', '#FFF');


    // Load the data from the csv file
    d3.csv('resources/temp.csv').then(data => {
        // Create dropdown menu
        // Extract unique values for dropdown menu
        var menuValues = Array.from(new Set(data.map(function (d) { return d.Entity; })));
        // Create select element
        var select = d3.select("#dropdown-menu")
            .append("select")
        // .attr("id", "menu")
        // Create options for select element
        var options = select.selectAll("option")
            .data(menuValues)
            .enter()
            .append("option")
            .text(function (d) { return d; });

        // Convert the data types
        data.forEach(d => {
            d.Year = new Date(+d.Year, 0, 1);
            d.Average = +d.Average;
            d.Upper = +d.Upper;
            d.Lower = +d.Lower;
        });

        // Filter the objects based on the class column
        var filteredData = data.filter(obj => obj.Entity === "Global");

        // function to built line chart
        function co2_chart(filteredData) {
            // Remove all child elements
            svg_co2.selectAll("*").remove();
            // Add X 
            var xscale = d3.scaleTime()
                .domain(d3.extent(filteredData, function (d) { return d.Year; }))
                .range([0, width]);
            svg_co2.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xscale));

            // Set range and data of y axis
            var yscale = d3.scaleLinear()
                .domain([d3.min(filteredData, d => d.Lower), d3.max(filteredData, d => d.Upper)])
                .range([height, 0]);

            // Set tick and grid of y axis
            var yAxis = d3.axisLeft(yscale)
                .tickSizeInner(-width)
                .tickPadding(10);
            svg_co2.append("g")
                .attr("class", "y-axis")
                .call((yAxis));

            // add styles to the grid lines
            svg_co2.selectAll(".y-axis line")
                .attr("stroke", "lightgrey")
                .attr("stroke-opacity", 0.7)
                .attr("stroke-width", 0.5);
            svg_co2.select(".y-axis .tick line")
                .filter(function (d) { return d === 4.0; })
                .attr("stroke", "blue");



            //Define the line
            const line_average = d3.line()
                .x(d => xscale(d.Year))
                .y(d => yscale(d.Average));


            const line_lower = d3.line()
                .x(d => xscale(d.Year))
                .y(d => yscale(d.Lower));

            const line_upper = d3.line()
                .x(d => xscale(d.Year))
                .y(d => yscale(d.Upper));


            // Add line                                      
            svg_co2.append("path")
                .datum(filteredData)
                .attr("d", line_lower)
                .attr("fill", "none")
                .attr("stroke", "lightgrey")
                .attr("stroke-width", 1);

            svg_co2.append("path")
                .datum(filteredData)
                .attr("d", line_upper)
                .attr("fill", "none")
                .attr("stroke", "lightgrey")
                .attr("stroke-width", 1);

            svg_co2.append("path")
                .datum(filteredData)
                .attr("d", line_average)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1);
        }
        // Create first graph
        co2_chart(filteredData);

        // Update graph depending on selection
        select.on("change", function () {
            var selectedValue = d3.select(this).property("value");
            // console.log("Selected value: " + selectedValue);
            filteredData = data.filter(obj => obj.Entity === selectedValue);
            var filteredData_range = filteredData.filter(obj => ((obj.Year.getFullYear() >= fromSlider.value) && (obj.Year.getFullYear() <= toSlider.value)));

            co2_chart(filteredData_range);
        });

        // Slider
        function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, controlSlider);
            if (from > to) {
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromSlider.value = from;
            }
        }

        function controlToInput(toSlider, fromInput, toInput, controlSlider) {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, controlSlider);
            setToggleAccessible(toInput);
            if (from <= to) {
                toSlider.value = to;
                toInput.value = to;
            } else {
                toInput.value = from;
            }
        }

        function controlFromSlider(fromSlider, toSlider, fromInput) {
            const [from, to] = getParsed(fromSlider, toSlider); // save values as integer
            fillSlider(fromSlider, toSlider, toSlider);
            if (from > to) { // ensures that left slider cannot be > than right slider
                fromSlider.value = to;
                fromInput.value = to;
            } else {
                fromInput.value = from;
            }
        }

        function controlToSlider(fromSlider, toSlider, toInput) {
            const [from, to] = getParsed(fromSlider, toSlider); // save values as integer
            fillSlider(fromSlider, toSlider, toSlider);
            setToggleAccessible(toSlider); // handles z-indexing for overlaps
            if (from <= to) {
                toSlider.value = to;
                toInput.value = to;
            } else { // ensures that left slider cannot be > than right slider
                toInput.value = from;
                toSlider.value = from;
            }
        }

        // Convert string to integer
        function getParsed(currentFrom, currentTo) {
            const from = parseInt(currentFrom.value, 10);
            const to = parseInt(currentTo.value, 10);
            return [from, to];
        }

        function fillSlider(from, to, controlSlider) {
            var sliderColor = '#C6C6C6';
            var rangeColor = 'blue';
            const rangeDistance = to.max - to.min;
            const fromPosition = from.value - to.min;
            const toPosition = to.value - to.min;
            controlSlider.style.background =
                `linear-gradient(to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
        ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
        ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
        }

        function setToggleAccessible(currentTarget) {
            // set zIndex of toSlider element bigger than zIndex of fromSlider in situation when toSlider has value zero.
            const toSlider = document.querySelector('#toSlider');
            if (Number(currentTarget.value) <= 0) {
                toSlider.style.zIndex = 2;
            } else {
                toSlider.style.zIndex = 0;
            }
        }

        const fromSlider = document.querySelector('#fromSlider');
        const toSlider = document.querySelector('#toSlider');
        const fromInput = document.querySelector('#fromInput');
        const toInput = document.querySelector('#toInput');
        fillSlider(fromSlider, toSlider, toSlider);
        setToggleAccessible(toSlider);

        function handleSliderInput() {
            controlFromSlider(fromSlider, toSlider, fromInput);
            controlToSlider(fromSlider, toSlider, toInput);
            // console.log('changed from-value', fromSlider.value)
            //console.log('changed to-value', toSlider.value)

            var filteredData_range = filteredData.filter(obj => ((obj.Year.getFullYear() >= fromSlider.value) && (obj.Year.getFullYear() <= toSlider.value)));
            // console.log(filteredData_range)
            co2_chart(filteredData_range);

            //filteredData = filteredData.filter(obj => ((obj.Year.getFullYear() >= fromSlider.value)));
            //co2_chart(filteredData);

        }

        fromSlider.oninput = handleSliderInput;
        //fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
        toSlider.oninput = handleSliderInput;
        //toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);

        fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
        toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
    });
}