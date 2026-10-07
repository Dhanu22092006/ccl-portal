const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    cclSlug: { type: String, default: 'portal' },
    type: {
      type: String,
      enum: ['contact', 'pledge', 'society-join', 'eco-tourism', 'newsletter'],
      default: 'contact',
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    organization: String,
    message: String,
    formData: { type: mongoose.Schema.Types.Mixed },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'actioned'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
