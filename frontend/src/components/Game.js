import React, { useState } from 'react';
import ChoiceButton from './ChoiceButton';
import { playGame } from '../services/api';

const Game = ({ setStats }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePlay = async (userChoice) => {
    setLoading(true);
    try {
      const response = await playGame(userChoice);
      setResult(response.data);
      setStats(response.data.stats); // Update stats in parent (Home)
    } catch (error) {
      console.error('Error playing game:', error);
      setResult({ error: 'Failed to play game' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Play Rock Paper Scissors</h2>
      <div className="flex justify-center">
        <ChoiceButton choice="rock" onSelect={handlePlay} />
        <ChoiceButton choice="paper" onSelect={handlePlay} />
        <ChoiceButton choice="scissors" onSelect={handlePlay} />
      </div>
      {loading && <p className="text-center mt-4">Playing...</p>}
      {result && !loading && (
        <div className="mt-4 text-center">
          <p>
            You chose: <strong>{result.userChoice}</strong>
          </p>
          <p>
            Computer chose: <strong>{result.computerChoice}</strong>
          </p>
          <p className={`text-lg font-bold ${result.result === 'win' ? 'text-green-500' : result.result === 'loss' ? 'text-red-500' : 'text-yellow-500'}`}>
            Result: {result.result.charAt(0).toUpperCase() + result.result.slice(1)}
          </p>
          {result.error && <p className="text-red-500">{result.error}</p>}
        </div>
      )}
    </div>
  );
};

export default Game;