import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#242C54',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#242C54' },
      grid: { color: '#f0f0f0' },
    },
    y: {
      ticks: { color: '#242C54' },
      grid: { color: '#f0f0f0' },
    },
  },
};

// Dummy data for Line Chart
const passengerTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Actual Passengers',
      data: [420, 480, 530, 610, 700, 760, 820],
      borderColor: '#242C54',
      backgroundColor: '#242C54',
      tension: 0.4,
    },
    {
      label: 'AI Forecast',
      data: [450, 500, 580, 650, 730, 810, 890],
      borderColor: '#E4141C',
      backgroundColor: '#E4141C',
      borderDash: [5, 5],
      tension: 0.4,
    },
  ],
};

// Dummy data for Pie Chart
const channelDistributionData = {
  labels: ['Website', 'Mobile App', 'Travel Agents', 'Call Center'],
  datasets: [
    {
      label: 'Bookings',
      data: [40, 30, 20, 10],
      backgroundColor: ['#242C54', '#E4141C', '#FDBA74', '#60A5FA'],
      borderWidth: 1,
    },
  ],
};

const Graph = () => {
  return (
    <div className="p-4 bg-gray-50 ">
      <h2 className="text-2xl font-bold text-[#242C54] mb-6">
        AI Analytics Graphs Section
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Passenger Trends (Line Chart) */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-[#242C54] mb-4">
            Passenger Trends (AI Forecast)
          </h3>
          <div className="h-64">
            <Line
              data={passengerTrendsData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    display: true,
                    text: 'Monthly Passenger Growth with AI Projection',
                    color: '#242C54',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Channel Distribution (Pie Chart) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-[#242C54] mb-4">
            Booking Channel Distribution
          </h3>
          <div className="h-64">
            <Pie
              data={channelDistributionData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    display: true,
                    text: 'Distribution by Booking Channel',
                    color: '#242C54',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
