const express = require('express');
const router = express.Router();
const { getCCLs, getCCL, createCCL, updateCCL, deleteCCL } = require('../controllers/cclController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getCCLs);
router.get('/:slug', getCCL);
router.post('/', protect, authorize('super-admin', 'ccl-admin'), createCCL);
router.put('/:slug', protect, authorize('super-admin', 'ccl-admin'), updateCCL);
router.delete('/:slug', protect, authorize('super-admin'), deleteCCL);

module.exports = router;
