const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contact.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public
router.post('/', submitContact);

// Admin protected
router.get('/', protect, getAllContacts);
router.get('/:id', protect, getContactById);
router.put('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;