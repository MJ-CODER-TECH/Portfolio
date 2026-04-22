const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    thumbnail: { type: String }, // image URL
    images: [{ type: String }],
    techStack: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    category: {
      type: String,
      enum: ['web', 'mobile', 'design', 'backend', 'fullstack', 'other'],
      default: 'web',
    },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);