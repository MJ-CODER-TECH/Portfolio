const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String }, // e.g. "CEO at XYZ"
    company: { type: String },
    avatar: { type: String }, // image URL
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // admin approves
    isActive: { type: Boolean, default: true },
    projectRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);