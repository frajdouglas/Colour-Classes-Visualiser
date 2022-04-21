import React from "react";
import { useState, useEffect, useRef } from "react";
import { lads } from "../Local_Authority_Districts";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../App.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnJham9uZG91Z2xhczk5IiwiYSI6ImNraTBoY2QxOTAwbmQydHFxaWJyNmJkazQifQ.axKM3VC_rhQviOkkND8v1Q";

const Map = ({ classes, geomData, mapTitle }) => {
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
            ["get", "SHAPE_Area"],
            "#2FF900",
            Number(classes[1]),
            "#46DD12",
            Number(classes[2]),
            "#5DC125",
            Number(classes[3]),
            "#74A638",
            Number(classes[4]),
            "#8B8A4B",
            Number(classes[5]),
            "#A26E5E",
            Number(classes[6]),
            "#B95371",
            Number(classes[7]),
            "#D03784",
            Number(classes[8]),
            "#E71B97",
            Number(classes[9]),
            "#FF00AA"
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
  }, [classes]);
  return (
      <div
        ref={mapContainer}
        style={{ width: "50vw", height: "50vh"}}
      />
  );
};

export default Map;
