const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContactStatus } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', protect, authorize('super-admin', 'ccl-admin'), getContacts);
router.put('/:id/status', protect, authorize('super-admin', 'ccl-admin'), updateContactStatus);

module.exports = router;
