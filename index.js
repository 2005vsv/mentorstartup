const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const startupRoutes = require('./routes/startupRoutes');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/Mentors';

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/startups', startupRoutes);

// MongoDB Connection and Server Start
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI); // ← No deprecated options here
    console.log('✅ MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
  }
};

startServer();
