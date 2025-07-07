import React from "react";

export function Card({ children }) {
  return <div className="rounded-lg border bg-card text-card-foreground shadow">{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
