import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const leaderboardData = {
  Passengers: [
    { station: 'JED', value: 124 },
    { station: 'RUH', value: 98 },
    { station: 'DMM', value: 75 },
    { station: 'MED', value: 60 },
    { station: 'CAI', value: 49 },
  ],
  '5★ Reviews': [
    { station: 'JED', value: 98 },
    { station: 'RUH', value: 85 },
    { station: 'DMM', value: 60 },
    { station: 'MED', value: 35 },
    { station: 'CAI', value: 22 },
  ],
  'Campaign Engagement': [
    { station: 'JED', value: 72 },
    { station: 'RUH', value: 68 },
    { station: 'DMM', value: 55 },
    { station: 'MED', value: 30 },
    { station: 'CAI', value: 18 },
  ],
};

const StationLeaderboard = () => {
  const [category, setCategory] = useState('Campaign Engagement');
  const chartData = leaderboardData[category];
  const sortedChartData = chartData.slice().sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:w-6/12 w-full mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-[#242C54]">
          Station Leaderboard – {category}
        </h2>
        <select
          className="p-2 rounded-md border border-gray-300 text-sm text-[#242C54] focus:border-[#E4141C] focus:ring-1 focus:ring-[#E4141C] outline-none transition-colors"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Passengers</option>
          <option>5★ Reviews</option>
          <option>Campaign Engagement</option>
        </select>
      </div>

      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedChartData}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              tick={{ fill: '#242C54', fontSize: 12 }} 
            />
            <YAxis 
              dataKey="station" 
              type="category" 
              tick={{ fill: '#242C54', fontSize: 12 }} 
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#242C54',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <Legend
              wrapperStyle={{
                color: '#242C54',
                fontSize: '14px',
                paddingTop: '10px'
              }}
            />
            <Bar
              dataKey="value"
              fill="#E4141C"
              radius={[0, 4, 4, 0]}
              name={category}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StationLeaderboard;