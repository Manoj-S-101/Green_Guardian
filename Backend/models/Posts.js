const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userPhoto: { type: String, required: true }, 
  username: { type: String, required: true },
  text: { type: String, required: true },
  media: [{ type: String }], 
  likes: { type: Number, default: 0 },
  isLiked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true }); 

module.exports = mongoose.model('Post', postSchema);
