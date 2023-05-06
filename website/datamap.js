const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;
const FIRST_YEAR = 1950;


export const initMap = (container, detailsContainer, data, parameter, colorScale) => {
    /* event handlers */
    const zoom = d3
    .zoom()
    .scaleExtent(ZOOM_THRESHOLD)
    .on("zoom", zoomHandler);

    function zoomHandler() {
        g.attr("transform", d3.zoomTransform(this));
    }

    function clickHandler(event, d) {
        let countryName = document.getElementById('country-name')
        // TODO refactor once we know exactly what data to put
        if (countryName.innerHTML === d.properties.name){
            // clicked on same country -> hide details
            countryName.innerHTML = '';
            detailsContainer.style.display = "none";
        } else {
            // show details of clicked country
            countryName.innerHTML = d.properties.name;
            detailsContainer.style.display = "block";
            detailsContainer.scrollIntoView();
        }
    }

    function doubleClickHandler(event, d) {
        clickToZoom(ZOOM_IN_STEP);
    }

    function clickToZoom(zoomStep) {
        container
            .transition()
            .duration(ZOOM_DURATION)
            .call(zoom.scaleBy, zoomStep);
    }


    /* fill map with data */
    const projection = d3
        .geoNaturalEarth1()
        .fitSize([750, 350], data);

    const path = d3.geoPath().projection(projection);

    const g = container.call(zoom).on("wheel.zoom", null).append("g");
    g.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("d", path)
            .style("fill", d => d.properties[parameter] != null &&
                    d.properties[parameter][FIRST_YEAR] != null ? 
                colorScale(d.properties[parameter][FIRST_YEAR]) : "#AAA")
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .on("click", clickHandler)
            .on("dblclick", doubleClickHandler)
        .append('title')
            .text(d => 
                d.properties[parameter] != null &&
                d.properties[parameter][FIRST_YEAR] != null ? 
                    d.properties.name + '\n' + d.properties[parameter][FIRST_YEAR]
                    : d.properties.name + '\n' + 'No data');

}

export const updateMap = (container, data, year, parameter, colorScale) => {
	container.selectAll('path')
   		.data(data.features)
   		.transition()
   		.delay(100)
   		.duration(500)
   		.style('fill', d => d.properties[parameter] != null &&
		   	d.properties[parameter][year] != null ? 
	   		colorScale(d.properties[parameter][year]) : "#AAA")

    container.selectAll('title')
        .data(data.features)
        .text(d =>
            d.properties[parameter] != null &&
            d.properties[parameter][year] != null ? 
                d.properties.name + '\n' + d.properties[parameter][year]
                : d.properties.name + '\n' + 'No data');

}