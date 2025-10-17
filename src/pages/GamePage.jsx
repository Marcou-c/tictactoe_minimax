import React, { useState } from "react";
import Square from "../components/Square";

const initialBoard = Array(9).fill(null);

export default function GamePage() {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const placeSound = new Audio("/sounds/place.mp3");
  const winSound = new Audio("/sounds/win.mp3");
  const tieSound = new Audio("/sounds/tie.mp3");

  function handleClick(index) {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    placeSound.play();
    setBoard(newBoard);
    const check = checkWinner(newBoard);
    if (check) return handleWinner(check);

    setIsPlayerTurn(false);
    setTimeout(() => {
      const bestMove = findBestMove(newBoard);
      if (bestMove !== -1) {
        newBoard[bestMove] = "O";
        placeSound.play();
      }
      setBoard(newBoard);
      const checkAI = checkWinner(newBoard);
      if (checkAI) return handleWinner(checkAI);
      setIsPlayerTurn(true);
    }, 500);
  }

  function handleWinner(w) {
    setWinner(w);
    if (w === "Empate") tieSound.play();
    else winSound.play();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl mb-4 text-neon-green">
        {winner ? `Ganador: ${winner}` : `Turno: ${isPlayerTurn ? "Tú" : "IA"}`}
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {board.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>
      {winner && (
        <button
          className="mt-6 bg-neon-pink px-6 py-3 rounded-lg"
          onClick={() => {
            setBoard(initialBoard);
            setWinner(null);
            setIsPlayerTurn(true);
          }}
        >
          Reiniciar
        </button>
      )}
    </div>
  );
}

// ---------------------- LÓGICA MINIMAX ----------------------

function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return board.includes(null) ? null : "Empate";
}

function findBestMove(board) {
  let bestScore = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) { bestScore = score; move = i; }
    }
  }
  return move;
}

function minimax(board, depth, isMax) {
  const result = checkWinner(board);
  if (result !== null) {
    if (result === "O") return 1;
    if (result === "X") return -1;
    return 0;
  }

  if (isMax) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return bestScore;
  }
}
