const Booking = require("../models/Booking");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { cylinderType, quantity, deliveryAddress, paymentMode } = req.body;

    if (!cylinderType || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Cylinder type and delivery address are required",
      });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      cylinderType,
      quantity,
      deliveryAddress,
      paymentMode,
    });

    res.status(201).json({
      success: true,
      message: "Cylinder booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message,
    });
  }
};

// GET MY BOOKINGS
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};