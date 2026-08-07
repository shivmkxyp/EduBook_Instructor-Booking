const User = require('../models/User');
const InstructorProfile = require('../models/InstructorProfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name, email, password: hashedPassword, role
    });

    if (role === 'instructor') {
      await InstructorProfile.create({ userId: user._id });
    }

    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNjFhNGM4ZTliMGI1M2MxYmU0NWJiYyIsImlhdCI6MTc4NDc4NDA3MiwiZXhwIjoxNzg3Mzc2MDcyfQ.mzXuSFX0m7acMXS_SMt8R8E52Yup9Q04zAFQGc0E7Ww
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.me = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
};
