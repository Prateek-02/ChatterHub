// backend/src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/auth");

// @desc    Get all users except passwords
// @route   GET /api/users
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    // Exclude the current logged-in user from the list
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("-password")
      .sort({ username: 1 });

    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
