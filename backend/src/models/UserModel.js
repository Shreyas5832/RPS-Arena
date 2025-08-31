const { db } = require('../config/firebase');

// Function to interact with the 'users' collection in Firestore
const User = {
  // Create a new user
  create: async (username, hashedPassword) => {
    try {
      const userRef = db.collection('users').doc(username);
      const user = {
        username,
        password: hashedPassword,
        wins: 0,
        losses: 0,
        draws: 0,
        totalGames: 0,
        createdAt: new Date().toISOString(),
      };
      await userRef.set(user);
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  // Find a user by username
  findByUsername: async (username) => {
    try {
      const userRef = db.collection('users').doc(username);
      const doc = await userRef.get();
      if (!doc.exists) {
        return null;
      }
      return doc.data();
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  },

  // Update user stats after a game
  updateStats: async (username, result) => {
    try {
      const userRef = db.collection('users').doc(username);
      const user = await userRef.get();
      if (!user.exists) {
        throw new Error('User not found');
      }
      const stats = user.data();
      const updates = {
        wins: stats.wins + (result === 'win' ? 1 : 0),
        losses: stats.losses + (result === 'loss' ? 1 : 0),
        draws: stats.draws + (result === 'draw' ? 1 : 0),
        totalGames: stats.totalGames + 1,
      };
      await userRef.update(updates);
      return updates;
    } catch (error) {
      throw new Error('Error updating stats: ' + error.message);
    }
  },

  // Get leaderboard (top 10 players by win ratio)
  getLeaderboard: async () => {
    try {
      const snapshot = await db.collection('users')
        .orderBy('wins', 'desc')
        .limit(10)
        .get();
      const leaderboard = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const winRatio = data.totalGames > 0 ? (data.wins / data.totalGames).toFixed(2) : 0;
        leaderboard.push({
          username: data.username,
          wins: data.wins,
          losses: data.losses,
          draws: data.draws,
          totalGames: data.totalGames,
          winRatio,
        });
      });
      // Sort by win ratio
      return leaderboard.sort((a, b) => b.winRatio - a.winRatio);
    } catch (error) {
      throw new Error('Error fetching leaderboard: ' + error.message);
    }
  },
};

module.exports = User;