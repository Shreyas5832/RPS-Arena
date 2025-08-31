import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Game from '../components/Game';
import ScoreBoard from '../components/ScoreBoard';
import Leaderboard from '../components/Leaderboard';
import { getUserStats } from '../services/api';

const Home = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0, totalGames: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getUserStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rock Paper Scissors</h1>
        <div>
          <span className="mr-4">Welcome, {user?.username}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <Game setStats={setStats} />
      <ScoreBoard stats={stats} />
      <Leaderboard />
    </div>
  );
};

export default Home;