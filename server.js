const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static assets (CSS, JS, Images)

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/instructor', require('./routes/instructorRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));

// HTML View Routes
const serveView = (viewPath) => (req, res) => res.sendFile(path.join(__dirname, 'views', viewPath));

app.get('/', serveView('index.html'));
app.get('/login', serveView('login.html'));
app.get('/register', serveView('register.html'));

// Student Views
app.get('/student/dashboard', serveView('student/dashboard.html'));
app.get('/student/profile', serveView('student/profile.html'));
app.get('/student/instructorProfile', serveView('student/instructorProfile.html'));

// Instructor Views
app.get('/instructor/dashboard', serveView('instructor/dashboard.html'));
app.get('/instructor/profile', serveView('instructor/profile.html'));
app.get('/instructor/availability', serveView('instructor/availability.html'));
app.get('/instructor/services', serveView('instructor/services.html'));

// Booking Views
app.get('/booking/bookings', serveView('booking/bookings.html'));
app.get('/booking/reviews', serveView('booking/reviews.html'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
   