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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#242C54',
        font: {
          size: 12
        },
        padding: 20
      },
    },
  },
  scales: {
    x: {
      ticks: { 
        color: '#242C54',
        font: {
          size: 12
        }
      },
      grid: { 
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
    },
    y: {
      ticks: { 
        color: '#242C54',
        font: {
          size: 12
        }
      },
      grid: { 
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
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
      backgroundColor: 'rgba(36, 44, 84, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#242C54',
      pointRadius: 4,
      pointHoverRadius: 6
    },
    {
      label: 'AI Forecast',
      data: [450, 500, 580, 650, 730, 810, 890],
      borderColor: '#E4141C',
      backgroundColor: 'rgba(228, 20, 28, 0.1)',
      borderWidth: 2,
      borderDash: [5, 5],
      tension: 0.4,
      pointBackgroundColor: '#E4141C',
      pointRadius: 4,
      pointHoverRadius: 6
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
      backgroundColor: [
        '#242C54', 
        '#E4141C', 
        'rgba(36, 44, 84, 0.7)', 
        'rgba(228, 20, 28, 0.7)'
      ],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 10
    },
  ],
};

const Graph = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-[#242C54] mb-6">
        AI Analytics Graphs Section
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Passenger Trends (Line Chart) */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 lg:col-span-2 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#242C54] mb-4">
            Passenger Trends (AI Forecast)
          </h3>
          <div className="h-64 md:h-80">
            <Line
              data={passengerTrendsData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  tooltip: {
                    backgroundColor: '#242C54',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Channel Distribution (Pie Chart) */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#242C54] mb-4">
            Booking Channel Distribution
          </h3>
          <div className="h-64 md:h-80">
            <Pie
              data={channelDistributionData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  tooltip: {
                    backgroundColor: '#242C54',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;