import "./App.css";
import Map from "./Components/Map.component/Map";
import Upload from "./Components/Upload.component/Upload";
import { data } from "./Components/data";
import { lads } from "./Components/Local_Authority_Districts";
import { useState, useEffect } from "react";
import {
  getEqualIntervals,
  getNaturalBreaks,
} from "./Utils/classificationAlgorithms";
import { getDataFromGeojson } from "./Utils/getDataFromGeojson";
function App() {
  const [uploadData, setUploadData] = useState(getDataFromGeojson(lads));
  const [jenksClasses, setJenksClasses] = useState([0.1, 2, 3, 4, 5]);
  const [equalIntervals, setEqualIntervals] = useState([0.1, 2, 3, 4, 5]);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    let n_classes = 9;
    // setUploadData(getDataFromGeojson(lads));
    setJenksClasses(getNaturalBreaks(uploadData, n_classes));
    setEqualIntervals(getEqualIntervals(uploadData));
  }, [uploadData]);


  const changeHandler = (event) => {
    console.log(event.target.files);

    const fileExtension = event.target.files[0].name.split(".").at(-1);
    const allowedFileTypes = ["geojson"];
    if (!allowedFileTypes.includes(fileExtension)) {
      window.alert(`Files type must be ${allowedFileTypes.join(", ")}`);
      return false;
    }
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
console.log("SUBMITTED")
	};

  console.log(jenksClasses);
  return (
    <div className="App">
      			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
      <div className="MapContainer">
        <Map
          classes={jenksClasses}
          uploadData={uploadData}
          mapTitle="Natural Breaks"
        />
        <Map
          classes={equalIntervals}
          uploadData={uploadData}
          mapTitle="Equal Intervals"
        />
      </div>
    </div>
  );
}

export default App;
