const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', scoreRoutes);

// Basic route for health check
app.get('/', (req, res) => {
  res.json({ message: 'RPS Backend API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;