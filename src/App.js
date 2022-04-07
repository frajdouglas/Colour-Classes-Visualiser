import logo from "./logo.svg";
import "./App.css";
import Map from "./Components/Map.component/Map";
import Histogram from "./Components/Histogram.component/Histogram";
import { Jenks } from "jenks";
import { data } from "./Components/data";
import { useState, useEffect, useRef } from "react";


function App() {

    const [uploadData, setUploadData] = useState(data);
    const [jenksClasses, setJenksClasses] = useState([0]);
console.log(jenksClasses)
  useEffect(() => {
    let n_classes = 5;
    setJenksClasses(new Jenks(uploadData, n_classes).naturalBreak());
  }, []);
  return (
    <div className="App">
      <Map jenksClasses={jenksClasses} uploadData={uploadData}/>
      <Histogram/>
    </div>
  );
}

export default App;
