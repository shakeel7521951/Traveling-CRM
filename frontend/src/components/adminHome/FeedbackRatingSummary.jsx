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
    <div className="bg-white sm:w-6/12 w-full shadow-md rounded-lg p-4 mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-[#242C54]">
          Feedback Rating Summary ({timeFilter})
        </h2>
        <select
          className="p-2 rounded-md border border-gray-300 text-sm text-[#242C54] focus:border-[#E4141C] focus:ring-1 focus:ring-[#E4141C] outline-none transition-colors"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} ratings`, name]}
              contentStyle={{
                backgroundColor: '#242C54',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ 
                color: '#242C54',
                fontSize: '14px',
                paddingTop: '20px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeedbackRatingSummary;