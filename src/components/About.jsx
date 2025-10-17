import { useNavigate } from "react-router-dom";
import devImg from "../assets/dev1.jpeg"; // tu imagen o avatar

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 font-['Press_Start_2P'] overflow-hidden">
      
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-black bg-repeat opacity-10"></div>

      <div className="relative z-10 max-w-3xl w-full text-center space-y-10">
        {/* Sección desarrollador */}
        <div className="flex flex-col items-center space-y-4">
          <img src={devImg} alt="Desarrollador" className="w-32 h-32 rounded-full shadow-lg" />
          <h1 className="text-3xl font-bold">Marco Ugalde 👨‍💻</h1>
          <p className="text-sm max-w-md text-gray-300">
            Soy estudiante de ingeniería en sistemas, amante de la música, la fe y el arte.  
            Este proyecto busca mostrar un juego clásico con un enfoque profesional y retro.
          </p>
        </div>

        <hr className="border-gray-600" />

        {/* Sección Minimax */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">¿Qué es MINI-MAX? 🤖</h2>
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            El algoritmo <b>MINIMAX</b> es una técnica de inteligencia artificial utilizada para tomar decisiones óptimas en juegos como el Gato.  
            Se asegura de que la IA siempre juegue la mejor jugada posible, evaluando todos los posibles movimientos futuros.
          </p>
        </div>

        <button
          className="mt-6 px-6 py-3 rounded-xl border-2 border-white text-white hover:bg-gray-700 transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      {/* Nombre y año */}
      <p className="absolute bottom-4 text-xs text-gray-400">
         © {new Date().getFullYear()} Marco Ugalde. Todos los derechos reservados.
      </p>
    </div>
  );
}
