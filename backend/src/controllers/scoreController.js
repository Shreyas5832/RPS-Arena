const User = require('../models/UserModel');

// Play a game and update stats
const playGame = async (req, res) => {
  const { userChoice } = req.body;
  const username = req.user.username; // From authMiddleware
  if (!['rock', 'paper', 'scissors'].includes(userChoice)) {
    return res.status(400).json({ error: 'Invalid choice' });
  }

  try {
    // Computer's random choice
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Determine winner
    let result;
    if (userChoice === computerChoice) {
      result = 'draw';
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = 'win';
    } else {
      result = 'loss';
    }

    // Update user stats in Firestore
    const updatedStats = await User.updateStats(username, result);

    res.json({
      userChoice,
      computerChoice,
      result,
      stats: updatedStats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user stats
const getUserStats = async (req, res) => {
  try {
    const username = req.user.username; // From authMiddleware
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      wins: user.wins,
      losses: user.losses,
      draws: user.draws,
      totalGames: user.totalGames,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { playGame, getLeaderboard, getUserStats };