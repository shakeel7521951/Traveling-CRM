import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dataByFilter = {
  Today: [
    { station: "JED", male: 5, female: 3, total: 8 },
    { station: "RUH", male: 4, female: 2, total: 6 },
    { station: "DXB", male: 7, female: 6, total: 13 },
  ],
  "This Week": [
    { station: "JED", male: 40, female: 25, total: 65 },
    { station: "RUH", male: 38, female: 20, total: 58 },
    { station: "DXB", male: 44, female: 37, total: 81 },
  ],
};

// ✅ Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <p className="font-semibold text-[#242C54] mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-sm text-gray-700 flex justify-between"
          >
            <span>{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PassengerDataOverview = () => {
  const [timeFilter, setTimeFilter] = useState("Today");
  const chartData = dataByFilter[timeFilter];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#242C54]">
          Passenger Overview <span className="text-gray-500">({timeFilter})</span>
        </h2>
        <select
          className="p-2 text-sm border border-gray-200 rounded-lg text-[#242C54] focus:ring focus:ring-[#E4141C]/20"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          {Object.keys(dataByFilter).map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="station" tick={{ fill: "#242C54" }} />
            <YAxis tick={{ fill: "#242C54" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="male" name="Male Passengers" fill="#242C54" />
            <Bar dataKey="female" name="Female Passengers" fill="#E4141C" />
            <Bar dataKey="total" name="Total Passengers" fill="#64748b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PassengerDataOverview;
