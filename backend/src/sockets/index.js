const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const User = require("../models/User");

const onlineUsers = new Map(); // socket.id -> userId

module.exports = (io) => {
  // Authenticate socket connection with JWT
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Missing auth token"));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id).select("-password");
      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (err) {
      console.error("Socket auth error:", err);
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 ${socket.user.username} connected`);

    // Track online user
    onlineUsers.set(socket.id, socket.user._id.toString());
    io.emit("users:update", Array.from(new Set(onlineUsers.values())));

    // Join user room for private messaging
    socket.join(socket.user._id.toString());

    // Chat message event handler
    socket.on("chatMessage", async ({ receiverId, text }, callback) => {
      if (!receiverId || !text?.trim()) {
        return callback?.({ status: "error", message: "Receiver and text required" });
      }

      try {
        // Create and save message
        let msg = await Message.create({
          sender: socket.user._id,
          recipient: receiverId,
          text: text.trim(),
        });

        // Populate sender and recipient fields for frontend
        msg = await msg.populate("sender", "username _id");
        msg = await msg.populate("recipient", "username _id");

        // Emit populated message to sender and recipient rooms
        io.to(socket.user._id.toString()).to(receiverId).emit("chatMessage", {
          _id: msg._id,
          senderId: msg.sender._id.toString(),
          senderUsername: msg.sender.username,
          receiverId: msg.recipient._id.toString(),
          receiverUsername: msg.recipient.username,
          text: msg.text,
          createdAt: msg.createdAt,
        });

        callback?.({ status: "ok" });
      } catch (err) {
        console.error("Socket chatMessage error:", err);
        callback?.({ status: "error", message: "Failed to store message" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔴 ${socket.user.username} disconnected`);
      onlineUsers.delete(socket.id);
      io.emit("users:update", Array.from(new Set(onlineUsers.values())));
    });
  });
};
