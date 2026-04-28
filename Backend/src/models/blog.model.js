const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    readTime: {
      type: Number, // minutes
    },

    views: {
      type: Number,
      default: 0,
    },

    metaTitle: String,
    metaDescription: String,

  },
  { timestamps: true }
);

// 🔥 Auto generate slug + readTime
blogSchema.pre('save', function () {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }

  if (this.isModified('content')) {
    const words = this.content.trim().split(/\s+/).length;
    this.readTime = Math.ceil(words / 200);
  }
});

module.exports = mongoose.model('Blog', blogSchema);