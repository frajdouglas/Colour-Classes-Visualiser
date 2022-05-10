// export const getGeojson = (selectedFile) => {
//   const fileName = selectedFile.name;
//   let geometryData = fetch(`http://localhost:5000/geom?fileName=${fileName}`)
//     .then((response) => {
//       let jsonData = response.json();
//       return jsonData;
//     })
//     .then((jsonData) => {
//       return jsonData;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
//   return geometryData;
// };

// export const uploadGeojson = (selectedFile) => {
// const formData = new FormData();
// formData.append("File", selectedFile);
// fetch("http://localhost:5000/geom", {
//       method: 'POST',
//       body: formData
//     })
//       .then((response) => {
//         console.log(response);
//       })
//       .then((result) => {
//         console.log("Success:", result);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
// }

export const getGeojson = async (selectedFile) => {
    const fileName = selectedFile.name;
    let request = await fetch(`http://localhost:5000/geom?fileName=${fileName}`)
  const data = await request.json();

    return data;
  };

export const uploadGeojson = async (selectedFile) => {
  const formData = new FormData();
  formData.append("File", selectedFile);
  const request = await fetch("http://localhost:5000/geom", {
    method: "POST",
    body: formData,
  });
//   const data = await request.json();

  return request;
};
