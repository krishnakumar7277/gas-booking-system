const express = require("express");
const {
  registerUser,
  loginUser,
  loginAdmin,
  createAdmin,
  forgotPassword,
  resetPassword,
  adminForgotPassword,
  adminResetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/admin/login", loginAdmin);
router.post("/admin/create", createAdmin);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/admin/forgot-password", adminForgotPassword);
router.post("/admin/reset-password", adminResetPassword);

module.exports = router;