const Blog = require('../models/blog.model');

// Public
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) { next(error); }
};

// Admin
const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) { next(error); }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, isActive } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content required',
      });
    }

    const image = req.file ? req.file.path : null;

    const blog = await Blog.create({
      title,
      content,
      isActive: isActive === 'false' ? false : true,
      image,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error(error); // ✅ debug
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, content, isActive } = req.body;

    const updateData = {
      title,
      content,
      isActive: isActive === 'false' ? false : true,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Blog deleted.' });
  } catch (error) { next(error); }
};

module.exports = { getBlogs, getAllBlogsAdmin, createBlog, updateBlog, deleteBlog };