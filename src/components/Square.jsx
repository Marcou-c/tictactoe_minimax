export default function Square({ value, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold rounded-lg 
        ${highlight ? "bg-[#FFD700] text-black" : "bg-gray-800 hover:bg-gray-700"}`}
    >
      {value}
    </button>
  );
}
