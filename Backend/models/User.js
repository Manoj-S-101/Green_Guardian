const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['environmentalist', 'socialist', 'botanist', 'sustainabilist', 'common'],
    required: true,
    default: 'common' 
  },
  posts: {
    type: Number,
    default: 0, 
  },
  followers:{
    type:Number,
    default:0,
  },
  following:{
    type:Number,
    default:0,
  },
  photo: {
    type: String,
    default: 'profile_photo.jpg', 
  },
});

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
