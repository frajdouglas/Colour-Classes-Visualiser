import React from "react";
import { useState, useEffect, useRef } from "react";
import { lads } from "../Local_Authority_Districts";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../App.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnJham9uZG91Z2xhczk5IiwiYSI6ImNraTBoY2QxOTAwbmQydHFxaWJyNmJkazQifQ.axKM3VC_rhQviOkkND8v1Q";

const Map = ({ classes, geomData, mapTitle, colourArray, selectedMetric }) => {
  const mapContainer = useRef();
  const [mapState, setMap] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-2.2852642, 53.509843],
      zoom: 5,
    });
    map.on("load", () => {
      map.addSource("geom", {
        type: "geojson",
        // Use a URL for the value for the `data` property.
        data: geomData,
      });
      map.addLayer({
        id: "geom-fill-layer",
        type: "fill",
        source: "geom",
        paint: {
          "fill-color": [
            "step",
            ["get", selectedMetric],
            colourArray[0],
            Number(classes[1]),
            colourArray[1],
            Number(classes[2]),
            colourArray[2],
            Number(classes[3]),
            colourArray[3],
            Number(classes[4]),
            colourArray[4],
            Number(classes[5]),
            colourArray[5],
            Number(classes[6]),
            colourArray[6],
            Number(classes[7]),
            colourArray[7],
            Number(classes[8]),
            colourArray[8],
            Number(classes[9]),
            colourArray[9],
          ],
        },
      });
      map.addLayer({
        id: "geom-outline",
        type: "line",
        source: "geom",
        paint: {
          "line-color": "#FFFFFF",
        },
      });
    });
    setMap(map);

    return () => {
      map.remove();
    };
  }, [classes, geomData]);
  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
