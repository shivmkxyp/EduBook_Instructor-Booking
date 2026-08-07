const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Disable buffering so queries fail fast if DB isn't connected
    mongoose.set('bufferCommands', false);
    
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ MONGO_URI is not defined. Please add it to your secrets.');
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
  }
};

module.exports = connectDB;
