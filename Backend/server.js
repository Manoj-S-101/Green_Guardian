const port = process.env.PORT || 4000;
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { type } = require("os");
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

const DATABASE =process.env.DATABASE;
const BASE_URL = process.env.BASE_URL;
const jwtSecret = "green_guardian";

//connecting with database
mongoose
  .connect(DATABASE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

//API creation
app.get('/',(req,res)=>{
    res.send("Express app is Running ");
})

app.use('/upload/profile_photos', express.static(path.join(__dirname, 'upload/profile_photos')));

app.use('/upload/media', express.static(path.join(__dirname, 'upload/media')));

  const authRoutes = require("./routes/auth");
  app.use("/api", authRoutes); // API routes for login/signup

  const userRoutes = require('./routes/userRoutes');
  app.use('/api/user', userRoutes); 

  const messageRoutes = require('./routes/messageRoutes');
  app.use('/messages',messageRoutes);
  
  const postRoutes = require("./routes/postRoutes");
  app.use("/post", postRoutes);

  const spaceRoutes = require('./routes/spaceRoutes');
  app.use("/api",spaceRoutes);

  const diseaseRoutes = require('./routes/diseaseRoutes');
  app.use("/api",diseaseRoutes);

  const recommendRoutes = require('./routes/recommendRoutes');
  app.use("/api",recommendRoutes);
  

  app.listen(port, (error) => {
    if (!error) console.log(`Server running on port ${port}`);
    else console.log("Error : " + error);
  });