const express = require("express");
const {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/bookings", protect, getAllBookings);
router.put("/bookings/:id/status", protect, updateBookingStatus);

module.exports = router;