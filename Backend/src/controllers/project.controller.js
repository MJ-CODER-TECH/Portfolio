const Project = require('../models/project.model');

// @desc    Get all active projects (Public)
const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects (Admin)
const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};


// ========================================
// ✅ CREATE PROJECT (WITH IMAGE)
// ========================================
const createProject = async (req, res, next) => {
  try {
    const thumbnailUrl = req.file ? req.file.path : null;

    // Parse techStack array from FormData
    let techStack = [];
    if (req.body.techStack) {
      techStack = Array.isArray(req.body.techStack)
        ? req.body.techStack
        : typeof req.body.techStack === 'string'
        ? req.body.techStack.split(',').map(t => t.trim()).filter(Boolean)
        : [];
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category || 'web',
      techStack: techStack,
      liveUrl: req.body.liveUrl,
      githubUrl: req.body.githubUrl,
      thumbnail: thumbnailUrl,
      isFeatured: req.body.featured === 'true' || req.body.featured === true,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Project created.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};


// ========================================
// ✅ UPDATE PROJECT (OPTIONAL IMAGE)
// ========================================
const updateProject = async (req, res, next) => {
  try {
    let updateData = {};

    // Map fields from request
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.liveUrl !== undefined) updateData.liveUrl = req.body.liveUrl;
    if (req.body.githubUrl !== undefined) updateData.githubUrl = req.body.githubUrl;
    if (req.body.featured !== undefined) {
      updateData.isFeatured = req.body.featured === 'true' || req.body.featured === true;
    }

    // Parse techStack array
    if (req.body.techStack) {
      updateData.techStack = Array.isArray(req.body.techStack)
        ? req.body.techStack
        : typeof req.body.techStack === 'string'
        ? req.body.techStack.split(',').map(t => t.trim()).filter(Boolean)
        : [];
    }

    // Add new image if uploaded
    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      message: 'Project updated.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};


// ========================================
// ❌ DELETE PROJECT
// ========================================
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      message: 'Project deleted.',
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getProjects,
  getAllProjectsAdmin,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};