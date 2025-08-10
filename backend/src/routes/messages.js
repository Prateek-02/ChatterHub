// backend/src/routes/messages.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Message = require('../models/Message');

// GET last 50 messages (chronological order)
router.get('/', protect, async (req, res) => {
  try {
    const msgs = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('sender', 'username')
      .lean();               // returns plain JS objects (faster)
    res.json(msgs.reverse()); // reverse to oldest → newest
  } catch (err) {
    console.error('GET messages error:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// POST a new message (fallback for non‑socket clients)
router.post('/', protect, async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) {
    return res.status(400).json({ message: 'Message cannot be empty' });
  }

  try {
    const msg = await Message.create({
      sender: req.user._id,
      content,
    });

    // New Mongoose 7 style: populate returns the document itself
    const populated = await msg.populate('sender', 'username');

    res.status(201).json(populated);
  } catch (err) {
    console.error('POST message error:', err);
    res.status(500).json({ message: 'Failed to post message' });
  }
});

module.exports = router;