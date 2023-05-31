import { loadMaps } from "./datamap.js";
import { loadStatsGraph } from "./stats_graph.js";

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		action();
	}
}

whenDocumentLoaded(() => {
	/* WORLD MAPS */
	loadMaps();

	/* STATS GRAPH */ 
	loadStatsGraph();
});




// resources for interactive world map
// https://github.com/ivan-ha/d3-hk-map
// https://medium.com/@ivan.ha/using-d3-js-to-plot-an-interactive-map-34fbea76bd78
// https://datamaps.github.io/
// https://vizhub.com/curran/d5ad96d1fe8148bd827a25230cc0f083
// https://towardsdatascience.com/using-d3-js-to-create-dynamic-maps-and-visuals-that-show-competing-climate-change-scenarios-for-bb0515d633d3