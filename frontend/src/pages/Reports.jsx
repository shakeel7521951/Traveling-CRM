import React, { useState } from 'react';
import {
  FiDownload,
  FiFilter,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiBarChart2,
  FiPieChart,
  FiPrinter
} from 'react-icons/fi';
import { FiMail } from "react-icons/fi";

const Reports = () => {
  // State for filters
  const [dateRange, setDateRange] = useState('last30');
  const [stationFilter, setStationFilter] = useState('all');
  const [expandedSection, setExpandedSection] = useState({
    passengerStats: true,
    feedbackStats: true,
    campaignStats: false
  });

  // Sample data - replace with API calls
  const stations = ['All Stations', 'JED', 'RUH', 'DXB', 'CAI', 'IST', 'KRT'];
  const passengerMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const passengerCounts = [3200, 2800, 4100, 2200, 3500, 4200];
  const maxPassengers = Math.max(...passengerCounts);

  const feedbackRatings = [
    { stars: 5, count: 65, color: '#4CAF50' },
    { stars: 4, count: 15, color: '#8BC34A' },
    { stars: 3, count: 10, color: '#FFC107' },
    { stars: 2, count: 5, color: '#FF9800' },
    { stars: 1, count: 5, color: '#F44336' }
  ];
  const totalFeedback = feedbackRatings.reduce((sum, r) => sum + r.count, 0);

  const campaignTypes = [
    { type: 'Email', percent: 45, color: '#1E3A8A' },
    { type: 'WhatsApp', percent: 55, color: '#E4141C' }
  ];

  const campaignPerformance = [
    { name: 'Summer Promo', rate: 45 },
    { name: 'Eid Offers', rate: 38 },
    { name: 'Feedback', rate: 52 },
    { name: 'Loyalty', rate: 28 },
    { name: 'Winter Sale', rate: 35 }
  ];

  // Toggle section visibility
  const toggleSection = (section) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Download report handler
  const handleDownload = (type) => {
    alert(`Downloading ${type} report...`);
    // Replace with actual download logic
  };

  // Render bar for passenger statistics
  const renderPassengerBar = (value, index) => {
    const height = (value / maxPassengers) * 100;
    return (
      <div key={index} className="flex flex-col items-center mx-1 md:mx-2">
        <div className="relative h-32 md:h-40 w-6 md:w-8 bg-gray-200 rounded-t-sm">
          <div
            className="absolute bottom-0 w-full bg-[#1E3A8A] rounded-t-sm"
            style={{ height: `${height}%` }}
          ></div>
        </div>
        <span className="mt-2 text-xs">{passengerMonths[index]}</span>
        <span className="text-xs font-semibold">{value}</span>
      </div>
    );
  };

  // Render pie segment for feedback
  const renderPieSegment = (rating, index, total) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = `${(rating.count / total) * circumference} ${circumference}`;
    const rotation = index === 0 ? 0 :
      feedbackRatings.slice(0, index).reduce((sum, r) => sum + (r.count / total) * 360, 0);

    return (
      <circle
        key={rating.stars}
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke={rating.color}
        strokeWidth="20"
        strokeDasharray={strokeDasharray}
        transform={`rotate(${rotation} 50 50)`}
      />
    );
  };

  // Render horizontal bar for campaign performance
  const renderCampaignBar = (campaign) => {
    return (
      <div key={campaign.name} className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm">{campaign.name}</span>
          <span className="text-sm font-semibold">{campaign.rate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#E4141C] h-2 rounded-full"
            style={{ width: `${campaign.rate}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1E3A8A]">Analytics Reports</h1>
          <p className="text-gray-500 text-sm">Generate and export detailed reports</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Date Range Filter */}
          <div className="flex flex-wrap gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-400" />
              </div>
              <select
                className="pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-8"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Station Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-8"
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
              >
                {stations.map(station => (
                  <option key={station} value={station.toLowerCase()}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Export Button */}
          <button
            className="bg-[#E4141C] text-white p-2 rounded-lg hover:bg-[#C1121F] transition-colors flex items-center justify-center gap-2"
            onClick={() => handleDownload('full')}
          >
            <FiDownload size={16} />
            <span className="text-sm md:text-base">Export Report</span>
          </button>
        </div>
      </div>

      {/* Passenger Statistics Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div
          className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('passengerStats')}
        >
          <div className="flex items-center">
            <FiBarChart2 className="text-[#1E3A8A] mr-2" />
            <h2 className="text-lg font-semibold text-[#1E3A8A]">Passenger Statistics</h2>
          </div>
          {expandedSection.passengerStats ? <FiChevronUp /> : <FiChevronDown />}
        </div>

        {expandedSection.passengerStats && (
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Total Passengers</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">12,450</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Avg. Daily Passengers</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">415</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Busiest Station</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">JED (3,240)</p>
              </div>
            </div>

            <div className="h-64 md:h-80 flex items-end justify-center">
              <div className="flex">
                {passengerCounts.map(renderPassengerBar)}
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg hover:bg-gray-100 text-sm transition-colors"
                onClick={() => handleDownload('passengers')}
              >
                <FiDownload size={14} />
                Export
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg hover:bg-gray-100 text-sm transition-colors"
                onClick={() => window.print()}
              >
                <FiPrinter size={14} />
                Print
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Statistics Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden border border-gray-100">
        <div
          className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('feedbackStats')}
        >
          <div className="flex items-center">
            <FiPieChart className="text-[#1E3A8A] mr-2" />
            <h2 className="text-lg font-semibold text-[#1E3A8A]">Feedback Statistics</h2>
          </div>
          {expandedSection.feedbackStats ? <FiChevronUp /> : <FiChevronDown />}
        </div>

        {expandedSection.feedbackStats && (
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Total Feedback</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">{totalFeedback}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Avg. Rating</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">4.2/5</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Response Rate</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">78%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 md:h-80 flex flex-col items-center justify-center">
                <h3 className="text-gray-700 mb-4 text-sm md:text-base">Feedback Ratings</h3>
                <svg width="100" height="100" viewBox="0 0 100 100" className="mb-4">
                  {feedbackRatings.map((rating, i) =>
                    renderPieSegment(rating, i, totalFeedback)
                  )}
                </svg>
                <div className="flex flex-wrap justify-center gap-2">
                  {feedbackRatings.map(rating => (
                    <div key={rating.stars} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: rating.color }}
                      ></div>
                      <span className="text-xs">
                        {rating.stars} Stars: {Math.round((rating.count / totalFeedback) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-64 md:h-80">
                <h3 className="text-gray-700 mb-4 text-center text-sm md:text-base">Feedback by Station</h3>
                <div className="flex items-end h-40 mt-4 md:mt-8">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-32">
                      <div className="w-4 md:w-6 bg-[#1E3A8A] mx-1" style={{ height: '65%' }}></div>
                      <div className="w-4 md:w-6 bg-[#E4141C] mx-1" style={{ height: '12%' }}></div>
                    </div>
                    <span className="text-xs mt-1">JED</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-32">
                      <div className="w-4 md:w-6 bg-[#1E3A8A] mx-1" style={{ height: '45%' }}></div>
                      <div className="w-4 md:w-6 bg-[#E4141C] mx-1" style={{ height: '8%' }}></div>
                    </div>
                    <span className="text-xs mt-1">RUH</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-32">
                      <div className="w-4 md:w-6 bg-[#1E3A8A] mx-1" style={{ height: '78%' }}></div>
                      <div className="w-4 md:w-6 bg-[#E4141C] mx-1" style={{ height: '15%' }}></div>
                    </div>
                    <span className="text-xs mt-1">DXB</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-32">
                      <div className="w-4 md:w-6 bg-[#1E3A8A] mx-1" style={{ height: '32%' }}></div>
                      <div className="w-4 md:w-6 bg-[#E4141C] mx-1" style={{ height: '5%' }}></div>
                    </div>
                    <span className="text-xs mt-1">CAI</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-32">
                      <div className="w-4 md:w-6 bg-[#1E3A8A] mx-1" style={{ height: '56%' }}></div>
                      <div className="w-4 md:w-6 bg-[#E4141C] mx-1" style={{ height: '10%' }}></div>
                    </div>
                    <span className="text-xs mt-1">IST</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-32">
                      <div className="w-4 md:w-6 bg-[#1E3A8A] mx-1" style={{ height: '40%' }}></div>
                      <div className="w-4 md:w-6 bg-[#E4141C] mx-1" style={{ height: '7%' }}></div>
                    </div>
                    <span className="text-xs mt-1">KRT</span>
                  </div>
                </div>
                <div className="flex justify-center mt-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#1E3A8A] mr-1"></div>
                    <span className="text-xs">Positive</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#E4141C] mr-1"></div>
                    <span className="text-xs">Negative</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg hover:bg-gray-100 text-sm transition-colors"
                onClick={() => handleDownload('feedback')}
              >
                <FiDownload size={14} />
                Export
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg hover:bg-gray-100 text-sm transition-colors"
                onClick={() => window.print()}
              >
                <FiPrinter size={14} />
                Print
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Campaign Statistics Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div
          className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('campaignStats')}
        >
          <div className="flex items-center">
            <FiMail className="text-[#1E3A8A] mr-2" />
            <h2 className="text-lg font-semibold text-[#1E3A8A]">Campaign Statistics</h2>
          </div>
          {expandedSection.campaignStats ? <FiChevronUp /> : <FiChevronDown />}
        </div>

        {expandedSection.campaignStats && (
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Total Campaigns</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">8</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Messages Sent</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">2,450</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-gray-500 text-sm mb-1">Avg. Response Rate</h3>
                <p className="text-xl md:text-2xl font-bold text-[#1E3A8A]">32%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 md:h-80 flex flex-col items-center justify-center">
                <h3 className="text-gray-700 mb-4 text-sm md:text-base">Campaign Types</h3>
                <div className="relative w-40 h-40 md:w-48 md:h-48 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full"
                      style={{ backgroundColor: campaignTypes[0].color }}
                    ></div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
                        ${campaignTypes[0].color} 0% ${campaignTypes[0].percent}%,
                        ${campaignTypes[1].color} ${campaignTypes[0].percent}% 100%
                      )`
                    }}
                  ></div>
                </div>
                <div className="flex gap-2 md:gap-4">
                  {campaignTypes.map(type => (
                    <div key={type.type} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <span className="text-xs">
                        {type.type}: {type.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-64 md:h-80">
                <h3 className="text-gray-700 mb-4 text-center text-sm md:text-base">Campaign Performance</h3>
                <div className="mt-4 md:mt-6">
                  {campaignPerformance.map(renderCampaignBar)}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg hover:bg-gray-100 text-sm transition-colors"
                onClick={() => handleDownload('campaigns')}
              >
                <FiDownload size={14} />
                Export
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg hover:bg-gray-100 text-sm transition-colors"
                onClick={() => window.print()}
              >
                <FiPrinter size={14} />
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;