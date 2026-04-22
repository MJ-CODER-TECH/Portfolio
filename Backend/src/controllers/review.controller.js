const Review = require('../models/review.model');

// @desc    Get all approved reviews (Public)
// @route   GET /api/reviews
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: true, isActive: true })
      .populate('projectRef', 'title')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews/admin/all
const getAllReviewsAdmin = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('projectRef', 'title')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a review (Public)
// @route   POST /api/reviews
const submitReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Review submitted. Pending admin approval.',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve / toggle review (Admin)
// @route   PUT /api/reviews/:id/approve
const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    review.isApproved = !review.isApproved;
    await review.save();

    res.json({
      success: true,
      message: `Review ${review.isApproved ? 'approved' : 'unapproved'}.`,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review (Admin)
// @route   PUT /api/reviews/:id
const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.json({ success: true, message: 'Review updated.', data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review (Admin)
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.json({ success: true, message: 'Review deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReviews, getAllReviewsAdmin, submitReview, approveReview, updateReview, deleteReview };