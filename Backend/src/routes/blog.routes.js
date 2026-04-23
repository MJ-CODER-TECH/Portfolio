const express = require('express');
const router = express.Router();
const {
  getBlogs, getAllBlogsAdmin, createBlog, updateBlog, deleteBlog
} = require('../controllers/blog.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', getBlogs);                        // Public
router.get('/admin/all', protect, getAllBlogsAdmin); // Admin
router.post('/', protect, createBlog);            // Admin
router.put('/:id', protect, updateBlog);          // Admin
router.delete('/:id', protect, deleteBlog);       // Admin

module.exports = router;