const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios"); // Make sure to import axios
const FormData = require("form-data"); // Make sure to import FormData

const router = express.Router();

// Set up the upload directory
const uploadDir = path.join(__dirname, '../upload/images'); 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Use the uploadDir variable
    },
    filename: (req, file, cb) => {
      const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
      cb(null, `${Date.now()}-${sanitizedFilename}`);
    },
});
  
const upload = multer({ storage });

// Define your upload route
router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        console.log(req.file)
        console.log("error in first")
        return res.status(400).send({ error: "No image file uploaded" });
      }

      // Construct the full path of the uploaded image
      const imagePath = path.join(uploadDir, req.file.filename); // Use req.file.filename instead of req.file.path

      // Send image to Flask API for processing
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imagePath));

      const response = await axios.post("http://localhost:8000/api/process-image", formData, {
        headers: formData.getHeaders(),
      });

      // Send back the processed image path to the frontend
  
      res.json({ processedImagePath: response.data.processed_image_path });
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).send({ error: "Error processing image" });
    }
});

module.exports = router;
