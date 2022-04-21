import React from "react";
import { useState } from "react";

import '../../App.css';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		console.log(event.target.files)

const fileExtension = event.target.files[0].name.split(".").at(-1);
const allowedFileTypes = ["geojson"];
if (!allowedFileTypes.includes(fileExtension)) {
    window.alert(`Files type must be ${allowedFileTypes.join(", ")}`);
    return false;
}
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	// NEED A SERVER TO HANDLE THE FILE UPLOAD
	const handleSubmission = () => {
		// const formData = new FormData();

		// formData.append('File', selectedFile);

		// fetch(
		// 	'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
		// 	{
		// 		method: 'POST',
		// 		body: formData,
		// 	}
		// )
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		console.log('Success:', result);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error:', error);
		// 	});
	};

	return(
   <div>
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
		</div>
	)
}
export default Upload;
