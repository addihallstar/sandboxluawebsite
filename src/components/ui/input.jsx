import React from "react";

export function Input({ type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-gray-800 text-white p-2 rounded ${className}`}
    />
  );
}
