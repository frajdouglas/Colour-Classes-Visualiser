import "./App.css";
import Map from "./Components/Map.component/Map";
import { Legend } from "./Components/Legend.component/Legend";
import { Info } from "./Components/Info.component/Info";
import { lads } from "./Components/Local_Authority_Districts";
import { useState, useRef } from "react";
import {
  getEqualIntervals,
  getNaturalBreaks,
  getQuantiles,
} from "./Utils/classificationAlgorithms";
import {
  getDataFromGeojson,
  getMetricsListFromGeojson,
} from "./Utils/getDataFromGeojson";

function App() {
  const geometry = useRef(JSON.stringify(lads));
  const classParameters = useRef({
    selectedMetric: "SHAPE_Area",
    selectedNumberOfClasses: 10,
  });
  const metricsList = useRef(["SHAPE_Area", "SHAPE_Length"]);
  const [classDataObject, setClassDataObject] = useState({
    jenksData: [
      0.000347, 0.0259, 0.0584, 0.104, 0.163, 0.253, 0.341, 0.46, 0.787, 3.92,
    ],
    equalIntervalsData: [
      0.392, 0.784, 1.18, 1.57, 1.96, 2.35, 2.74, 3.14, 3.53, 4.92,
    ],
    quantilesData: [
      0.000347, 0.00529, 0.00978, 0.0142, 0.0217, 0.0356, 0.0471, 0.0729, 0.103,
      0.173,
    ],
  });

  const colourArray = [
    "#fff7fb",
    "#ece2f0",
    "#d0d1e6",
    "#a6bddb",
    "#67a9cf",
    "#3690c0",
    "#02818a",
    "#016c59",
    "#014636",
    "#023020",
  ];

  const handleChange = (e) => {
    const fileReader = new FileReader();
    const fileInput = e.target;
    fileReader.readAsText(fileInput.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const fileExtension = fileInput.files[0].name.split(".").at(-1);
      const allowedFileTypes = ["geojson"];
      if (!allowedFileTypes.includes(fileExtension)) {
        window.alert(`Files type must be ${allowedFileTypes.join(", ")}`);
        return false;
      } else {
        geometry.current = e.target.result
        metricsList.current = getMetricsListFromGeojson(geometry.current)
        let rawMetricData = getDataFromGeojson(
          classParameters.current.selectedMetric,
          geometry.current
        );
        let newJenksClasses = getNaturalBreaks(
          rawMetricData,
          classParameters.current.selectedNumberOfClasses
        );
        let newEqualIntervalsClasses = getEqualIntervals(
          rawMetricData,
          classParameters.current.selectedNumberOfClasses
        );
        let newQuantilesClasses = getQuantiles(
          rawMetricData,
          classParameters.current.selectedNumberOfClasses
        );
        let newDataObject = {
          jenksData: newJenksClasses,
          equalIntervalsData: newEqualIntervalsClasses,
          quantilesData: newQuantilesClasses,
        };
        setClassDataObject(newDataObject);
      }
    };
  };

  const handleMetricDropdownChange = (e) => {
    let metricSelection = e.target.value;
    classParameters.current.selectedMetric = metricSelection
    let rawMetricData = getDataFromGeojson(
      classParameters.current.selectedMetric,
      geometry.current
    );
    let newJenksClasses = getNaturalBreaks(
      rawMetricData,
      classParameters.current.selectedNumberOfClasses
    );
    let newEqualIntervalsClasses = getEqualIntervals(
      rawMetricData,
      classParameters.current.selectedNumberOfClasses
    );
    let newQuantilesClasses = getQuantiles(
      rawMetricData,
      classParameters.current.selectedNumberOfClasses
    );
    let newDataObject = {
      jenksData: newJenksClasses,
      equalIntervalsData: newEqualIntervalsClasses,
      quantilesData: newQuantilesClasses,
    };
    setClassDataObject(newDataObject);
  };

  const handleClassesDropdownChange = (e) => {
    let classesSelection = e.target.value;
    classParameters.current.selectedNumberOfClasses = classesSelection;
    let rawMetricData = getDataFromGeojson(
      classParameters.current.selectedMetric,
      geometry.current
    );
    let newJenksClasses = getNaturalBreaks(
      rawMetricData,
      classParameters.current.selectedNumberOfClasses
    );
    let newEqualIntervalsClasses = getEqualIntervals(
      rawMetricData,
      classParameters.current.selectedNumberOfClasses
    );
    let newQuantilesClasses = getQuantiles(
      rawMetricData,
      classParameters.current.selectedNumberOfClasses
    );
    let newDataObject = {
      jenksData: newJenksClasses,
      equalIntervalsData: newEqualIntervalsClasses,
      quantilesData: newQuantilesClasses,
    };
    setClassDataObject(newDataObject);
  };

  return (
    <div className="App">
      <div className="Toolbar">
        <div className="Title">Symbology Helper</div>
        <Info />
        <div className="UploadAndDropdowns">
          <input type="file" name="file" onChange={handleChange} />
          Select the metric to colour by:
          <select
            name="metricSelector"
            id="metricSelector"
            defaultValue="SHAPE_Area"
            onChange={handleMetricDropdownChange}
          >
            {metricsList.current.map((item) => {
              return (
                <option value={item} key={`${item}MetricsList`}>
                  {item}
                </option>
              );
            })}
          </select>
          Select the number of colour classes:
          <select
            name="numberOfClassesSelector"
            id="numberOfClassesSelector"
            defaultValue="10"
            onChange={handleClassesDropdownChange}
          >
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <div className="MapContainer">
        <div className="Map1">
          <Map
            classes={classDataObject.jenksData}
            geomData={JSON.parse(geometry.current)}
            mapTitle="Natural Breaks"
            colourArray={colourArray}
            selectedMetric={classParameters.current.selectedMetric}
          />
          <div className="Legend1">
            <Legend
              mapTitle="Natural Breaks"
              classes={classDataObject.jenksData}
              colourArray={colourArray}
            />
          </div>
        </div>
        {/* <div className="Map2">
          <Map
            classes={classDataObject.equalIntervalsData}
            geomData={JSON.parse(geometry.current)}
            mapTitle="Equal Intervals"
            colourArray={colourArray}
            selectedMetric={classParameters.current.selectedMetric}
          />
          <div className="Legend2">
            <Legend
              mapTitle="Equal Intervals"
              classes={classDataObject.equalIntervalsData}
              colourArray={colourArray}
            />
          </div>
        </div>
        <div className="Map3">
          <Map
            classes={classDataObject.quantilesData}
            geomData={JSON.parse(geometry.current)}
            mapTitle="Quantiles"
            colourArray={colourArray}
            selectedMetric={classParameters.current.selectedMetric}
          />
          <div className="Legend3">
            <Legend
              mapTitle="Quantiles"
              classes={classDataObject.quantilesData}
              colourArray={colourArray}
            /> 
          </div>
        </div>*/}
      </div>
    </div>
  );
}

export default App;
