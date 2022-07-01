import "./App.css";
import Map from "./Components/Map.component/Map";
import { Legend } from "./Components/Legend.component/Legend";
import Upload from "./Components/Upload.component/Upload";
import { data } from "./Components/data";
import { Info } from "./Components/Info.component/Info";
import { lads } from "./Components/Local_Authority_Districts";
import { cas } from "./Components/Local_Authority_Districts copy";
import { useState, useEffect, useRef } from "react";
import {
  getEqualIntervals,
  getNaturalBreaks,
  getQuantiles,
} from "./Utils/classificationAlgorithms";
import {
  getDataFromGeojson,
  getMetricsListFromGeojson,
} from "./Utils/getDataFromGeojson";
import { uploadGeojson, getGeojson } from "./Utils/api";

function App() {
  const [geomData, setGeomData] = useState(lads);
  // const [uploadData, setUploadData] = useState(getDataFromGeojson(JSON.stringify(lads)));
  const [metricsList, setMetricsList] = useState(["SHAPE_Area","SHAPE_Length"]);
  const [selectedMetric, setSelectedMetric] = useState(metricsList[0]);
  const [numberOfClasses, setNumberOfClasses] = useState(10);
  const [jenksClasses, setJenksClasses] = useState([0.1, 2, 3, 4, 5]);
  const [equalIntervals, setEqualIntervals] = useState([0.1, 2, 3, 4, 5]);
  const [quantiles, setQuantiles] = useState([0.1, 2, 3, 4, 5]);
  const [selectedFile, setSelectedFile] = useState(JSON.stringify(lads));
  const [isFilePicked, setIsFilePicked] = useState(false);
  const fileObject = useRef({});

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

  useEffect(() => {
    setMetricsList(getMetricsListFromGeojson(selectedFile));
  }, [selectedFile]);

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
        setSelectedFile(e.target.result);
        setIsFilePicked(true);
      }
    };
  };

const handleDropdownChange = (e) => {
console.log(e.target.value)
let valuesToClassify = getDataFromGeojson(e.target.value,selectedFile)
console.log(valuesToClassify)
setSelectedMetric(e.target.value)
setJenksClasses(getNaturalBreaks(valuesToClassify, numberOfClasses));
    setEqualIntervals(getEqualIntervals(valuesToClassify, numberOfClasses));
    setQuantiles(getQuantiles(valuesToClassify, numberOfClasses));
}

console.log(metricsList)
  return (
    <div className="App">
      <div className="Toolbar">
        <div className="Title">Symbology Helper</div>
        <Info />
        <div className="Upload">
          <input type="file" name="file" onChange={handleChange} />
          {isFilePicked ? (
            <div>
              <p>Filetype: {JSON.parse(selectedFile).type}</p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          <select name="metricSelector" id="metricSelector" selected="OBJECTID" onChange={handleDropdownChange}>
            {metricsList.map((item) => {
              return <option value={item}>{item}</option>
            })}
          </select>

          {/* <div>
            <button onClick={handleSubmission}>Submit</button>
          </div> */}
        </div>
      </div>
      <div className="MapContainer">
        <div className="Map1">
          <Map
            classes={jenksClasses}
            geomData={JSON.parse(selectedFile)}
            mapTitle="Natural Breaks"
            colourArray={colourArray}
            selectedMetric={selectedMetric}
          />
          <div className="Legend1">
            <Legend
              mapTitle="Natural Breaks"
              classes={jenksClasses}
              colourArray={colourArray}
            />
          </div>
        </div>
        <div className="Map2">
          <Map
            classes={equalIntervals}
            geomData={JSON.parse(selectedFile)}
            mapTitle="Equal Intervals"
            colourArray={colourArray}
            selectedMetric={selectedMetric}
          />
          <div className="Legend2">
            <Legend
              mapTitle="Equal Intervals"
              classes={equalIntervals}
              colourArray={colourArray}
            />
          </div>
        </div>
        <div className="Map3">
          <Map
            classes={quantiles}
            geomData={JSON.parse(selectedFile)}
            mapTitle="Quantiles"
            colourArray={colourArray}
            selectedMetric={selectedMetric}
          />
          <div className="Legend3">
            <Legend
              mapTitle="Quantiles"
              classes={quantiles}
              colourArray={colourArray}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
