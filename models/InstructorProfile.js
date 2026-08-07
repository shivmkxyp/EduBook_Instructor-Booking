const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  duration: Number
});

const instructorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profileImage: { type: String, default: 'default.jpg' },
  bio: String,
  experience: Number,
  qualifications: [String],
  languages: [String],
  services: [serviceSchema],
  mode: { type: String, default: 'Online' },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('InstructorProfile', instructorProfileSchema);
