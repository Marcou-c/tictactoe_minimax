import React, { useState } from "react";
import Square from "../components/Square";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const initialBoard = Array(9).fill(null);

export default function GamePage() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [message, setMessage] = useState("¡Tu turno!");
  const [particles, setParticles] = useState([]);

  const placeSound = new Audio("/sounds/place.mp3");
  const winSound = new Audio("/sounds/lose.mp3");  
  const loseSound = new Audio("/sounds/win.mp3");  
  const tieSound = new Audio("/sounds/tie.mp3");

  const spawnParticles = (color) => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      color,
      size: Math.random() * 8 + 4,
      id: Math.random(),
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  function handleClick(index) {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    placeSound.play();
    setBoard(newBoard);
    setMessage("Turno IA...");

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
      setMessage("¡Tu turno!");
    }, 600);
  }

  function handleWinner({ player, line }) {
    setWinner(player);
    setWinningLine(line || []);
    if (player === "X") {
      setMessage("¡Ganaste! :)");
      winSound.play();
      spawnParticles("#00FF00");
    } else if (player === "O") {
      setMessage("¡Perdiste! :(");
      loseSound.play();
      spawnParticles("#FF0000");
    } else {
      setMessage("¡Empate! :o");
      tieSound.play();
      spawnParticles("#00FFFF");
    }
  }

  return (
    <div className="relative flex flex-col justify-between items-center min-h-screen bg-black font-['Press_Start_2P'] text-white p-4">

      {/* Mensaje arriba */}
      <motion.h1
        className={`text-2xl sm:text-3xl md:text-4xl mt-4 z-10 text-center ${
          winner === "X" ? "text-green-400" :
          winner === "O" ? "text-red-500" :
          winner === "Empate" ? "text-yellow-400" : "text-white"
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        {message}
      </motion.h1>

      {/* Tablero y botones en el centro */}
      <div className="flex flex-col items-center z-10">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6">
          {board.map((value, i) => (
            <Square
              key={i}
              value={value}
              onClick={() => handleClick(i)}
              highlight={winningLine.includes(i)}
            />
          ))}
        </div>

        {winner && (
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <motion.button
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg border-2 border-white hover:bg-gray-700 text-white"
              onClick={() => {
                setBoard(initialBoard);
                setWinner(null);
                setWinningLine([]);
                setIsPlayerTurn(true);
                setMessage("¡Tu turno!");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Reiniciar
            </motion.button>

            <motion.button
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg border-2 border-red-500 hover:bg-red-700 text-red-500"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Salir
            </motion.button>
          </div>
        )}
      </div>

      {/* Partículas solo al ganar */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            left: "50%",
            top: "50%",
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}

      {/* Footer abajo */}
      <Footer />
    </div>
  );
}

// ---------------------- LÓGICA MINIMAX ----------------------

function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a,b,c] };
    }
  }
  return board.includes(null) ? null : { player: "Empate" };
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
    if (result.player === "O") return 1;
    if (result.player === "X") return -1;
    return 0;
  }

  if (isMax) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        bestScore = Math.max(bestScore, minimax(board, depth+1, false));
        board[i] = null;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        bestScore = Math.min(bestScore, minimax(board, depth+1, true));
        board[i] = null;
      }
    }
    return bestScore;
  }
}
