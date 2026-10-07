const Story = require('../models/Story');

const getStories = async (req, res) => {
  try {
    const query = {};
    if (req.query.cclSlug) query.cclSlug = req.query.cclSlug;
    if (req.query.type) query.type = req.query.type;
    if (req.query.isHighlighted) query.isHighlighted = req.query.isHighlighted === 'true';
    // Public users only see public stories
    if (!req.user) query.isPublic = true;
    const stories = await Story.find(query).sort('-publishedAt').limit(Number(req.query.limit) || 50);
    res.json({ success: true, count: stories.length, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
    if (!story.isPublic && !req.user) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createStory = async (req, res) => {
  try {
    const story = await Story.create(req.body);
    res.status(201).json({ success: true, data: story });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
    res.json({ success: true, message: 'Story removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getStories, getStory, createStory, updateStory, deleteStory };
