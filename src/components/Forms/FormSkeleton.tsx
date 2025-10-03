"use client";

import React from "react";

const CreateFormSkeleton = () => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow rounded-lg p-6 space-y-6 animate-pulse">
      {/* Title */}
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>

      {/* Input fields */}
      <div className="space-y-4">
        <div>
          <div className="h-4 w-1/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 w-1/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 w-1/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Submit button */}
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
    </div>
  );
};

export default CreateFormSkeleton;
