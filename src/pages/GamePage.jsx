import React, { useState, useEffect } from "react";
import Square from "../components/Square";
import { motion } from "framer-motion";

const initialBoard = Array(9).fill(null);

export default function GamePage() {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("Tu turno");

  const placeSound = new Audio("/sounds/place.mp3");
  const winSound = new Audio("/sounds/win.mp3");
  const loseSound = new Audio("/sounds/lose.mp3");
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
    setMessage("Turno IA");

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
      setMessage("Tu turno");
    }, 600);
  }

  function handleWinner(w) {
    setWinner(w);
    if (w === "X") {
      setMessage("¡Ganaste! 🎉");
      winSound.play();
    } else if (w === "O") {
      setMessage("¡Perdiste! 😢");
      loseSound.play();
    } else {
      setMessage("¡Empate! 🤝");
      tieSound.play();
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black font-['Press_Start_2P'] text-white overflow-hidden">
      {/* Fondo arcade */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-black bg-repeat opacity-20 animate-pulse"></div>
      </div>

      {/* Mensaje dinámico */}
      <motion.h1
        className="text-3xl sm:text-4xl mb-6 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {message}
      </motion.h1>

      {/* Tablero */}
      <div className="grid grid-cols-3 gap-6 z-10">
        {board.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      {/* Botón reiniciar */}
      {winner && (
        <motion.button
          className="mt-6 px-8 py-3 rounded-xl border-2 border-white hover:bg-gray-700 text-white z-10"
          onClick={() => {
            setBoard(initialBoard);
            setWinner(null);
            setIsPlayerTurn(true);
            setMessage("Tu turno");
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Reiniciar
        </motion.button>
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
