const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema(
  {
    cclSlug: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: [
        'success-story',
        'community-story',
        'oral-history',
        'wastepicker-story',
        'fisherman-story',
        'youth-voice',
        'general',
      ],
      default: 'general',
    },
    title: { type: String, required: true },
    subtitle: String,
    content: String,
    excerpt: String,
    author: {
      name: String,
      bio: String,
      photo: String,
      community: String,
    },
    tags: [String],
    media: [
      {
        type: { type: String, enum: ['image', 'video', 'audio'], default: 'image' },
        url: String,
        thumbnailUrl: String,
        caption: String,
        credit: String,
      },
    ],
    isPublic: { type: Boolean, default: true },
    isHighlighted: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    section: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', StorySchema);
