import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";

const StationGraph = ({ stations = [] }) => {
  // 📊 Chart Data Mapping with numeric safety
  const chartData =
    stations.length > 0
      ? stations.map((station) => ({
          name: station.name || "Unknown",
          Passengers: Number(station.totalPassengers) || 0,
          Occupancy: Number(station.occupancyRate) || 0,
          Campaigns: Number(station.activeCampaigns) || 0,
        }))
      : [
          // Fallback demo data
          { name: "Station A", Passengers: 120, Occupancy: 85, Campaigns: 3 },
          { name: "Station B", Passengers: 200, Occupancy: 90, Campaigns: 5 },
          { name: "Station C", Passengers: 150, Occupancy: 70, Campaigns: 2 },
        ];

  // 🐞 Debugging log
  console.log("Chart Data:", chartData);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="p-3 bg-purple-50 rounded-lg mr-3">
          <FiTrendingUp className="text-purple-600" size={20} />
        </div>
        <h2 className="text-xl font-bold text-[#242C54]">
          Station Performance Overview
        </h2>
      </div>

      {/* Graph */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis dataKey="name" tick={{ fill: "#242C54", fontSize: 12 }} />
          <YAxis tick={{ fill: "#242C54", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
            labelStyle={{ color: "#242C54", fontWeight: "600" }}
          />
          <Legend />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="Passengers"
            stroke="#242C54"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Occupancy"
            stroke="#3A4375"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Campaigns"
            stroke="#6b21a8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StationGraph;
