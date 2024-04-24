import React from 'react';
import './App.css';
const GameBoard = ({ board, handleClick, renderStatus, resetGame }) => {
  return (
    <div className="game-board-container">
      <div className="game-board">
      <h1 className="game-name">React Tac Toe</h1>
        <h2>Good Luck!</h2>
        <div className="status">{renderStatus()}</div>
        <div className="board">
          {board.map((value, index) => (
            <div key={index} className={`square ${value}`} onClick={() => handleClick(index)}>
              {value}
            </div>
          ))}
        </div>
        <button className="reset" onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
