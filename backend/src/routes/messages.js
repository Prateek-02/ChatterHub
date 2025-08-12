// backend/src/routes/messages.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Message = require('../models/Message');

// GET messages between logged-in user and a recipient
router.get("/:recipientId", protect, async (req, res) => {
  try {
    const { recipientId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: recipientId },
        { sender: recipientId, recipient: req.user._id }
      ]
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username")
      .populate("recipient", "username");

    res.json(messages);
  } catch (err) {
    console.error("GET messages error:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// POST a new message to a specific user
router.post('/', protect, async (req, res) => {
  const { recipientId, text } = req.body;
  if (!recipientId || !text?.trim()) {
    return res.status(400).json({ message: 'Recipient and text required' });
  }

  try {
    const msg = await Message.create({
      sender: req.user._id,
      recipient: recipientId,
      text: text.trim(),
    });

    const populated = await msg
      .populate('sender', 'username')
      .populate('recipient', 'username');

    res.status(201).json(populated);
  } catch (err) {
    console.error('POST message error:', err);
    res.status(500).json({ message: 'Failed to post message' });
  }
});

module.exports = router;
