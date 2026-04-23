const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String }, // Cloudinary URL
    date: { type: String }, // e.g. "2024-02-10"
    readTime: { type: String }, // e.g. "5 min read"
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);