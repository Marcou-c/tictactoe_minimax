import { motion } from "framer-motion";

export default function Square({ value, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-900 border-2 border-gray-700 rounded-lg text-2xl sm:text-4xl md:text-5xl font-bold shadow-lg"
      whileHover={{ scale: 1.1, boxShadow: "0 0 15px #fff" }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
}
