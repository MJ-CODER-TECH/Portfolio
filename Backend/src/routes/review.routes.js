const express = require('express');
const router = express.Router();
const {
  getReviews,
  getAllReviewsAdmin,
  submitReview,
  approveReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public
router.get('/', getReviews);
router.post('/', submitReview);

// Admin protected
router.get('/admin/all', protect, getAllReviewsAdmin);
router.put('/:id/approve', protect, approveReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;