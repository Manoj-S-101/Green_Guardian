import React, { useState } from 'react';
import './HomeLeft.css';
import BASE_URL from '../../services/Baseaddress';

const Homeleft = () => {
  const [thoughts, setThoughts] = useState('');
  const [media, setMedia] = useState([]);
  const [previews, setPreviews] = useState([]);
  const username = localStorage.getItem('user');
  const userPhoto = localStorage.getItem('photo');

  const handleThoughtsChange = (event) => {
    setThoughts(event.target.value);
  };

  const handleMediaChange = (event) => {
    const files = Array.from(event.target.files);

    // Create preview URLs for each file
    const previewURLs = files.map((file) => URL.createObjectURL(file));

    setMedia([...media, ...files]); // Append new files to the existing media array
    setPreviews([...previews, ...previewURLs]); // Append new previews
  };

  const handleDeleteMedia = (indexToDelete) => {
    setMedia((prevMedia) => prevMedia.filter((_, index) => index !== indexToDelete));
    setPreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('userPhoto', userPhoto); // Add user's photo to formData
    formData.append('username', username); // Add username to formData
    formData.append('text', thoughts); // Add text content to formData
    media.forEach(file => {
      formData.append('media', file); // Add each media file to formData
    });

    try {
      const response = await fetch('http://localhost:4000/post/', { // Update endpoint
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Your thoughts have been shared successfully!');
        setThoughts('');
        setMedia([]);
        setPreviews([]); // Clear preview on successful submission
      } else {
        alert('There was an error sharing your thoughts.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sharing your thoughts.');
    }
  };

  return (
    <div className='homeLeft'>
      <h3>Share your thoughts on GreenSpace</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={thoughts}
          onChange={handleThoughtsChange}
          placeholder="What are your thoughts?"
          required
          rows="4"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="file"
          accept="image/*, video/*"
          multiple
          onChange={handleMediaChange}
          style={{ marginBottom: '10px' }}
        />
        <div className="media-preview">
          {previews.map((preview, index) => (
            <div key={index} className="media-item">
              {media[index].type.startsWith('image') ? (
                <img src={preview} alt="Selected" className="preview-img" />
              ) : (
                <video controls className="preview-video">
                  <source src={preview} />
                  Your browser does not support the video tag.
                </video>
              )}
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDeleteMedia(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Homeleft;
