const ZOOM_THRESHOLD = [0.3, 7];
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;
const ZOOM_OUT_STEP = 1 / ZOOM_IN_STEP;
const FIRST_YEAR = 1950;


export const initMap = (container, data, parameter, colorScale) => {
    const zoom = d3
    .zoom()
    .scaleExtent(ZOOM_THRESHOLD)
    .on("zoom", zoomHandler);

    function zoomHandler() {
        g.attr("transform", d3.zoomTransform(this));
    }

    /*function mouseOutHandler(event, d) {
        d3.select(this).attr("fill", colorScale(d.properties.emitted_co2))
    }*/

    function clickHandler(event, d) {
        // TODO
    }

    function doubleClickHandler(event, d) {
        clickToZoom(ZOOM_IN_STEP);
    }

    function clickToZoom(zoomStep) {
        svg
            .transition()
            .duration(ZOOM_DURATION)
            .call(zoom.scaleBy, zoomStep);
    }

    const svg = d3.select(container);
    //.call(responsivefy);
    //.append("svg")
    //.attr("width", "100%")
    //.attr("height", "100%");


    const projection = d3
        .geoNaturalEarth1()
        .fitSize([750, 350], data);

    const path = d3.geoPath().projection(projection);

    const g = svg.call(zoom).on("wheel.zoom", null).append("g");
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
	const svg = d3.select(container);  
  
  	svg.selectAll('path')
   		.data(data.features)
   		.transition()
   		.delay(100)
   		.duration(500)
   		.style('fill', d => d.properties[parameter] != null &&
		   	d.properties[parameter][year] != null ? 
	   		colorScale(d.properties[parameter][year]) : "#AAA")

    svg.selectAll('title')
        .data(data.features)
        .text(d =>
            d.properties[parameter] != null &&
            d.properties[parameter][year] != null ? 
                d.properties.name + '\n' + d.properties[parameter][year]
                : d.properties.name + '\n' + 'No data');

}