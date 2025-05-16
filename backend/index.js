const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Mentors')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Socket.io
const Chat = require('./Models/Chat');

io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('privateMessage', async ({ sender, receiver, message }) => {
    if (!sender || !receiver || !message) return;

    try {
      const newMsg = new Chat({ sender, receiver, message });
      await newMsg.save();

      // Emit to all clients, you can optimize by emitting only to relevant users
      io.emit('privateMessage', {
        sender,
        receiver,
        message,
        timestamp: newMsg.timestamp,
      });
    } catch (err) {
      console.error('❌ Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
