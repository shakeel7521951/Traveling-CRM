// components/superadminoverview/SupKPISection.jsx
import React from "react";
import {
  FiUsers,
  FiLayers,
  FiPlayCircle,
  FiTrendingUp,
} from "react-icons/fi";
import {
  MdOutlineTrain,
} from "react-icons/md";
import { TbPlaneDeparture, TbPlaneArrival, TbClock, TbPlaneOff } from "react-icons/tb";

// Reusable Stat Card (Tailwind styled)
const StatCard = ({ title, value, change, icon, changeType = "up" }) => {
  const changeColor =
    changeType === "up"
      ? "text-green-600"
      : changeType === "down"
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl hover:translate-y-[-4px] group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-[#fef2f2] transition-colors">
          {React.cloneElement(icon, { className: "text-[#E4141C]", size: 20 })}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-[#242C54]">{value}</p>
        {change && (
          <span
            className={`text-sm font-medium flex items-center ${changeColor}`}
          >
            <FiTrendingUp size={16} className="mr-1" />
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
    departures: data.departures || (station === "All" ? 50 : 7),
    arrivals: data.arrivals || (station === "All" ? 70 : 8),
    delayedFlights: data.delayedFlights || (station === "All" ? 10 : 2),
    cancelledFlights: data.cancelledFlights || (station === "All" ? 5 : 1),
    totalPassengers: data.totalPassengers || (station === "All" ? 4670 : 430),
  };

  return (
    <div className="w-full py-8 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#242C54] mb-2">
            {station === "All"
              ? " Overview"
              : `${station} Station Overview`}
          </h2>
          <p className="text-gray-600">
            Key performance indicators for flights and operations
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Total Flights"
            value={metrics.totalFlights}
            change="+5%"
            icon={<MdOutlineTrain />}
          />
          <StatCard
            title="Departures"
            value={metrics.departures}
            change="+3%"
            icon={<TbPlaneDeparture />}
          />
          <StatCard
            title="Arrivals"
            value={metrics.arrivals}
            change="+2%"
            icon={<TbPlaneArrival />}
          />
          <StatCard
            title="Delayed Flights"
            value={metrics.delayedFlights}
            change="-1%"
            changeType="down"
            icon={<TbClock />}
          />
          <StatCard
            title="Cancelled Flights"
            value={metrics.cancelledFlights}
            change="-0.5%"
            changeType="down"
            icon={<TbPlaneOff />}
          />
          <StatCard
            title="Total Passengers"
            value={metrics.totalPassengers.toLocaleString()}
            change="+12%"
            icon={<FiUsers />}
          />
        </div>
      </div>
    </div>
  );
};

export default SupKPISection;
