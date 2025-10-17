import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import devImg from "../assets/dev1.jpeg"; // tu imagen o avatar

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 font-['Press_Start_2P'] overflow-hidden">

      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-black bg-repeat opacity-10"></div>

      <motion.div
        className="relative z-10 max-w-3xl w-full text-center space-y-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        {/* Sección desarrollador */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={devImg}
            alt="Desarrollador"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Marco Ugalde 👨‍💻</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-md">
            Soy estudiante de ingeniería en sistemas, amante de la música.
            Este proyecto busca combinar un juego clásico con un enfoque profesional, retro y educativo.
          </p>
        </div>

        <hr className="border-gray-600" />

        {/* Sección Minimax */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">¿Qué es MINI-MAX? 🤖</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-md mx-auto">
            El algoritmo <b>MINIMAX</b> es una técnica de inteligencia artificial usada para tomar decisiones óptimas en juegos de dos jugadores. 
            Evalúa recursivamente todos los posibles movimientos futuros, asignando un valor a cada escenario según quién tenga la ventaja.  
            La IA asume que el jugador contrario siempre tomará la mejor decisión posible.  
            Así, el algoritmo elige el movimiento que maximiza su ganancia mínima garantizada, asegurando un juego óptimo.
          </p>
        </div>

        <motion.button
          className="mt-6 px-6 py-3 rounded-xl border-2 border-white text-white hover:bg-gray-700 transition-colors duration-300"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver
        </motion.button>
      </motion.div>

      {/* Nombre y año */}
      <p className="absolute bottom-4 text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} Marco Ugalde. Todos los derechos reservados.
      </p>
    </div>
  );
}
