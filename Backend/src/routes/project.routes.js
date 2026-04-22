const express = require('express');
const router = express.Router();

const {
  getProjects,
  getAllProjectsAdmin,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');

const { protect } = require('../middlewares/auth.middleware');
const upload = require('../config/multer'); // 👈 add this

// Public
router.get('/', getProjects);
// Admin protected
router.post('/', protect, upload.single('image'), createProject);
router.put('/:id', protect, upload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

// GET admin all (must be after /:id to avoid conflict)
router.get('/admin/all', protect, getAllProjectsAdmin);
router.get('/:id', getProjectById);

module.exports = router;