import React from 'react';

const ChoiceButton = ({ choice, onSelect }) => {
  const getEmoji = (choice) => {
    switch (choice) {
      case 'rock':
        return '✊';
      case 'paper':
        return '✋';
      case 'scissors':
        return '✂️';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={() => onSelect(choice)}
      className="px-6 py-3 m-2 text-xl font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600"
    >
      {getEmoji(choice)} {choice.charAt(0).toUpperCase() + choice.slice(1)}
    </button>
  );
};

export default ChoiceButton;