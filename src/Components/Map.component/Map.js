import React from "react";
import { useState, useEffect, useRef } from "react";
import { lads } from "../Local_Authority_Districts";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../App.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnJham9uZG91Z2xhczk5IiwiYSI6ImNraTBoY2QxOTAwbmQydHFxaWJyNmJkazQifQ.axKM3VC_rhQviOkkND8v1Q";

const Map = ({ classes, uploadData, mapTitle }) => {
  const mapContainer = useRef();
  const [mapState, setMap] = useState(null);
  console.log(classes);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-2.2852642, 53.509843],
      zoom: 5,
    });
    map.on("load", () => {
      map.addSource("lads", {
        type: "geojson",
        // Use a URL for the value for the `data` property.
        data: lads,
      });
      map.addLayer({
        id: "lads-fill-layer",
        type: "fill",
        source: "lads",
        paint: {
          "fill-color": [
            "step",
            ["get", "SHAPE_Area"],
            // Number(classes[0]),
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
        id: "lads-layer",
        type: "line",
        source: "lads",
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
    <div>
        <div>{mapTitle}</div>
      {classes.map((item) => {
        return (
          <ul key={item}>
            <li>{item}</li>
          </ul>
        );
      })}
      <div
        ref={mapContainer}
        style={{ width: "45vw", height: "75vh", margin: "15px" }}
      />
    </div>
  );
};

export default Map;
