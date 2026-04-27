const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes"); // ✅ NEW ADD
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Online Gas Booking Management System Backend Running with MongoDB");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes); // ✅ NEW ADD
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});