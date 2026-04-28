const express = require('express');
const router = express.Router();
const {
  getBlogs, getAllBlogsAdmin, createBlog, updateBlog, deleteBlog, getBlogById
} = require('../controllers/blog.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../config/multer'); // your existing multer-cloudinary config

router.get('/', getBlogs);                                          // Public
router.get('/admin/all', protect, getAllBlogsAdmin);     
router.get('/:id', getBlogById); // 👈 ADD THIS                 // Admin
           // Admin
router.post('/', protect, upload.single('image'), createBlog);     // Admin — file upload
router.put('/:id', protect, upload.single('image'), updateBlog);   // Admin — file upload
router.delete('/:id', protect, deleteBlog);       

module.exports = router;