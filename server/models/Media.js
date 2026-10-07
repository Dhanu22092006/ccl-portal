const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
  {
    cclSlug: { type: String, required: true, index: true },
    title: String,
    type: {
      type: String,
      enum: ['image', 'video', 'audio', 'document'],
      default: 'image',
    },
    url: { type: String, required: true },
    thumbnailUrl: String,
    caption: String,
    credit: String,
    tags: [String],
    section: String,
    isPublic: { type: Boolean, default: true },
    fileSize: Number,
    mimeType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Media', MediaSchema);
