import React, { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue, currentValue: value })
      )}
    </div>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={`flex mb-4 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value: tabValue, children, value, setValue, currentValue }) {
  const active = currentValue === tabValue;
  return (
    <button
      onClick={() => setValue(tabValue)}
      className={`px-4 py-2 ${active ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"} rounded`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value: tabValue, value, currentValue, children }) {
  if (tabValue !== currentValue) return null;
  return <div>{children}</div>;
}
