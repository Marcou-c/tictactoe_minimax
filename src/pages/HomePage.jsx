import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  // Partículas retro cuadradas
  const particles = Array.from({ length: 60 }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    opacity: Math.random() * 0.7 + 0.2,
    delay: Math.random() * 2,
    color: Math.random() > 0.5 ? "#00ffff" : "#ff00ff",
  }));

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-['Press_Start_2P'] overflow-hidden p-4">

  {/* Partículas cuadradas */}
  {particles.map(p => (
    <motion.div
      key={p.id}
      className="absolute"
      style={{
        width: p.size,
        height: p.size,
        left: `${p.x}%`,
        top: `${p.y}%`,
        backgroundColor: p.color,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: p.opacity }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        delay: p.delay,
      }}
    />
  ))}

  {/* Fondo retro */}
  <div className="absolute inset-0 bg-black bg-repeat opacity-10"></div>

  {/* Contenido centrado */}
  <div className="flex flex-col items-center justify-center flex-1 z-10">
    <motion.h1
      className="text-5xl sm:text-6xl mb-16 z-10"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: [1, 1.02, 1], opacity: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
    >
      GATO MINI MAX
    </motion.h1>

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
  </div>

  {/* Footer siempre abajo */}
  <Footer />
</div>
  );
}
