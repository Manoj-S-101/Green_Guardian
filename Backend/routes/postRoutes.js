const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const Post = require('../models/Posts');
const User = require('../models/User');

// Set up Multer for file uploads
const uploadDir = path.join(__dirname, '/upload/media');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}
// Setup storage for uploaded files
const storage = multer.diskStorage({
  destination: './upload/media',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Unique filename
  }
});

// Create the upload middleware
const upload = multer({ storage });

// Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new post
router.post('/', upload.array('media', 10), async (req, res) => { // Handle multiple files
  const { userPhoto, username, text } = req.body;

  // Map the uploaded files to their short paths
  const mediaPaths = req.files.map(file => `/upload/media/${file.filename}`);

  const newPost = new Post({
    userPhoto,
    username,
    text,
    media: mediaPaths, // Store paths to uploaded media
    likes: 0, // Default to 0 likes
    isLiked: false,
  });

  try {
    const savedPost = await newPost.save();
    const user=await User.findOne({username});
    await User.findByIdAndUpdate(user.id, { $inc: { posts: 1 } });

    res.status(201).json(savedPost); // Return the created post
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
