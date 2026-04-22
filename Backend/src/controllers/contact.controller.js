const Contact = require('../models/contact.model');

// @desc    Submit contact form (Public)
// @route   POST /api/contact
const submitContact = async (req, res, next) => {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for'];
    const contact = await Contact.create({ ...req.body, ipAddress });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts (Admin)
// @route   GET /api/contact
const getAllContacts = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact (Admin)
// @route   GET /api/contact/:id
const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'read' } },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status (Admin)
// @route   PUT /api/contact/:id/status
const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'read', 'replied', 'archived'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.json({ success: true, message: 'Status updated.', data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact (Admin)
// @route   DELETE /api/contact/:id
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getAllContacts, getContactById, updateContactStatus, deleteContact };