import React from "react";
import { useState, useEffect, useRef } from "react";
import { lads } from "../Local_Authority_Districts";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../App.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnJham9uZG91Z2xhczk5IiwiYSI6ImNraTBoY2QxOTAwbmQydHFxaWJyNmJkazQifQ.axKM3VC_rhQviOkkND8v1Q";

const EqualIntervalsMap = ({ classes, uploadData }) => {
  const mapContainer = useRef();
  const [mapState, setMap] = useState(null);
  console.log(classes);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-2.2852642, 53.509843],
      zoom: 9,
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
            "interpolate",
            ["linear"],
            ["get", "SHAPE_Area"],
            Number(classes[0]),
            "#f1eef6",
            Number(classes[1]),
            "#d7b5d8",
            Number(classes[2]),
            "#df65b0",
            Number(classes[3]),
            "#dd1c77",
            Number(classes[4]),
            "#980043",
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

export default EqualIntervalsMap;
