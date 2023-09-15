import React, { useState,useRef } from 'react';
import './Inference.css'; 

import { collection, addDoc } from "firebase/firestore";
import {db} from '../../Config/Config';

import Exif from 'exif-js';
import axios from "axios"

// import { dataref } from '../../firebaseConfig/realtimedbconfig';
// import imageCompression from 'browser-image-compression';



function InferenceForm() {
  const [api_key, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [neighborhoodName, setNeighborhoodName] = useState('');
 // const [base64Image, setBase64Image] = useState(null);

  //const [image,setImage]=useState(null);

  //  const [predictions, setPredictions] = useState([]);
  //  const [annotatedImage, setAnnotatedImage] = useState('');


  const[uploadMethod,setUploadMethod]=useState('upload');
  const [selectedFile, setSelectedFile] = useState('');
  const [filename,setFilename]=useState(null);
  const fileInputRef = useRef(null);

  const[butdisabled,setDisabled]=useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const [FilterClassName,setFilterClassName]=useState("");
  const [minConfidence,setMinConfidence]=useState(0);
  const [maxOverlap,setMaxOverlap]=useState(0);

  const handleConfidenceChange = (e) => {
    // Parse the input value as an integer and update the state
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      setMinConfidence(inputValue);
    } else {
      setMinConfidence(0); // Reset to 0 if the input is not a valid integer
    }
  };
  const handleOverlapChange = (e) => {
    // Parse the input value as an integer and update the state
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      setMaxOverlap(inputValue);
    } else {
      setMaxOverlap(0); // Reset to 0 if the input is not a valid integer
    }
  };

  const [InferenceResult,setInferenceResult]=useState('Image');
  const [label,setLabel]=useState('Off');


  const handleReverseGeocode = async (latitude,longitude) => {
    console.log(latitude,longitude);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude.toString()},${latitude.toString()}.json?country=sa&language=ar`,
        {
          params: {
            access_token: 'sk.eyJ1IjoiemFpbjIwMjQiLCJhIjoiY2xtYzM1bXp2MDFoMTNrbnpmanMxeXYxOSJ9.Eu8H1HladlY5BRqSILG3Fg',
          },
        }
      );

      if (response.data.features.length > 0) {
        const firstFeature = response.data.features[0];
        console.log(firstFeature.text);
        setNeighborhoodName(firstFeature.text);
      } else {
        console.log("Not found");
        setNeighborhoodName('Location not found');
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };


  const [strokeWidth,setStrokeWidth]=useState('1');

  const handleStrokeClick = (type)=>{
    setStrokeWidth(type);
  }

  const handleLabelClick = (type) => {
 setLabel(type);
  };

  // const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const base64Image = reader.result.split(",")[1];
  //         setBase64Image(base64Image);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  // };


 async function compressBase64Image(base64Image, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
      const img = new Image();
  
      img.onload = async function () {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
  
        // Calculate the new dimensions to fit within maxWidth and maxHeight
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
  
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
  
        // Draw the image on the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convert the canvas content back to base64 with compression
        await canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onload = function () {
              resolve(reader.result); // Compressed base64 image
            };
            reader.readAsDataURL(blob);
          },
          'image/jpeg', 
          quality 
        );
      };

      img.src = base64Image;
    });
  }

  


  const handleRunInference =async (e) => {
    e.preventDefault();  
    alert("Loading");
    setDisabled(true);

      // if (!image) return;

      // const formData = new FormData();
      // formData.append('image', image);
    
      // try {
      //   const response = await axios.post('https://jumanh.pythonanywhere.com/predict', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
    
      //   if (response.status === 200) {
      //     try {
            let compressed_image;
          //  `data:image/png;base64,${data.annotated_image_base64}`
           
      //     const data = response.data;
    
         await compressBase64Image(selectedFile, 640, 640, 0.8)
          .then((compressedBase64Image) => {
          
            if (compressedBase64Image.length <= 1048487) {
              console.log("Compressed");
              console.log(compressedBase64Image);
              compressed_image=compressedBase64Image;
            } else {
              console.error('Compressed image size exceeds the limit.');
            }
          })
          .catch((error) => {
            console.error('Error compressing image:', error);
          });
        
        
            // setPredictions(data.predictions);
            // setAnnotatedImage(compressed_image);
            try{
          //  console.log(data.predictions[0]);
             const docRef = await addDoc(collection(db, "userTickets"), {
                image: compressed_image,
                confidence:minConfidence,
                TicketDate:Date(),
                Latitude:coordinates.LATE.toString(),
                Longitude:coordinates.LONG.toString(),
                className:FilterClassName,
                name:neighborhoodName,
                // prediction:data.predictions[0],
                // prediction_quantity:data.predictions[1],
                prediction:"Not working",
                prediction_quantity:"Not working",
                Department:'TEST WF For FIRNAS',
                status:"فتوحة",
              });
             console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
              alert('Failed To store Data Please Try again later');
            }finally{
              setDisabled(false);
            }
        }
      // } catch (error) {
      //   console.error('Error uploading image:', error);
      //   alert('Wrong Image Could not predict');
      // }finally{
      //   setDisabled(false);
      // }
//  };

 
  


  const handleButtonClick = (type) => {
    setUploadMethod(type);
  };


  const handleimgjsonButtonClick= (type)=>{
      setInferenceResult(type);
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("file"+file);
      //setImage(file);

      reader.onload = (event) => {
        const base64Image = event.target.result;
        setFilename(file.name)
        setSelectedFile(base64Image);
  
        Exif.getData(file, function() {
          try {
            const exifData = Exif.getAllTags(this);
            if (exifData.GPSLatitude && exifData.GPSLongitude) {
              const latitude = exifData.GPSLatitude[0] + exifData.GPSLatitude[1] / 60 + exifData.GPSLatitude[2] / 3600;
              const longitude = exifData.GPSLongitude[0] + exifData.GPSLongitude[1] / 60 + exifData.GPSLongitude[2] / 3600;
              setCoordinates({
                LATE: latitude,
                LONG: longitude
              });
              handleReverseGeocode(latitude,longitude)

            } else {
              console.log('No GPS data found in image.');
              setCoordinates({
                LATE:24.475219749999997,// Default latitude
                LONG:39.589692472222225,// Default longitude
              });
            }
          } catch(err) {
            console.log('Error reading EXIF data.');
          }
        });
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className='body'>
        <form id='inputForm' onSubmit={handleRunInference}>
        <div className='header'>
            <div className="header__grid" >
                <img  
                    src="assets/img/logo3.png"
                    width={220}
                    height={80}
                    style={{paddingBottom:10}}
                    alt="Al Firnas"
                />

                <div>
				    <label className="header__label" for="model"  >Model</label>
				    <input className="input" type="text" id="model" value={model} onChange={(e)=>setModel(e.target.value)} />
			    </div>
                <div>
					<label className="header__label" for="version">Version</label>
					<input className="input" type="number" id="version" value={version} onChange={(e)=>setVersion(e.target.value)} />
				</div>
				<div>
					<label className="header__label" for="api_key">API Key</label>
					<input className="input" type="text" id="api_key" value={api_key} onChange={(e)=>setApiKey(e.target.value)} />
				</div>
             </div> 
        </div>

      
        <div className='content'>
            <div className="content__grid">
              
                <div className="col-12-s6-m4" id="method">
        <label className="input__label">Upload Method</label>
        <div>
          <button
            data-value="upload"
            type='button'
           className={`bttn left fill ${uploadMethod==='upload' ? 'active' : ''}`}
            onClick={() => handleButtonClick('upload')}
          >
            Upload
          </button>
          <button
            data-value="url"
            type='button'
            className={`bttn right fill ${uploadMethod==='url' ? 'active' : ''}`}
           onClick={()=>{handleButtonClick('url')}}
          >
            URL
          </button>
        </div>
      </div>

      <div className="col-12-m8" id="fileSelectionContainer" style={{ display: uploadMethod==='upload' ? 'block' : 'none' }}>
        <label className="input__label" htmlFor="file">Select File</label>
        <div className="flex">
          <input className="input input--left flex-1" type="text" id="fileName"  value={filename} disabled />
          <button id="fileMock"   type='button' className={`bttn right ${uploadMethod==='upload' ? 'active' : ''}`} onClick={handleBrowseClick}>Browse</button>
        </div>
        <input style={{ display: 'none' }} type="file" id="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange}  ref={fileInputRef} />
      </div>

      <div className="col-12-m8" id="urlContainer" style={{ display: uploadMethod==='url' ? 'block' : 'none' }}>
        <label className="input__label" htmlFor="file">Enter Image URL</label>
        <div className="flex">
          <input type="text" id="url" placeholder="https://path.to/your.jpg" value={selectedFile} onChange={(e)=>{setSelectedFile(e.target.value)}} className="input" /><br />
        </div>
      </div>


      <div className='col-12-m6'>
     <label class="input__label" for="classes">Filter Classes</label>
					<input type="text" id="classes" placeholder="Enter class names" class="input" value={FilterClassName} onChange={(e)=>setFilterClassName(e.target.value)}/> <br/>
					<span className="text--small">Separate names with commas</span>

     </div>

     <div className="col-6-m3 relative">
					<label className="input__label" for="confidence">Min Confidence</label>
					<div>
						<i class="fas fa-crown"></i>
						<span className="icon">%</span>
						<input type="number" id="confidence" value={minConfidence} onChange={handleConfidenceChange} accuracy="2" min="0" class="input input__icon"/></div>
					</div>


                    <div class="col-6-m3 relative">
					<label class="input__label" for="overlap">Max Overlap</label>
					<div>
						<i class="fas fa-object-ungroup"></i>
						<span class="icon">%</span>
						<input type="number" id="overlap" value={maxOverlap} onChange={handleOverlapChange} max="100" accuracy="2" min="0" class="input input__icon"/></div>
		            </div>


                    <div class="col-6-m3" id="format">
					<label class="input__label">Inference Result</label>
					<div>
          <button
            data-value="image"
            id='imageButton'
            type='button'
           className={`bttn left fill ${InferenceResult==='Image' ? 'active' : ''}`}
            onClick={() => handleimgjsonButtonClick('Image')}
          >
            Image
          </button>
          <button
            data-value="json"
            id='jsonButton'
            type='button'
           className={`bttn left fill ${InferenceResult === 'JSON'? 'active' : ''}`}
            onClick={()=>handleimgjsonButtonClick('JSON')}
          >
            JSON
          </button>
		
					</div>
				</div>


                <div className="col-12 content__grid" id="imageOptions">
					<div className="col-12-s6-m4" id="labels">
						<label className="input__label">Labels</label>
						<div>
							<button     type='button' data-value='off' className={`bttn left ${label==='Off' ? 'active' : ''}`} onClick={()=>handleLabelClick('Off')}>Off</button>
							<button data-value="on"    type='button' className={`bttn right ${label==='On' ? 'active' : ''}`} onClick={()=>handleLabelClick('On')}>On</button>
						</div>
					</div>
					<div className="col-12-s6-m4" id="stroke">
						<label className="input__label">Stroke Width</label>
						<div>
							<button data-value="1"  onClick={()=>handleStrokeClick('1')}  type='button' className={`bttn left ${strokeWidth==='1' ? 'active' : ''}`}>1px</button>
							<button data-value="2"   onClick={()=>handleStrokeClick('2')}  type='button' className={`bttn ${strokeWidth==='2' ? 'active' : ''}`}>2px</button>
							<button data-value="5"  onClick={()=>handleStrokeClick('5')}   type='button' className={`bttn ${strokeWidth==='5' ? 'active' : ''}`}>5px</button>
							<button data-value="10"  onClick={()=>handleStrokeClick('10')}  type='button' className={`bttn right ${strokeWidth==='10' ? 'active' : ''}`}>10px</button>
						</div>
					</div>
				</div>


                <div class="col-12">
					<button type="submit" value="Run Inference" className="bttn__primary"  disabled={butdisabled}>Run Inference</button>
				</div>
               
     </div>

     {/* <div className="result" id="resultContainer">
				<div className="divider"></div>
				<div className="result__header">
					<h3 className="headline">Result</h3>
					<a href="#">Copy Code</a>
				</div>
                <pre id="output" className="codeblock">here is your json </pre>
			</div> */}

    

        </div>
        </form>

    </div>
  );
}

export default InferenceForm;
