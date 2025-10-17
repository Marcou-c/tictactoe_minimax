import { motion } from "framer-motion";

export default function Square({ value, onClick }) {
  const color = value === "X" ? "text-neon-blue" : "text-neon-pink";

  return (
    <motion.button
      onClick={onClick}
      className="w-24 h-24 bg-black border-2 border-neon-green rounded-lg text-4xl font-bold"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ color: value ? "white" : "transparent" }}
    >
      {value && <span className={color}>{value}</span>}
    </motion.button>
  );
}
