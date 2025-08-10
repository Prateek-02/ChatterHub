// backend/src/sockets/index.js
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const User = require('../models/User');

module.exports = (io) => {
  // ---- AUTHENTICATE SOCKET CONNECTION (JWT) ----
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Missing auth token'));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id).select('-password');
      if (!user) return next(new Error('User not found'));

      socket.user = user; // attach user info to the socket instance
      next();
    } catch (err) {
      console.error('Socket auth error:', err);
      next(new Error('Invalid token'));
    }
  });

  // ---- EVENT LISTENERS ----
  io.on('connection', (socket) => {
    console.log(`🟢 ${socket.user.username} connected`);
    socket.join('global');

    // broadcast join notification
    socket.to('global').emit('notification', {
      text: `${socket.user.username} joined the chat`,
      type: 'join',
    });

    // handle a chat message
    socket.on('chatMessage', async (content, callback) => {
      if (!content?.trim()) {
        return callback({ status: 'error', message: 'Empty message' });
      }

      try {
        const msg = await Message.create({
          sender: socket.user._id,
          content,
        });

        // Populate the sender (Mongoose 7 syntax)
        const populated = await msg.populate('sender', 'username');

        // Send to everyone in the "global" room
        io.in('global').emit('chatMessage', populated);
        callback({ status: 'ok' });
      } catch (err) {
        console.error('Socket chatMessage error:', err);
        callback({ status: 'error', message: 'Failed to store message' });
      }
    });

    // disconnect handling
    socket.on('disconnect', () => {
      console.log(`🔴 ${socket.user.username} disconnected`);
      socket.to('global').emit('notification', {
        text: `${socket.user.username} left the chat`,
        type: 'leave',
      });
    });
  });
};