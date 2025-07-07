import React from "react";

export function ScrollArea({ children, className = "" }) {
  return (
    <div className={`overflow-y-auto scrollbar-thin ${className}`}>
      {children}
    </div>
  );
}
