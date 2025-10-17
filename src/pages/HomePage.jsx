import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-['Press_Start_2P'] overflow-hidden">
      
      {/* Fondo retro sutil */}
      <div className="absolute inset-0 bg-black bg-repeat opacity-10"></div>

      {/* Título */}
      <motion.h1
        className="text-5xl sm:text-6xl mb-16"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
      >
        GATO MINI MAX
      </motion.h1>

      {/* Botones */}
      <div className="flex flex-col gap-6 z-10">
        <motion.button
          className="px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-gray-700 transition-colors duration-300 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/game")}
        >
          JUGAR
        </motion.button>

        <motion.button
          className="px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-gray-700 transition-colors duration-300 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/about")}
        >
          ACERCA DE
        </motion.button>
      </div>

      {/* Nombre y año */}
      <p className="absolute bottom-4 text-xs text-gray-400">
         © {new Date().getFullYear()} Marco Ugalde. Todos los derechos reservados.
      </p>
    </div>
  );
}
