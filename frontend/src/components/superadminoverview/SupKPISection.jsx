// components/superadminoverview/SupKPISection.jsx
import React from "react";
import {
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
} from "react-icons/fi";
import { MdOutlineTrain } from "react-icons/md";
import { TbPlaneArrival } from "react-icons/tb";

// Reusable Stat Card
const StatCard = ({ title, value, change, icon, changeType = "up", isLoading }) => {
  const changeColor =
    changeType === "up"
      ? "text-green-600 bg-green-50"
      : changeType === "down"
      ? "text-red-600 bg-red-50"
      : "text-gray-500 bg-gray-100";

  const ChangeIcon =
    changeType === "up"
      ? FiTrendingUp
      : changeType === "down"
      ? FiTrendingDown
      : FiMinus;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
          {isLoading ? (
            <span className="h-3 w-16 bg-gray-200 rounded animate-pulse inline-block"></span>
          ) : (
            title
          )}
        </h3>
        <div className="p-2 rounded-xl bg-gradient-to-br from-[#E4141C]/10 to-[#c1121f]/10">
          {React.cloneElement(icon, { className: "text-[#E4141C]", size: 20 })}
        </div>
      </div>

      {/* Value + Change */}
      <div className="flex items-end justify-between">
        {isLoading ? (
          <span className="h-8 w-20 bg-gray-200 rounded animate-pulse inline-block"></span>
        ) : (
          <p className="text-3xl font-bold text-[#242C54]">{value}</p>
        )}

        {change && !isLoading && (
          <span
            className={`text-sm font-medium flex items-center gap-1 px-2 py-1 rounded-lg ${changeColor}`}
          >
            <ChangeIcon size={14} />
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

const SupKPISection = ({ station = "All", data = {}, isLoading = false }) => {
  const metrics = {
    totalFlights: data.totalFlights || (station === "All" ? 150 : 15),
    arrivals: data.arrivals || (station === "All" ? 70 : 8),
    delayedFlights: data.delayedFlights || (station === "All" ? 10 : 2),
    totalPassengers: data.totalPassengers || (station === "All" ? 4670 : 430),
  };

  return (
    <div className="w-full py-10 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#242C54] mb-1">
            {station === "All" ? "Overall Performance" : `${station} Station Overview`}
          </h2>
          <p className="text-gray-600 text-sm">
            Key performance indicators for flights and operations
          </p>
        </div>

        {/* KPI Cards Grid (4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Flights"
            value={metrics.totalFlights}
            change="+5%"
            changeType="up"
            icon={<MdOutlineTrain />}
            isLoading={isLoading}
          />
          <StatCard
            title="Arrivals"
            value={metrics.arrivals}
            change="+2%"
            changeType="up"
            icon={<TbPlaneArrival />}
            isLoading={isLoading}
          />
          <StatCard
            title="Delayed Flights"
            value={metrics.delayedFlights}
            change="-1%"
            changeType="down"
            icon={<FiMinus />}
            isLoading={isLoading}
          />
          <StatCard
            title="Passengers"
            value={metrics.totalPassengers.toLocaleString()}
            change="+12%"
            changeType="up"
            icon={<FiUsers />}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SupKPISection;
