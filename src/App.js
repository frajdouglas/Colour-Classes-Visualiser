import "./App.css";
import Map from "./Components/Map.component/Map";
import { Legend } from "./Components/Legend.component/Legend";
import { Info } from "./Components/Info.component/Info";
import { lads } from "./Components/Local_Authority_Districts";
import { useState, useEffect } from "react";
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
  const [metricsList, setMetricsList] = useState([
    "SHAPE_Area",
    "SHAPE_Length",
  ]);
  const [selectedMetric, setSelectedMetric] = useState("SHAPE_Area");
  const [valuesToClassify, setValuesToClassify] = useState();
  const [numberOfClasses, setNumberOfClasses] = useState(10);
  const [jenksClasses, setJenksClasses] = useState([
    0.000347, 0.0259, 0.0584, 0.104, 0.163, 0.253, 0.341, 0.46, 0.787, 3.92,
  ]);
  const [equalIntervals, setEqualIntervals] = useState([
    0.392, 0.784, 1.18, 1.57, 1.96, 2.35, 2.74, 3.14, 3.53, 4.92,
  ]);
  const [quantiles, setQuantiles] = useState([
    0.000347, 0.00529, 0.00978, 0.0142, 0.0217, 0.0356, 0.0471, 0.0729, 0.103,
    0.173,
  ]);
  const [selectedFile, setSelectedFile] = useState(JSON.stringify(lads));
  const [isFilePicked, setIsFilePicked] = useState(false);

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

  const handleMetricDropdownChange = (e) => {
    // console.log(e.target.value);
    // let valuesToClassify = getDataFromGeojson(e.target.value, selectedFile);
    // console.log(valuesToClassify);
    let selection = e.target.value
    setSelectedMetric(selection);
    setValuesToClassify(getDataFromGeojson(selection, selectedFile))
    setJenksClasses(getNaturalBreaks(valuesToClassify, numberOfClasses));
    setEqualIntervals(getEqualIntervals(valuesToClassify, numberOfClasses));
    setQuantiles(getQuantiles(valuesToClassify, numberOfClasses));
  };

  const handleClassesDropdownChange = (e) => {
    let classesSelection = e.target.value
    setNumberOfClasses(classesSelection);
    setJenksClasses(getNaturalBreaks(valuesToClassify, numberOfClasses));
    setEqualIntervals(getEqualIntervals(valuesToClassify, numberOfClasses));
    setQuantiles(getQuantiles(valuesToClassify, numberOfClasses));
  };
console.log(jenksClasses, numberOfClasses)
  return (
    <div className="App">
      <div className="Toolbar">
        <div className="Title">Symbology Helper</div>
        <Info />
        <div className="UploadAndDropdowns">
          <input type="file" name="file" onChange={handleChange} />
          {isFilePicked ? (
            <div>
              <p>Filetype: {JSON.parse(selectedFile).type}</p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          Select the metric to colour by:
          <select
            name="metricSelector"
            id="metricSelector"
            defaultValue="SHAPE_Area"
            onChange={handleMetricDropdownChange}
          >
            {metricsList.map((item) => {
              return <option value={item}>{item}</option>;
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
