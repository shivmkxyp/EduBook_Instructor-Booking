const InstructorProfile = require('../models/InstructorProfile');
const Availability = require('../models/Availability');

exports.getProfile = async (req, res) => {
  try {
    const profile = await InstructorProfile.findOne({ userId: req.user._id }).populate('userId', 'name email');
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await InstructorProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const slots = await Availability.find({ instructorId: req.user._id }).sort({ date: 1, startTime: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, service, mode } = req.body;
    const slot = await Availability.create({ instructorId: req.user._id, date, startTime, endTime, service, mode });
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    await Availability.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slot removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
