import { useState } from "react";

function SearchBox({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="https://github.com/facebook/react"
        className="flex-1 p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/20"
      >
        Analyze
      </button>
    </form>
  );
}

export default SearchBox;