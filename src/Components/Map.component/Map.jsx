import React from "react";
import { useState, useEffect, useRef } from "react";
import { lads } from "../Local_Authority_Districts";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJham9uZG91Z2xhczk5IiwiYSI6ImNraTBoY2QxOTAwbmQydHFxaWJyNmJkazQifQ.axKM3VC_rhQviOkkND8v1Q'

const Map = ({jenksClasses, uploadData}) => {
  const mapContainer = useRef();
  const [mapState, setMap] = useState(null);
console.log(jenksClasses)
  // const [uploadData, setUploadData] = useState([1]);
  // // let data = [1, 2, 5, 15, 45, 89.3, 112, 31, 120, 0.5];
  // let n_classes = 5;

  // useEffect(() => {
  //   setUploadData(new Jenks(data, n_classes).naturalBreak());
  // }, []);

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
            Number(jenksClasses[0]),
            "#f1eef6",
            Number(jenksClasses[1]),
            "#d7b5d8",
            Number(jenksClasses[2]),
            "#df65b0",
            Number(jenksClasses[3]),
            "#dd1c77",
            Number(jenksClasses[4]),
            "#980043"
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
  }, []);
  return (
    <div>
      <div>
        {jenksClasses.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
      <div
        ref={mapContainer}
        className="MapContainer"
        style={{ width: "50vw", height: "75vh", margin: "15px" }}
      />
    </div>
  );
};

export default Map;
