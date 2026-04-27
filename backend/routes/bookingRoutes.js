const express = require("express");

const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE BOOKING
router.post("/create", protect, createBooking);

// GET MY BOOKINGS
router.get("/my-bookings", protect, getMyBookings);

module.exports = router;