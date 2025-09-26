import React from "react";

export default function Searchbar() {
  return (
    <div className="w-full h-full flex items-center bg-white border-4 border-[#1282A2] rounded-[6px] px-3 py-2">
      <input
        type="text"
        placeholder="Search books..."
        className="flex-grow bg-transparent outline-none text-black placeholder-gray-400"
      />
      <svg
        className="w-5 h-5 text-[#1282A2] ml-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}
