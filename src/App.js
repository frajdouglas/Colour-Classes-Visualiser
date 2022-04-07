import logo from "./logo.svg";
import "./App.css";
import NaturalBreaksMap from "./Components/Map.component/NaturalBreaksMap";
import EqualIntervalsMap from "./Components/Map.component/EqualIntervalsMap";
import Histogram from "./Components/Histogram.component/Histogram";
import Upload from "./Components/Upload.component/Upload";
import { Jenks } from "jenks";
import { data } from "./Components/data";
import { useState, useEffect, useRef } from "react";
import {getEqualIntervals} from './Utils/equalIntervals'
function App() {
  const [uploadData, setUploadData] = useState(data);
  const [jenksClasses, setJenksClasses] = useState([
    0.1,2,3,4,5
  ]);
  const [equalIntervals, setEqualIntervals] = useState([
    0.1,2,3,4,5
  ]);
  console.log(jenksClasses);
  console.log(equalIntervals)
  useEffect(() => {
    let n_classes = 4;
    setJenksClasses(new Jenks(uploadData, n_classes).naturalBreak());
    setEqualIntervals(getEqualIntervals(data))
  }, []);
  return (
    <div className="App">
      <Upload/>
      <div className="MapContainer">
      <NaturalBreaksMap classes={jenksClasses} uploadData={uploadData} />
      <EqualIntervalsMap classes={equalIntervals} uploadData={uploadData} />
      </div>
      <Histogram />
    </div>
  );
}

export default App;
