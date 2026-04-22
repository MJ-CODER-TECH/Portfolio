const Plan = require('../models/plan.model');

// @desc    Get all active plans (Public)
// @route   GET /api/plans
const getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, count: plans.length, data: plans });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all plans including inactive (Admin)
// @route   GET /api/plans/admin/all
const getAllPlansAdmin = async (req, res, next) => {
  try {
    const plans = await Plan.find().sort({ order: 1 });
    res.json({ success: true, count: plans.length, data: plans });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single plan
// @route   GET /api/plans/:id
const getPlanById = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found.' });
    res.json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

// @desc    Create plan (Admin)
// @route   POST /api/plans
const createPlan = async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({ success: true, message: 'Plan created.', data: plan });
  } catch (error) {
    next(error);
  }
};

// @desc    Update plan (Admin)
// @route   PUT /api/plans/:id
const updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found.' });
    res.json({ success: true, message: 'Plan updated.', data: plan });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete plan (Admin)
// @route   DELETE /api/plans/:id
const deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found.' });
    res.json({ success: true, message: 'Plan deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPlans, getAllPlansAdmin, getPlanById, createPlan, updatePlan, deletePlan };