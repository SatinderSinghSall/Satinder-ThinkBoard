import React from "react";

const NoteCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow p-4 space-y-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
    </div>
  );
};

export default NoteCardSkeleton;
