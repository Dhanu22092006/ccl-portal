const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema(
  {
    cclSlug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: String,
    surveyDate: Date,
    data: { type: mongoose.Schema.Types.Mixed },
    summary: String,
    keyFindings: [String],
    isPublic: { type: Boolean, default: false },
    downloadUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Survey', SurveySchema);
