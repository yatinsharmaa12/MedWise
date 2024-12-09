const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require("dotenv");
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const docRoutes = require('./src/routes/docRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/doc', docRoutes);

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io to the server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('sendMessage', ({ room, message }) => {
    io.to(room).emit('message', { text: message, sender: 'user' });
  });

  socket.on('leave', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Server listening
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
