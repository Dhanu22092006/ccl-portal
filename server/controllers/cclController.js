const CCL = require('../models/CCL');

// @desc  Get all published CCLs
// @route GET /api/v1/ccls
// @access Public
const getCCLs = async (req, res) => {
  try {
    const ccls = await CCL.find({ isPublished: true }).sort('order');
    res.json({ success: true, count: ccls.length, data: ccls });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Get single CCL by slug
// @route GET /api/v1/ccls/:slug
// @access Public
const getCCL = async (req, res) => {
  try {
    const ccl = await CCL.findOne({ slug: req.params.slug, isPublished: true });
    if (!ccl) return res.status(404).json({ success: false, message: 'CCL not found' });
    res.json({ success: true, data: ccl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Create CCL
// @route POST /api/v1/ccls
// @access Private/Admin
const createCCL = async (req, res) => {
  try {
    const ccl = await CCL.create(req.body);
    res.status(201).json({ success: true, data: ccl });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc  Update CCL
// @route PUT /api/v1/ccls/:slug
// @access Private/Admin
const updateCCL = async (req, res) => {
  try {
    const ccl = await CCL.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ccl) return res.status(404).json({ success: false, message: 'CCL not found' });
    res.json({ success: true, data: ccl });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc  Delete CCL
// @route DELETE /api/v1/ccls/:slug
// @access Private/SuperAdmin
const deleteCCL = async (req, res) => {
  try {
    const ccl = await CCL.findOneAndDelete({ slug: req.params.slug });
    if (!ccl) return res.status(404).json({ success: false, message: 'CCL not found' });
    res.json({ success: true, message: 'CCL removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getCCLs, getCCL, createCCL, updateCCL, deleteCCL };
