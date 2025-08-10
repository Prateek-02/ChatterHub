// backend/src/server.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const socketHandler = require('./sockets');      // <-- loads the socket logic
const errorHandler = require('./middleware/errorHandler'); // optional

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] },
});

// ---------- MIDDLEWARE ----------
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// ---------- ROUTES ----------
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// ---------- SOCKET.IO ----------
socketHandler(io);   // attach all socket listeners

// ---------- ERROR HANDLER ----------
app.use(errorHandler);   // catches any thrown errors (optional)

// ---------- SERVE REACT BUILD IN PRODUCTION ----------
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', '..', 'frontend', 'build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

// ---------- SERVER START ----------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Backend listening on http://localhost:${PORT}`);
  });
});