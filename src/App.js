import React, { useState } from 'react';
import './App.css';
import Confetti from 'react-confetti';
import GameBoard from './GameBoard';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = nextPlayer;
    setBoard(newBoard);

    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');

    const calculatedWinner = calculateWinner(newBoard);
    setWinner(calculatedWinner);

    if (calculatedWinner) {
      setConfettiActive(true);
      setTimeout(() => {
        setConfettiActive(false);
      }, 7000); // Adjust duration as needed
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      return 'Tie';
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer('X');
    setWinner(null);
  };

  const renderStatus = () => {
    if (winner && winner !== 'Tie') {
      const winnerColor = winner === 'X' ? 'goldenrod' : 'teal';
      return <span className={`flash increase-font`} style={{ color: winnerColor }}>Winner: {winner}</span>;
    } else if (winner === 'Tie') {
      return 'Tie';
    } else {
      return `Next player: ${nextPlayer}`;
    }
  };
  

  return (
    <div className="App">
      <div className="top-menu">{/* Add your top menu content here */}</div>
      <GameBoard board={board} handleClick={handleClick} renderStatus={renderStatus} resetGame={resetGame} />
      {confettiActive && <Confetti recycle={false} />}
    </div>
  );
};

export default App;
