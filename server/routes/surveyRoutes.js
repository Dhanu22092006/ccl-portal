const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');
const { protect, authorize } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.cclSlug) query.cclSlug = req.query.cclSlug;
    if (!req.user) query.isPublic = true;
    const surveys = await Survey.find(query).sort('-createdAt');
    res.json({ success: true, count: surveys.length, data: surveys });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, authorize('super-admin', 'ccl-admin'), async (req, res) => {
  try {
    const survey = await Survey.create(req.body);
    res.status(201).json({ success: true, data: survey });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/:id', protect, authorize('super-admin', 'ccl-admin'), async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!survey) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: survey });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
