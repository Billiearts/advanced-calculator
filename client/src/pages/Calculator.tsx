import { useState } from "react";
import { calculate } from "../utils/math";
import { motion } from "framer-motion";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      const res = calculate(input);
      setResult(res);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-96 bg-gray-900 rounded-3xl shadow-2xl p-6 border border-gray-700"
      >
        {/* Display */}
        <motion.div
          key={result || input} // animates whenever result/input changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black text-green-400 rounded-xl p-4 text-right text-3xl font-bold mb-6 min-h-[70px] flex items-center justify-end shadow-inner"
        >
          {result || input || "0"}
        </motion.div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <motion.button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`
                rounded-xl p-4 text-xl font-semibold shadow-md 
                transition-colors 
                ${
                  btn === "="
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : btn === "C"
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }
              `}
            >
              {btn}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
