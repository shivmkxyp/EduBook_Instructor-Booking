# EduBook Backend

EduBook Backend is a RESTful API for an instructor booking platform where students can discover instructors, view their available time slots, book sessions, and leave reviews. The API provides secure authentication, role-based access control, booking management, and instructor availability management.

---

## Features

- User Registration & Login
- JWT Authentication
- Role-Based Authorization
- Instructor Profile Management
- Instructor Availability Management
- Session Booking System
- Review & Rating System
- MongoDB Database Integration
- Centralized Error Handling

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs

---

## Project Structure

```
EduBook/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── server.js
│
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
cd EduBook
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Running the Server

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

Server runs at

```
http://localhost:3000
```

---

## API Modules

### Authentication

- Register User
- Login User
- Get Current User

### Instructor

- Create Instructor Profile
- Update Instructor Profile
- Get Instructor Details

### Availability

- Add Available Slots
- Update Availability
- Delete Availability
- Get Instructor Availability

### Booking

- Book a Session
- View Bookings
- Cancel Booking

### Reviews

- Add Review
- View Reviews
- Calculate Instructor Ratings

---

## Authentication

Protected routes require a JWT token.

Example:

```
Authorization: Bearer <your_jwt_token>
```

---

## Error Handling

The API returns consistent JSON responses with appropriate HTTP status codes.

Example:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## Future Improvements

- Email Notifications
- Payment Integration
- File Uploads
- Calendar Synchronization
- Search & Filters
- Admin Dashboard

---

## Author

Developed as a backend project using Node.js, Express.js, and MongoDB.