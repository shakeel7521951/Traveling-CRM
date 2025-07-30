import { useState } from 'react';
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

// Sample data for multiple time filters
const dataByFilter = {
  Today: [
    { station: 'JED', male: 5, female: 3, total: 8 },
    { station: 'RUH', male: 4, female: 2, total: 6 },
    { station: 'DMM', male: 3, female: 3, total: 6 },
    { station: 'MED', male: 2, female: 3, total: 5 },
    { station: 'CAI', male: 4, female: 1, total: 5 },
    { station: 'DUM', male: 3, female: 2, total: 5 },
    { station: 'LOP', male: 6, female: 4, total: 10 },
    { station: 'QUE', male: 3, female: 3, total: 6 },
    { station: 'CRM', male: 2, female: 1, total: 3 },
    { station: 'KTM', male: 5, female: 5, total: 10 },
    { station: 'LWM', male: 4, female: 2, total: 6 },
    { station: 'SWD', male: 6, female: 3, total: 9 },
    { station: 'KEO', male: 5, female: 4, total: 9 },
    { station: 'POW', male: 8, female: 6, total: 14 },
    { station: 'DHO', male: 3, female: 3, total: 6 },
    { station: 'HJO', male: 4, female: 3, total: 7 },
    { station: 'NBO', male: 6, female: 5, total: 11 },
    { station: 'DXB', male: 7, female: 6, total: 13 },
  ],

  'This Week': [
    { station: 'JED', male: 40, female: 25, total: 65 },
    { station: 'RUH', male: 38, female: 20, total: 58 },
    { station: 'DMM', male: 35, female: 33, total: 68 },
    { station: 'MED', male: 30, female: 28, total: 58 },
    { station: 'CAI', male: 37, female: 18, total: 55 },
    { station: 'DUM', male: 32, female: 20, total: 52 },
    { station: 'LOP', male: 42, female: 38, total: 80 },
    { station: 'QUE', male: 29, female: 30, total: 59 },
    { station: 'CRM', male: 22, female: 18, total: 40 },
    { station: 'KTM', male: 40, female: 39, total: 79 },
    { station: 'LWM', male: 33, female: 27, total: 60 },
    { station: 'SWD', male: 41, female: 26, total: 67 },
    { station: 'KEO', male: 39, female: 32, total: 71 },
    { station: 'POW', male: 48, female: 42, total: 90 },
    { station: 'DHO', male: 29, female: 31, total: 60 },
    { station: 'HJO', male: 35, female: 29, total: 64 },
    { station: 'NBO', male: 41, female: 38, total: 79 },
    { station: 'DXB', male: 44, female: 37, total: 81 },
  ],

  'This Month': [
    { station: 'JED', male: 160, female: 140, total: 300 },
    { station: 'RUH', male: 150, female: 120, total: 270 },
    { station: 'DMM', male: 130, female: 140, total: 270 },
    { station: 'MED', male: 125, female: 135, total: 260 },
    { station: 'CAI', male: 145, female: 110, total: 255 },
    { station: 'DUM', male: 135, female: 115, total: 250 },
    { station: 'LOP', male: 165, female: 155, total: 320 },
    { station: 'QUE', male: 120, female: 125, total: 245 },
    { station: 'CRM', male: 110, female: 95, total: 205 },
    { station: 'KTM', male: 155, female: 150, total: 305 },
    { station: 'LWM', male: 135, female: 125, total: 260 },
    { station: 'SWD', male: 160, female: 130, total: 290 },
    { station: 'KEO', male: 155, female: 140, total: 295 },
    { station: 'POW', male: 180, female: 165, total: 345 },
    { station: 'DHO', male: 130, female: 135, total: 265 },
    { station: 'HJO', male: 140, female: 130, total: 270 },
    { station: 'NBO', male: 165, female: 160, total: 325 },
    { station: 'DXB', male: 170, female: 150, total: 320 },
  ],

  'All Time': [
    { station: 'JED', male: 1800, female: 1700, total: 3500 },
    { station: 'RUH', male: 1750, female: 1600, total: 3350 },
    { station: 'DMM', male: 1650, female: 1750, total: 3400 },
    { station: 'MED', male: 1600, female: 1680, total: 3280 },
    { station: 'CAI', male: 1720, female: 1580, total: 3300 },
    { station: 'DUM', male: 1680, female: 1610, total: 3290 },
    { station: 'LOP', male: 1820, female: 1800, total: 3620 },
    { station: 'QUE', male: 1550, female: 1600, total: 3150 },
    { station: 'CRM', male: 1450, female: 1400, total: 2850 },
    { station: 'KTM', male: 1790, female: 1750, total: 3540 },
    { station: 'LWM', male: 1650, female: 1620, total: 3270 },
    { station: 'SWD', male: 1800, female: 1680, total: 3480 },
    { station: 'KEO', male: 1720, female: 1650, total: 3370 },
    { station: 'POW', male: 1950, female: 1900, total: 3850 },
    { station: 'DHO', male: 1600, female: 1580, total: 3180 },
    { station: 'HJO', male: 1680, female: 1650, total: 3330 },
    { station: 'NBO', male: 1800, female: 1780, total: 3580 },
    { station: 'DXB', male: 1850, female: 1770, total: 3620 },
  ],
};

const PassengerDataOverview = () => {
  const [timeFilter, setTimeFilter] =useState('Today');
  const chartData = dataByFilter[timeFilter];

  return (
    <div className="bg-white shadow-xl mb-10 mt-3 p-4 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-black">
          Passenger Overview ({timeFilter})
        </h2>
        <select
          className="p-2 rounded-md border border-gray-300 text-sm text-gray-800 dark:text-white dark:bg-gray-800"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          {Object.keys(dataByFilter).map((filter) => (
            <option key={filter}>{filter}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="station"
            tick={{ fill: '#4B5563' }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis tick={{ fill: '#4B5563' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="male" fill="#60a5fa" name="Male Passengers" />
          <Bar dataKey="female" fill="#f472b6" name="Female Passengers" />
          <Bar dataKey="total" fill="#34d399" name="Total Passengers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PassengerDataOverview;
