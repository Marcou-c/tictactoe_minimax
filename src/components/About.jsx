import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import devImg from "../assets/dev1.jpeg";
import Footer from "../components/Footer"; 

export default function About() {
  const navigate = useNavigate();

  const particles = Array.from({ length: 40 }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.1,
    delay: Math.random() * 2,
  }));

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 font-['Press_Start_2P'] overflow-hidden">

      {/* Partículas */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: p.opacity }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: p.delay }}
        />
      ))}

      {/* Fondo */}
      <div className="absolute inset-0 bg-black bg-repeat opacity-10"></div>

      {/* Contenido */}
      <motion.div className="relative z-10 max-w-5xl w-full text-center space-y-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >

        {/* Sección desarrollador */}
        <motion.div className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.img src={devImg} alt="Desarrollador"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Marco Ugalde</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-3xl mx-auto">
            Soy estudiante de ingeniería en sistemas, amante de la música, la fe y el arte.  
            Este proyecto busca combinar un juego clásico con un enfoque profesional, retro y educativo.
          </p>
        </motion.div>

        <motion.hr className="border-gray-600" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.6 }} />

        {/* Sección Minimax */}
        <motion.div className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">¿Qué es MINI-MAX?</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-3xl mx-auto">
            El algoritmo <b>MINIMAX</b> es una técnica de inteligencia artificial usada para tomar decisiones óptimas en juegos de dos jugadores.  
            Evalúa recursivamente todos los posibles movimientos futuros, asignando un valor a cada escenario según quién tenga la ventaja.  
            La IA asume que el jugador contrario siempre tomará la mejor decisión posible.  
            Así, el algoritmo elige el movimiento que maximiza su ganancia mínima garantizada, asegurando un juego óptimo.
          </p>
        </motion.div>

        {/* Botón volver */}
        <motion.button className="mt-10 px-6 py-3 rounded-xl border-2 border-white text-white hover:bg-gray-700 transition-colors duration-300"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Volver
        </motion.button>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
