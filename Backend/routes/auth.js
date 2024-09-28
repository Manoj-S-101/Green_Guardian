const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const jwtSecret = "green_guardian";

// Set up Multer for file uploads
const uploadDir = path.join(__dirname, '/upload/profile_photos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: './upload/profile_photos',
    filename: (req, file, cb) => {
      // Replace spaces with underscores or sanitize special characters
      const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
      cb(null, `${Date.now()}-${sanitizedFilename}`);
    },
  });
  
  const upload = multer({ storage });

// Sign-up route
router.post("/signup", upload.single('photo'), async (req, res) => {
  const { username, email, password, userType } = req.body;
  const photoPath = req.file ? `/upload/profile_photos/${req.file.filename}` : null; // Get the relative path

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password, // Make sure you hash the password before saving!
      userType: userType || 'common',  // Default to 'common' if not provided
      photo: photoPath || 'profile_photo.jpg', // Fallback to default image if none uploaded
    });
    
    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, email, userType }, jwtSecret, {
      expiresIn: "6h",
    });

    // Respond with the token
    res.json({ token, message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Create a JWT token
      const token = jwt.sign({ id: user._id, email }, jwtSecret, {
        expiresIn: "6h",
      });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });


module.exports = router;
