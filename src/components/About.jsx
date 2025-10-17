import { useNavigate } from "react-router-dom";
import devImg from "../assets/dev.png"; // agrega una imagen tuya o ilustración

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 text-center">
      <img src={devImg} alt="Desarrollador" className="w-32 h-32 rounded-full mb-4" />
      <h1 className="text-4xl font-bold mb-2">Marquitos 👨‍💻</h1>
      <p className="max-w-lg mb-4">
        Soy estudiante de ingeniería en sistemas, amante de la música, la fe y el arte.  
        Este juego fue creado con el algoritmo <b>MINIMAX</b>, una técnica de inteligencia artificial
        usada para tomar decisiones óptimas en juegos como el Gato.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded-2xl font-semibold"
        onClick={() => navigate("/")}
      >
        Volver
      </button>
    </div>
  );
}
