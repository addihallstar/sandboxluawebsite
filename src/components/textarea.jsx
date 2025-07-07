import React from "react";

export function Textarea({ value, onChange, className = "" }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`bg-gray-800 text-white p-2 rounded w-full h-40 ${className}`}
    />
  );
}
