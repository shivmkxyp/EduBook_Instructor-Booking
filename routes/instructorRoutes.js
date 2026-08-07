const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { getProfile, updateProfile, getAvailability, addSlot, deleteSlot } = require('../controllers/instructorController');

router.get('/profile', protect, authorize('instructor'), getProfile);
router.put('/profile', protect, authorize('instructor'), updateProfile);

router.get('/availability', protect, authorize('instructor'), getAvailability);
router.post('/availability', protect, authorize('instructor'), addSlot);
router.delete('/availability/:id', protect, authorize('instructor'), deleteSlot);

module.exports = router;
