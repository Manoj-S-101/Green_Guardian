// routes/messageRoutes.js
const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find({});
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
      }
});

// Post a new message
router.post('/', async (req, res) => {
    const { user, text } = req.body;
    const newMessage = new Message({ user, text });
    
    try {
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Error saving message' });
    }
  });

module.exports = router;
