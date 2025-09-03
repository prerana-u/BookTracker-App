/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";

const DropDown = ({ options, onSelect, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-60" ref={dropdownRef}>
      {/* Header */}
      <div
        className="flex justify-between items-center border-2 border-[#3E8FD6] rounded-sm px-3 py-2 cursor-pointer bg-white shadow-sm hover:shadow-md transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected ? (
          <div className="flex items-center gap-2">
            <img
              src={selected.image}
              alt={selected.label}
              className="w-5 h-5 object-cover"
            />
            <span className="text-[#505050]">{selected.label}</span>
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <span className="text-sm text-[#3E8FD6]">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </span>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              <img
                src={option.image}
                alt={option.label}
                className="w-5 h-5 object-cover"
              />
              <span className="text-[#505050]">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
