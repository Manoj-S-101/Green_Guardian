const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

// Set up the upload directory
const uploadDir = path.join(__dirname, '../upload/images'); 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
      cb(null, `${Date.now()}-${sanitizedFilename}`);
    },
});
  
const upload = multer({ storage });

// Define your upload route
router.post("/predict-disease", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({ error: "No image file uploaded" });
      }

      const imagePath = path.join(uploadDir, req.file.filename);
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imagePath));

      const response = await axios.post("http://localhost:8000/api/predict-disease", formData, {
        headers: formData.getHeaders(),
      });

      // Extract the necessary data from the response
      const { predicted_class, solution } = response.data; 

      res.json({ 
        predictedClass: predicted_class,
        solution: solution,
        processedImagePath: response.data.processed_image_path 
      });
    } catch (error) {
      console.error("Error processing image:", error.message);
      res.status(500).send({ error: "Error processing image" });
    }
});

module.exports = router;
