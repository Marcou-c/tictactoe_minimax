import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white text-center">
      <motion.h1
        className="text-5xl font-bold mb-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
       GATO MINI MAX
      </motion.h1>

      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded-2xl font-semibold"
          onClick={() => navigate("/game")}
        >
          JUGAR
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 px-6 py-3 rounded-2xl font-semibold"
          onClick={() => navigate("/about")}
        >
          ACERCA DE
        </button>

      </div>
    </div>
  );
}
