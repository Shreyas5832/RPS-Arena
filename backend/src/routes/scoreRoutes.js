const express = require('express');
const router = express.Router();
const { playGame, getLeaderboard, getUserStats } = require('../controllers/scoreController');
const authMiddleware = require('../middlewares/authMiddleware');

// Play game route (protected)
router.post('/play', authMiddleware, playGame);

// Get leaderboard route (public)
router.get('/leaderboard', getLeaderboard);

// Get user stats route (protected)
router.get('/stats', authMiddleware, getUserStats);

module.exports = router;