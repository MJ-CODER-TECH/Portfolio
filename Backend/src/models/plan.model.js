const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    duration: { type: String, default: 'monthly' }, // monthly, yearly, one-time
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // for sorting
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);