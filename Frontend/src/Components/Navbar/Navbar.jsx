import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import BASE_URL from '../../services/Baseaddress';

const Navbar = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/loginsignup'); // Redirect to login/signup page
  };

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  useEffect(() => {
    if (token) {
      // Fetch user profile details including the photo
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          localStorage.setItem('user', data.username);
         
            setUserPhoto(data.photo);
            localStorage.setItem('photo',data.photo);
          
          console.log(userPhoto);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div className='navbar'>
      <div className="logo-section">
        <img src="logo.jpeg" alt="Logo" className="logo" />
        <div className="brand-name">Green Guardians</div>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/my-smartfarm" className={({ isActive }) => (isActive ? 'active' : '')}>My SmartFarm</NavLink>
        </li>
        <li>
          <NavLink to="/greenspace-hub" className={({ isActive }) => (isActive ? 'active' : '')}>GreenSpace Hub</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
        </li>
      </ul>

      {token ? (
        <>
          <div onClick={toggleProfileVisibility} className="profile-section">
            <img src={userPhoto != "profile_photo.jpg"?`${BASE_URL}${userPhoto}` :  'profile_photo.jpg'} alt="User Profile" className="profile-pic" />
          </div>
          {isProfileVisible && <Profile onClose={toggleProfileVisibility} />}
          {isProfileVisible && <div className="backdrop" onClick={toggleProfileVisibility} />}
        </>
      ) : (
        <button className='login' onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Navbar;
