import React from "react";

export function Button({ children, onClick, disabled = false, className = "", type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
}
