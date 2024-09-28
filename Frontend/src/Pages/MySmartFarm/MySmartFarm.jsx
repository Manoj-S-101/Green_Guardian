import React, { useState } from 'react';
import './MySmartFarm.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';

const MySmartFarm = () => {
  const [location, setLocation] = useState(null);
  const [plantType, setPlantType] = useState('');
  const [waterAvailability, setWaterAvailability] = useState('');
  const [soilType, setSoilType] = useState(''); // Existing Field
  const [sunlightExposure, setSunlightExposure] = useState(''); // Existing Field
  const [wateringNeeds, setWateringNeeds] = useState(''); // Existing Field
  const [growthHabit, setGrowthHabit] = useState(''); // New Field
  const [humidityRequirements, setHumidityRequirements] = useState(''); // New Field
  const [careLevel, setCareLevel] = useState(''); // New Field
  const [aiProcessing, setAiProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [plantDoctorActive, setPlantDoctorActive] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [doctorImage, setDoctorImage] = useState(null);
  const [imageadd,setImageAdd] =useState(null);
  const [drimage,setDrImage]=useState(null);

  // Toggle Plant Doctor modal
  const togglePlantDoctor = () => {
    setPlantDoctorActive(!plantDoctorActive);
  };

   // Simulate AI processing for disease detection
  const processAIForDisease = async () => {
    setAiProcessing(true);

    try {
        const formData = new FormData();
        formData.append("image", drimage);
        const response = await axios.post("http://localhost:4000/api/predict-disease", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const { predictedClass, solution, processedImagePath } = response.data;

        const diagnosis = {
            disease: predictedClass,
            solution: solution,
            image: `http://localhost:8000/processed-images/${processedImagePath}`,
        };
        setDiagnosis(diagnosis);
    } catch (error) {
        console.error("Error processing image:", error.message);
        // Handle error state here
    } finally {
        setAiProcessing(false);
    }
};

 

  // Function to handle plant doctor image upload
  const handleDoctorImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorImage(URL.createObjectURL(file));
    }
    setDrImage(e.target.files[0]);
  };

  // Function to get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  };

  
  // Function to simulate AI image processing
const processAIForImage = async () => {
  if (!imageadd) {
    console.error('No image uploaded.');
    return;
  }

  setAiProcessing(true);
  // Create a FormData object to hold the image
  const formData = new FormData();
  formData.append('image', imageadd); // Ensure 'image' matches the key in the backend
  try {
    // Send a POST request to the backend using axios
    const response = await axios.post('http://localhost:4000/api/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming the backend sends back the processed image path
    
    const processedImageUrl = `http://localhost:8000/processed-images/${response.data.processedImagePath}`;
    
    // Update state with the image URL
    setProcessedImage(processedImageUrl);
  } catch (error) {
    console.error('Error processing image:', error);
  } finally {
    setAiProcessing(false);
  }
};

  // Function to simulate AI processing for plant recommendations
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAiProcessing(true);

    try {
        const response = await axios.post('http://localhost:4000/api/recommend-plants', {
            plantType,
            waterAvailability,
            soilType,
            growthHabit,
            sunlightExposure,
            humidityRequirements,
            careLevel,
            wateringNeeds,
        });

        const { recommended_plants, images } = response.data;
        // Process and set the results for your UI
        const simulatedResults = recommended_plants.map((name, index) => ({
            name,
            image: `http://localhost:8000/processed-images/${images[index][1]}`, // assuming images[index][1] is the image path
        }));

        setResults(simulatedResults);
    } catch (error) {
        console.error('Error sending data to backend:', error);
    } finally {
        setAiProcessing(false);
    }
};

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    setImageAdd(e.target.files[0])
  };

  return (
    <div>
      <Navbar />
      <div className="smartfarm-container">
        <div className='space-identify'>
        <h2>Identify Potential space :  </h2>
        <label>Upload an image of the area for plantation</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        {image && (
          <div className="uploaded-image-section">
            <h3>Your Uploaded Image</h3>
            <img src={image} alt="Uploaded potential plantation area" className="uploaded-image" />
            <button className="process-image-btn" onClick={processAIForImage}>
              Analyze Image for Potential Spaces
            </button>
          </div>
        )}

        {processedImage && (
          <div className="processed-image-section">
            <h3>These are some recomended Potential Spaces (Marked) </h3>
            <img
              src={processedImage}
              alt="Processed image with potential spaces"
              className="processed-image"
            />
          </div>
        )}
        </div>
        <br/>
        <br/>
        <div className="smartfarm-form-div">
        <form className="smartfarm-form" onSubmit={handleSubmit}>
        <h2>Identify best plant suits your condition : </h2>
        {!location ? (
          <button className="get-location-btn" onClick={getLocation}>
            Get Current Location
          </button>
        ) : (
          <p>Your location: {location.latitude}, {location.longitude}</p>
        )}

        
      <label>What type of plants would you like to grow?</label>
          <select
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            required
          >
            <option value="">Select Plant Type</option>
            <option value="Fruit">Fruit</option>
            <option value="Leafy Vegetable">Leafy Vegetable</option>
            <option value="Succulent">Succulent</option>
            <option value="Vegetable">Vegetables</option>
            <option value="Flower">Flowering Plants</option>
          </select>

          <label>How much water is available for your plants?</label>
          <select
            value={waterAvailability}
            onChange={(e) => setWaterAvailability(e.target.value)}
            required
          >
            <option value="">Select Water Availability</option>
            <option value="Infrequent">low</option>
            <option value="Moderate">Moderate</option>
            <option value="Frequent">High</option>
          </select>

          <label>What is the growth habit of the plants?</label>
          <select
            value={growthHabit}
            onChange={(e) => setGrowthHabit(e.target.value)}
            required
          >
            <option value="">Select Growth Habit</option>
            <option value="Climbing">Climbing</option>
            <option value="Rosette">Rosette</option>
            <option value="Upright">Upright</option>
            <option value="Trailing">Trailing</option>
            <option value="Bushy">Bushy</option>
            <option value="Vine">Vine</option>
            <option value="Tree">Tree</option>
          </select>

          <label>What is the humidity condition?</label>
          <select
            value={humidityRequirements}
            onChange={(e) => setHumidityRequirements(e.target.value)}
            required
          >
            <option value="">Select Humidity Requirement</option>
            <option value="Low">Low</option>
            <option value="Medium">Moderate</option>
            <option value="High">High</option>
          </select>

          <label>What is the care level you can provide?</label>
          <select
            value={careLevel}
            onChange={(e) => setCareLevel(e.target.value)}
            required
          >
            <option value="">Select Care Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Moderate</option>
            <option value="High">High</option>
          </select>

          <label>Select Soil Type</label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            required
          >
            <option value="">Select Soil Type</option>
            <option value="Sandy">Sandy</option>
            <option value="Well-draining">Well draining</option>
            <option value="Moist">Moist</option>
            <option value="Loamy">Loamy</option>
            <option value="Rich, Moist">Rich,Moist</option>
          </select>

          <label>Sunlight Exposure</label>
          <select
            value={sunlightExposure}
            onChange={(e) => setSunlightExposure(e.target.value)}
            required
          >
            <option value="">Select Sunlight Exposure</option>
            <option value="Bright, Indirect Light">Bright, Indirect Light</option>
            <option value="Bright Light">Bright Light</option>
            <option value="Bright, Direct Light">Bright, Direct Light</option>
            <option value="Partial Shade">Partial Shade</option>
            <option value="Full Sun">Full Sun</option>
          </select>

          <label>Watering needs you can provide </label>
          <select
            value={wateringNeeds}
            onChange={(e) => setWateringNeeds(e.target.value)}
            required
          >
            <option value="">Select watering needs </option>
            <option value="Deep watering">Deep watering</option>
            <option value="Moderate watering">Moderate watering</option>
            <option value="Light watering">Light watering</option>
            <option value="Frequent watering">Frequent watering</option>
            <option value="Regular watering">Regular watering</option>
            <option value="Frequent misting">Frequent moisting</option>
          </select>

          <button className="submit-btn" type="submit">
            Find Plants
          </button>
        </form>

        {aiProcessing && <p>Processing AI Recommendations...</p>}

        {results && (
          <div className="results-section">
            <h2>Recommended Plants for You</h2>
            <div className="plant-results">
              {results.map((plant, index) => (
                <div key={index} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
      {/* Floating Plant Doctor Button */}
      <button className="plant-doctor-btn" onClick={togglePlantDoctor}>
          🌱
        </button>

        {/* Plant Doctor Modal */}
        <div className={`plant-doctor-modal ${plantDoctorActive ? 'active' : ''}`}>
          <button className="plant-doctor-close-btn" onClick={togglePlantDoctor}>
            &times;
          </button>
          <h2>AI Plant Doctor</h2>
          <div className="plant-doctor-upload">
            <label>Upload an image of the diseased plant</label>
            <input type="file" accept="image/*" onChange={handleDoctorImageUpload} />
            {doctorImage && <img src={doctorImage} alt="Diseased plant" className="uploaded-image" />}
            <button onClick={processAIForDisease}>Analyze Disease</button>
          </div>

          {aiProcessing && <p className="plant-doctor-loading">Analyzing disease...</p>}

          {diagnosis && (
            <div className="plant-doctor-result">
              <h3>Disease Identified: {diagnosis.disease}</h3>
              <p><strong>Solution:</strong> {diagnosis.solution}</p>
            {/* <img src={diagnosis.image} alt="Disease detected" /> */}
            </div>
          )}
        </div>
    </div>
  );
};

export default MySmartFarm;
