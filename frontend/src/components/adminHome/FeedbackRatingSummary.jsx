import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const dataByFilter = {
  'Today': [
    { name: '5★', value: 12 },
    { name: '4★', value: 4 },
    { name: '3★', value: 2 },
    { name: '2★', value: 1 },
    { name: '1★', value: 1 },
  ],
  'This Week': [
    { name: '5★', value: 48 },
    { name: '4★', value: 20 },
    { name: '3★', value: 5 },
    { name: '2★', value: 3 },
    { name: '1★', value: 2 },
  ],
  'This Month': [
    { name: '5★', value: 210 },
    { name: '4★', value: 80 },
    { name: '3★', value: 25 },
    { name: '2★', value: 10 },
    { name: '1★', value: 5 },
  ],
  'All Time': [
    { name: '5★', value: 1850 },
    { name: '4★', value: 630 },
    { name: '3★', value: 220 },
    { name: '2★', value: 95 },
    { name: '1★', value: 50 },
  ],
};

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#991B1B'];

const FeedbackRatingSummary = () => {
  const [timeFilter, setTimeFilter] = useState('This Month');

  const chartData = dataByFilter[timeFilter];

  return (
    <div className="bg-white md:w-6/12 shadow-xl rounded-2xl p-6   mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold  dark:text-black">
            Feedback Rating Summary ({timeFilter})
        </h2>
        <select
          className="p-2 rounded-md border dark:border-gray-700 text-sm text-gray-800 dark:text-white dark:bg-gray-800"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350} className={' border'}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeedbackRatingSummary;
