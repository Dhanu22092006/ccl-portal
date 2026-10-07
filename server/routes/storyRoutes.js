const express = require('express');
const router = express.Router();
const { getStories, getStory, createStory, updateStory, deleteStory } = require('../controllers/storyController');
const { protect, authorize } = require('../middleware/auth');

// Middleware to optionally decode user (public access still works)
const optionalAuth = async (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (_) {}
  }
  next();
};

router.get('/', optionalAuth, getStories);
router.get('/:id', optionalAuth, getStory);
router.post('/', protect, authorize('super-admin', 'ccl-admin'), createStory);
router.put('/:id', protect, authorize('super-admin', 'ccl-admin'), updateStory);
router.delete('/:id', protect, authorize('super-admin', 'ccl-admin'), deleteStory);

module.exports = router;
