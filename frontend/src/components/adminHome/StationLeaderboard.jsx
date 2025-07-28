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
    <div className="bg-white  shadow-xl md:w-6/12 w-full p-6  mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-black">
        Station Leaderboard – {category}
        </h2>
        <select
          className="p-2 rounded-md border dark:border-gray-700 text-sm text-gray-800 dark:text-white dark:bg-gray-800"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Passengers</option>
          <option>5★ Reviews</option>
          <option>Campaign Engagement</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={sortedChartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fill: '#6B7280' }} />
          <YAxis dataKey="station" type="category" tick={{ fill: '#6B7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Bar
            dataKey="value"
            fill="#6366F1"
            radius={[0, 10, 10, 0]}
            name={category}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StationLeaderboard;
