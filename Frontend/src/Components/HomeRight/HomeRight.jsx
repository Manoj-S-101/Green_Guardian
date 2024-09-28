import React, { useEffect, useState, useRef } from 'react';
import './HomeRight.css';

const images = [
  "photo2.jpeg",
  "photo3.jpeg",
  "photo4.jpeg",
  "photo5.jpeg",
  "photo6.jpeg",
  "photo7.jpeg",
  "photo8.jpeg",
  "photo9.jpeg",
  "photo10.jpeg",
  "photo11.jpeg",
  "photo1.jpeg",
  "photo12.jpeg"
];
const delay = 4000;

const HomeRight = () => {
  const [index, setIndex] =useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className='homeRight'>
      <h3>Best GreenSpaces of Your City</h3>
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)`, transition: index === 0 && images.length - 1 === index ? 'none' : 'ease 1000ms' }} // Adjust transition
      >
        {images.map((image, index) => (
          <div
            className="slide"
            key={index}
          >
            <img src={image} alt={`Slide ${(index + 1)}`} />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default HomeRight;
