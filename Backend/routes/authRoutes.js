const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");
const protect = require("../middleware/auth");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/me", protect, authCtrl.getMe);

module.exports = router;
// Note: In a real app, you'd add routes for password reset, email verification, etc.