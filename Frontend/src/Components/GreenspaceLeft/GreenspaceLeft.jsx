import React, { useState } from 'react';
import './GreenspaceLeft.css';

const GreenspaceLeft = () => {
  const [eventInfo, setEventInfo] = useState(null);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [largeCommunityInfo, setLargeCommunityInfo] = useState(null);
  const [joinedCommunities, setJoinedCommunities] = useState([]); // Track joined communities

  const events = [
    { name: 'Community Tree Planting - Oct 5th', description: 'Join us to plant trees in the city park and promote urban greening!' },
    { name: 'Urban Gardening Workshop - Oct 12th', description: 'Learn the art of urban gardening in this hands-on workshop.' },
    { name: 'Green Space Cleanup - Oct 20th', description: 'Help us clean and maintain our community green spaces.' },
  ];

  const nearbyCommunities = [
    { name: 'GreenVille Park Enthusiasts', description: 'A local group passionate about maintaining Greenville Park.' },
    { name: 'Urban Plant Lovers', description: 'A community dedicated to fostering urban plant growth.' },
    { name: 'Sustainable City Advocates', description: 'Group focused on promoting sustainability across the city.' },
  ];

  const largeScaleCommunities = [
    {
      name: 'Global Green Initiative',
      description: 'A worldwide organization working to increase urban green spaces.',
      detailedInfo: 'The Global Green Initiative operates in over 50 cities worldwide. Their mission is to plant 1 million trees by 2025 and increase green cover in urban areas.'
    },
    {
      name: 'Planting for a Better Future',
      description: 'Large-scale efforts to plant trees in cities around the world.',
      detailedInfo: 'Planting for a Better Future is currently working on large-scale plantation projects across Europe and North America, with a goal to combat climate change by improving city landscapes.'
    },
  ];

  // Function to handle the join button click
  const handleJoinClick = (index) => {
    setJoinedCommunities([...joinedCommunities, index]);
  };

  const isJoined = (index) => joinedCommunities.includes(index);

  return (
    <div className="greenspace-left">
      {/* Events Section */}
      <div className="events-section">
        <h2>Upcoming Community Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.name}
              {eventInfo === index ? (
                <p className="event-description">{event.description}</p>
              ) : (
                <button className="more-info-btn" onClick={() => setEventInfo(index)}>Know More</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Nearby Communities */}
      <div className="nearby-communities">
        <h2>Nearby Communities to Join</h2>
        <ul>
          {nearbyCommunities.map((community, index) => (
            <li key={index}>
              {community.name}
              {communityInfo === index ? (
                <p className="community-description">{community.description}</p>
              ) : (
                <button className="more-info-btn" onClick={() => setCommunityInfo(index)}>Know More</button>
              )}
              {/* Update button to reflect joined state */}
              <button
                className="join-btn"
                onClick={() => handleJoinClick(index)}
                disabled={isJoined(index)}
              >
                {isJoined(index) ? 'Joined' : 'Join'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Large-Scale Green Initiatives */}
      <div className="large-communities">
        <h2>Large-Scale Green Initiatives</h2>
        <ul>
          {largeScaleCommunities.map((community, index) => (
            <li key={index}>
              <h3>{community.name}</h3>
              {largeCommunityInfo === index ? (
                <p className="large-community-info">{community.detailedInfo}</p>
              ) : (
                <button className="more-info-btn" onClick={() => setLargeCommunityInfo(index)}>Know More</button>
              )}
              <button className="donate-btn">Donate</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GreenspaceLeft;
