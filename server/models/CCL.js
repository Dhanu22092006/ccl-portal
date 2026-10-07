const mongoose = require('mongoose');

const collaboratorSchema = new mongoose.Schema({
  name: String,
  type: String,
  logo: String,
  website: String,
});

const CCLSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    shortName: { type: String },
    tagline: { type: String },
    location: {
      city: String,
      district: String,
      state: { type: String, default: 'Maharashtra' },
      coordinates: { lat: Number, lng: Number },
    },
    coverImage: { type: String, default: '' },
    logo: { type: String, default: '' },
    theme: {
      primaryColor: { type: String, default: '#1e40af' },
      secondaryColor: { type: String, default: '#16a34a' },
      accentColor: { type: String, default: '#f59e0b' },
    },
    status: {
      type: String,
      enum: ['active', 'coming-soon', 'placeholder'],
      default: 'coming-soon',
    },
    description: { type: String },
    about: {
      legacy: String,
      vision: String,
      mission: String,
    },
    team: [
      {
        name: String,
        role: String,
        bio: String,
        photo: String,
        contact: String,
      },
    ],
    collaborators: [collaboratorSchema],
    contactInfo: {
      email: String,
      phone: String,
      address: String,
      socialMedia: {
        facebook: String,
        instagram: String,
        twitter: String,
        youtube: String,
      },
    },
    menu: [
      {
        label: String,
        slug: String,
        icon: String,
        isPublic: { type: Boolean, default: true },
        subItems: [
          {
            label: String,
            slug: String,
            isPublic: { type: Boolean, default: true },
          },
        ],
      },
    ],
    stats: [
      {
        label: String,
        value: String,
        unit: String,
        icon: String,
      },
    ],
    importantLinks: [
      {
        title: String,
        url: String,
        description: String,
        category: String,
      },
    ],
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CCL', CCLSchema);
