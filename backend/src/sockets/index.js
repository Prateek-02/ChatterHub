// backend/src/sockets/index.js
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const User = require("../models/User");

const onlineUsers = new Map(); // socket.id -> userId

module.exports = (io) => {
  // ---- AUTHENTICATE SOCKET CONNECTION (JWT) ----
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Missing auth token"));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id).select("-password");
      if (!user) return next(new Error("User not found"));

      socket.user = user; // attach user info to socket instance
      next();
    } catch (err) {
      console.error("Socket auth error:", err);
      next(new Error("Invalid token"));
    }
  });

  // ---- EVENT LISTENERS ----
  io.on("connection", (socket) => {
    console.log(`🟢 ${socket.user.username} connected`);

    // 1. Add to online users
    onlineUsers.set(socket.id, socket.user._id.toString());
    io.emit("users:update", Array.from(new Set(onlineUsers.values())));

    socket.join("global");

    // 2. Broadcast join notification
    socket.to("global").emit("notification", {
      text: `${socket.user.username} joined the chat`,
      type: "join",
    });

    // 3. Handle chat messages
    socket.on("chatMessage", async (content, callback) => {
      if (!content?.trim()) {
        return callback({ status: "error", message: "Empty message" });
      }

      try {
        const msg = await Message.create({
          sender: socket.user._id,
          content,
        });

        const populated = await msg.populate("sender", "username");

        io.in("global").emit("chatMessage", populated);
        callback({ status: "ok" });
      } catch (err) {
        console.error("Socket chatMessage error:", err);
        callback({ status: "error", message: "Failed to store message" });
      }
    });

    // 4. Handle disconnect
    socket.on("disconnect", () => {
      console.log(`🔴 ${socket.user.username} disconnected`);

      // Remove from online users and emit update
      onlineUsers.delete(socket.id);
      io.emit("users:update", Array.from(new Set(onlineUsers.values())));

      socket.to("global").emit("notification", {
        text: `${socket.user.username} left the chat`,
        type: "leave",
      });
    });
  });
};
