import logo from "./logo.svg";
import "./App.css";
import Map from "./Components/Map.component/Map";
import Histogram from "./Components/Histogram.component/Histogram";
import Upload from "./Components/Upload.component/Upload";
import { Jenks } from "jenks";
import { data } from "./Components/data";
import { useState, useEffect, useRef } from "react";

function App() {
  const [uploadData, setUploadData] = useState(data);
  const [jenksClasses, setJenksClasses] = useState([
    0.00035, 0.05508, 0.13621, 0.25262, 0.45994
  ]);
  const [equalIntervals, setEqualIntervals] = useState([
    0.0005, 2, 3, 4, 5
  ]);
  console.log(jenksClasses);
  useEffect(() => {
    let n_classes = 5;
    setJenksClasses(new Jenks(uploadData, n_classes).naturalBreak());
  }, []);
  return (
    <div className="App">
      <Upload/>
      <div className="MapContainer">
      <Map jenksClasses={jenksClasses} uploadData={uploadData} />
      <Map jenksClasses={equalIntervals} uploadData={uploadData} />
      </div>
      <Histogram />
    </div>
  );
}

export default App;
