import React from 'react';

const ScoreBoard = ({ stats }) => {
  return (
    <div className="my-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="font-semibold">Wins</p>
          <p>{stats.wins}</p>
        </div>
        <div>
          <p className="font-semibold">Losses</p>
          <p>{stats.losses}</p>
        </div>
        <div>
          <p className="font-semibold">Draws</p>
          <p>{stats.draws}</p>
        </div>
        <div>
          <p className="font-semibold">Total Games</p>
          <p>{stats.totalGames}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;