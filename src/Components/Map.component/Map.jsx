import React from "react";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../App.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnJham9uZG91Z2xhczk5IiwiYSI6ImNraTBoY2QxOTAwbmQydHFxaWJyNmJkazQifQ.axKM3VC_rhQviOkkND8v1Q";

const Map = ({ classes, geomData, mapTitle, colourArray, selectedMetric }) => {
  const mapContainer = useRef();

let stepColourArray = [
  "step",
  ["get", selectedMetric],
  colourArray[0],
]
for(let i = 1; i < classes.length; i++) {
  stepColourArray.push(Number(classes[i]))
  stepColourArray.push(colourArray[i])
}

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
        data: geomData,
      });
      map.addLayer({
        id: "geom-fill-layer",
        type: "fill",
        source: "geom",
        paint: {
          "fill-color": stepColourArray
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

    return () => {
      map.remove();
    };
  }, [classes, geomData]);
  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
