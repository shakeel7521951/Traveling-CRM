// StatusBadge.js
import React from "react";

const StatusBadge = ({ status }) => {
  const statusClasses = {
    active: "bg-green-100 text-green-800",
    scheduled: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    draft: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;