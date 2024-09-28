import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/loginsignup');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:4000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserDetails(data); // Assuming the response contains all required user details
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="profile-window">
      <button className='close-button' onClick={onClose}>X</button>
      <div className="profile-details">
        <h3>{userDetails.username}</h3>
        <p>Posts: {userDetails.posts}</p>
        <p>Followers: {userDetails.followers}</p>
        <p>Following: {userDetails.following}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
