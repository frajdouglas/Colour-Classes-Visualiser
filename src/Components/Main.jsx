import React from "react";
import { useState, useEffect } from "react";
import { Jenks } from "jenks";
const Main = () => {
    const [uploadData, setUploadData] = useState([1])
  let data = [1, 2, 5, 15, 45, 89.3, 112, 31, 120, 0.5];
  let n_classes = 3;

  useEffect(() => {
    setUploadData(new Jenks(data, n_classes).naturalBreak())
  },[])

return (<div>
      {uploadData.map((item) => {
          return (<div>
              {item}
              </div>)
      })
    }
    </div>)
};

export default Main;
