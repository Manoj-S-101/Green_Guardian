import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('common');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]); // Update photo state with the uploaded file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = isLogin
      ? 'http://localhost:4000/api/login'
      : 'http://localhost:4000/api/signup';
    
      const payload =  { email, password };
 
    const formData = new FormData(); // Create a FormData object
    if (!isLogin) {
      formData.append('username', username);
      formData.append('userType', userType);
    }
    formData.append('email', email);
    formData.append('password', password);
    if (photo) {
      formData.append('photo', photo); // Append the photo file to the form data
    }
    if(isLogin)
    {
      try{
        const response = await axios.post(url, payload);
        const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during authentication:', error.response?.data || error.message);
      // You might want to show an alert or a message to the user here
      }
    }
    else{
    try {
         const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during authentication:', error.response?.data || error.message);
      // You might want to show an alert or a message to the user here
    }
  }
  };

  return (
    <div className="login-signup">
      <div className="logo-section">
        <img src="logo.jpeg" alt="Logo" className="logo" />
        <div className="brand-name">Green Guardians</div>
      </div>
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select
                  id="userType"
                  name="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="common">Common User</option>
                  <option value="environmentalist">Environmentalist</option>
                  <option value="socialist">Socialist</option>
                  <option value="botanist">Botanist</option>
                  <option value="sustainabilist">Sustainabilist</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="photo">Profile Photo</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*" // Accept only image files
                  onChange={handlePhotoChange} // Handle file selection
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
              />
            </div>
          )}
          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-text" onClick={handleToggle}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </p>
        <Link to="/home"><button className="skip-button">Skip</button></Link>
      </div>
    </div>
  );
};

export default LoginSignup;
