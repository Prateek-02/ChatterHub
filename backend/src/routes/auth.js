// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* -----------------------------------------------------------------
 *  Generate a signed JWT for a given user ID
 * ----------------------------------------------------------------- */
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });

/* -----------------------------------------------------------------
 *  REGISTER – create a new user
 * ----------------------------------------------------------------- */
router.post('/register', async (req, res) => {
  const { username, email, password, profilePic } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      profilePic: profilePic || '',
    });

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: user.safeUser,
    });
  } catch (err) {
    console.error('Register error:', err);

    // Handle duplicate key error (e.g. username or email already taken)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

/* -----------------------------------------------------------------
 *  LOGIN – authenticate an existing user
 * ----------------------------------------------------------------- */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({
      token,
      user: user.safeUser,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -----------------------------------------------------------------
 *  GET CURRENT USER – return the authenticated user's info
 * ----------------------------------------------------------------- */
const { protect } = require('../middleware/auth');

router.get('/me', protect, async (req, res) => {
  res.json(req.user.safeUser);
});

/* -----------------------------------------------------------------
 *  UPDATE CURRENT USER – update the authenticated user's profile
 * ----------------------------------------------------------------- */
router.put('/me', protect, async (req, res) => {
  const { username, email, profilePic, status } = req.body;

  try {
    // Check if email is being updated and if it's already taken by another user
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Check if username is being updated and if it's already taken by another user
    if (username && username !== req.user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // Update user fields
    req.user.username = username || req.user.username;
    req.user.email = email || req.user.email;
    req.user.profilePic = profilePic !== undefined ? profilePic : req.user.profilePic;
    req.user.status = status || req.user.status;

    // Save updated user
    const updatedUser = await req.user.save();

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser.safeUser,
    });
  } catch (err) {
    console.error('Update user error:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;