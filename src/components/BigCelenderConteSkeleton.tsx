import React from "react";

export default function BigCelenderSkeleton() {
  return (
    <div className="w-full h-full bg-gray-200 rounded-md p-4 animate-pulse">
      {/* Month / Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-32 h-6 bg-gray-300 rounded-md" />
        <div className="w-10 h-6 bg-gray-300 rounded-md" />
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded-md" />
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-300 rounded-md" />
        ))}
      </div>

      {/* Schedule slots / events placeholder */}
      <div className="flex flex-col gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-300 rounded-md w-full" />
        ))}
      </div>
    </div>
  );
}
