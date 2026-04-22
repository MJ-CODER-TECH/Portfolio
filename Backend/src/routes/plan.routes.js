const express = require('express');
const router = express.Router();
const {
  getPlans,
  getAllPlansAdmin,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/plan.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public
router.get('/', getPlans);
router.get('/:id', getPlanById);

// Admin protected
router.get('/admin/all', protect, getAllPlansAdmin);
router.post('/', protect, createPlan);
router.put('/:id', protect, updatePlan);
router.delete('/:id', protect, deletePlan);

module.exports = router;