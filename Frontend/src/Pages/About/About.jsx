import React from 'react'
import './About.css'
import Navbar from '../../Components/Navbar/Navbar'
import { FaTree, FaTools, FaChartLine, FaUsers, FaSeedling } from 'react-icons/fa'; // Importing icons from react-icons

const About = () => {
  return (
    <div>
      <Navbar/>
      <div className='about'>
      <div className="about__info-section">
        <h1>Urban Green Solutions</h1>
        <p>
          Urban areas face challenges related to environmental degradation, limited green spaces, and the need for better air quality, biodiversity, and residents’ well-being. 
          With growing populations and limited land, creating and maintaining green spaces has become increasingly difficult.
        </p>
        <div className="about__features">
          <div className="about__feature">
            <FaTools className="about__icon" />
            <h3>AI-Based Identification</h3>
            <p>Automated identification of potential green areas using computer vision.</p>
          </div>
          <div className="about__feature">
            <FaSeedling className="about__icon" />
            <h3>Optimized Plant Selection</h3>
            <p>Recommendations for climate-resilient plants suited to urban environments.</p>
          </div>
          <div className="about__feature">
            <FaChartLine className="about__icon" />
            <h3>3D Visualization</h3>
            <p>Design and simulate green spaces in a 3D environment.</p>
          </div>
          <div className="about__feature">
            <FaUsers className="about__icon" />
            <h3>Community Engagement</h3>
            <p>A platform for residents to participate in greening initiatives.</p>
          </div>
          <div className="about__feature">
            <FaTree className="about__icon" />
            <h3>Automated Maintenance</h3>
            <p>AI scheduling for optimal care of green spaces.</p>
          </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default About
