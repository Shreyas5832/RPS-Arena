import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard();
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="my-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Rank</th>
              <th className="p-2">Username</th>
              <th className="p-2">Wins</th>
              <th className="p-2">Win Ratio</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={player.username} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{player.username}</td>
                <td className="p-2">{player.wins}</td>
                <td className="p-2">{player.winRatio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;