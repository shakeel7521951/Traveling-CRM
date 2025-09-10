// StatCard.js
import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center border border-gray-100 hover:shadow-md transition-all">
      <div className={`${color} text-white p-3 rounded-lg mr-4`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold text-[#242C54]">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;