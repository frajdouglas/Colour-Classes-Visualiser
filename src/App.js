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
import { getDataFromGeojson } from "./Utils/getDataFromGeojson";
import { uploadGeojson, getGeojson } from "./Utils/api";

function App() {
  const [geomData, setGeomData] = useState(lads);
  const [uploadData, setUploadData] = useState(getDataFromGeojson(lads));
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
    let n_classes = 10;
    // setUploadData(getDataFromGeojson(lads));
    setJenksClasses(getNaturalBreaks(uploadData, n_classes));
    setEqualIntervals(getEqualIntervals(uploadData, n_classes));
    setQuantiles(getQuantiles(uploadData, n_classes));
  }, [uploadData]);

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target", e.target);
      // const fileExtension = e.target.files[0].name.split(".").at(-1);
      // const allowedFileTypes = ["geojson"];
      // if (!allowedFileTypes.includes(fileExtension)) {
      //   window.alert(`Files type must be ${allowedFileTypes.join(", ")}`);
      //   return false;
      // } else {
        setSelectedFile(e.target.result);
        setIsFilePicked(true);
      // }
    };
  };

  const handleSubmission = (e) => {
    console.log("submit");
  };

  console.log(selectedFile);
  // const changeHandler = (event) => {
  //   // console.log(event.target.files);
  //   const fileInput = event.target;
  //   // console.log(fileInput)

  //   // fileInput.onchange = () => {
  //     const reader = new FileReader()
  //     reader.onload = (e) => {
  //       // console.log(e.target.result)
  //       fileObject.current = e.target.result
  //       // console.log(fileObject.current)

  //     }
  //     for (let file of fileInput.files) {
  //       reader.readAsText(file)
  //     }
  //   // }

  //   // const fileExtension = event.target.files[0].name.split(".").at(-1);
  //   // const allowedFileTypes = ["geojson"];
  //   // if (!allowedFileTypes.includes(fileExtension)) {
  //   //   window.alert(`Files type must be ${allowedFileTypes.join(", ")}`);
  //   //   return false;
  //   // }
  //   // console.log(event.target);
  //   setSelectedFile(event.target.files[0]);
  //   setIsFilePicked(true);
  // };

  // const handleSubmission = () => {
  //   // const formData = new FormData();
  //   // formData.append("File", selectedFile);
  //   // localStorage.clear();
  //   // localStorage.setItem("geoData", fileObject.current);
  //   // console.log(formData.keys());

  //   // console.log(localStorage.getItem("geoData"));
  //   // uploadGeojson(selectedFile).then((data) => {
  //   //   console.log(data)
  //   //   getGeojson(selectedFile).then((data) => {
  //   //     console.log(data)
  //   //      setGeomData(data);
  //   //   })
  //   // });
  //   // setGeomData(fileObject.current);
  //   // setUploadData(getDataFromGeojson(cas));
  //   // console.log("SUBMITTED");
  // };
  // // console.log(geomData);
  // // console.log(jenksClasses);

  // // session storage testing
  // // localStorage.setItem("localData", JSON.stringify(cas))
  // // let localItem = localStorage.getItem("localData")
  // // // console.log(sessionStorage.getItem("sessionData"))
  // // console.log(JSON.parse(localItem))

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

          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>
        </div>
      </div>
      <div className="MapContainer">
        <div className="Map1">
          <Map
            classes={jenksClasses}
            geomData={JSON.parse(selectedFile)}
            mapTitle="Natural Breaks"
            colourArray={colourArray}
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
