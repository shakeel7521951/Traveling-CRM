import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dataByFilter = {
  Today: [
    { station: 'JED', male: 5, female: 3, total: 8 },
    { station: 'RUH', male: 4, female: 2, total: 6 },
    { station: 'DXB', male: 7, female: 6, total: 13 },
  ],
  'This Week': [
    { station: 'JED', male: 40, female: 25, total: 65 },
    { station: 'RUH', male: 38, female: 20, total: 58 },
    { station: 'DXB', male: 44, female: 37, total: 81 },
  ],
};

const PassengerDataOverview = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const chartData = dataByFilter[timeFilter]; // ✅ always all stations

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#242C54]">Passenger Overview ({timeFilter})</h2>
        <select
          className="p-2 text-sm border rounded text-[#242C54]"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          {Object.keys(dataByFilter).map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="station" tick={{ fill: '#242C54' }} />
            <YAxis tick={{ fill: '#242C54' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" fill="#242C54" />
            <Bar dataKey="female" fill="#E4141C" />
            <Bar dataKey="total" fill="#64748b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PassengerDataOverview;
