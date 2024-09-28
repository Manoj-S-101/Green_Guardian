import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GreenspaceRight.css';
import BASE_URL from '../../services/Baseaddress';

const GreenspaceRight = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //   user: "Aarav",
  //   text: "Hey everyone! I'm organizing a tree planting event in our community park next weekend. Who's interested in joining?",
  // },
  // {
  //   user: "Diya",
  //   text: "That sounds great, Aarav! I can help with organizing. We should also promote it on social media!",
  // },
  // {
  //   user: "Rohan",
  //   text: "Count me in! I have some saplings we can use. Let's make this event successful!",
  // },
  // {
  //   user: "Saanvi",
  //   text: "What time are we planning to meet? Also, do we have a list of people who are joining?",
  // },
  // {
  //   user: "Kabir",
  //   text: "I’d love to participate! How about we also conduct a workshop on rooftop gardening the following weekend?",
  // },
  // {
  //   user: "Meera",
  //   text: "Absolutely! I can share some tips on sustainable gardening. Let’s collaborate!",
  // },
  // {
  //   user: "Rahul",
  //   text: "Great idea, Kabir! We can use our community group to spread the word about the workshop.",
  // },]);
  const user = localStorage.getItem('user'); // Retrieve username from localStorage

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (e) => {
    if (message.trim()) {
      const newMessage = { user: user, text: message };

      try {
        await axios.post(`${BASE_URL}/messages`, newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage(''); // Clear the input field after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    // e.preventDefault();
    // if (message.trim()) {
    //   const newMessage = { user: 'You', text: message };
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   setMessage('');
  };


  return (
    <div className="greenspace-right">
      <div className="chat-container">
        <div className="chat-header">
          <h3>My Community Chat</h3>
          <p>Share your innovative ideas, discuss upcoming ideas, and more!</p>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user === user ? 'my-message' : 'other-message'}`}>
           {/* <div key={index} className={`message ${msg.user === 'You' ? 'my-message' : 'other-message'}`}> */}
              <strong>{msg.user === user ? 'You' : msg.user}: </strong>{msg.text}
            </div>
          ))}
        </div>

        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default GreenspaceRight;
