import React from 'react';
import './Landing.css';
import { FaTree, FaTools, FaChartLine, FaUsers, FaSeedling } from 'react-icons/fa'; // Importing icons from react-icons
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to the home page if the token is present
      navigate('/home');
    } else {
      // Redirect to the login/signup page if the token is not present
      navigate('/loginsignup');
    }
  };
  return (
    <div className='landing'>
      <div className="landing__logo-section">
        <img src='logo.jpeg' alt="Logo" className="landing__logo" />
        <div className="landing__brand-name">Green Guardians</div>
      </div>
      <div className="landing__info-section">
        <h1>Urban Green Solutions</h1>
        <p>
          Urban areas face challenges related to environmental degradation, limited green spaces, and the need for better air quality, biodiversity, and residents’ well-being. 
          With growing populations and limited land, creating and maintaining green spaces has become increasingly difficult.
        </p>
        <div className="landing__features">
          <div className="landing__feature">
            <FaTools className="landing__icon" />
            <h3>AI-Based Identification</h3>
            <p>Automated identification of potential green areas using computer vision.</p>
          </div>
          <div className="landing__feature">
            <FaSeedling className="landing__icon" />
            <h3>Optimized Plant Selection</h3>
            <p>Recommendations for climate-resilient plants suited to urban environments.</p>
          </div>
          <div className="landing__feature">
            <FaChartLine className="landing__icon" />
            <h3>3D Visualization</h3>
            <p>Design and simulate green spaces in a 3D environment.</p>
          </div>
          <div className="landing__feature">
            <FaUsers className="landing__icon" />
            <h3>Community Engagement</h3>
            <p>A platform for residents to participate in greening initiatives.</p>
          </div>
          <div className="landing__feature">
            <FaTree className="landing__icon" />
            <h3>Automated Maintenance</h3>
            <p>AI scheduling for optimal care of green spaces.</p>
          </div>
        </div>
        <button className="landing__get-started" onClick={handleGetStarted}>
        Get Started
      </button>
      </div>
    </div>
  );
}

export default Landing;
