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
    { type: 'Email', percent: 45, color: '#2196F3' },
    { type: 'WhatsApp', percent: 55, color: '#4CAF50' }
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
      <div key={index} className="flex flex-col items-center mx-2">
        <div className="relative h-40 w-8 bg-gray-200 rounded-t-sm">
          <div 
            className="absolute bottom-0 w-full bg-[#242C54] rounded-t-sm" 
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
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:gap-10 sm:flex-row sm:justify-between mb-6">
        <h1 className="text-xl sm:text-3xl  xl:text-4xl whitespace-nowrap font-bold text-[#242C54] mb-4 xl:mb-0">Analytics Reports</h1>
        
        <div className="flex flex-col xl:flex-row gap-3 w-full md:w-auto">
          {/* Date Range Filter */}
       <div className="flex flex-wrap gap-5">
           <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiCalendar className="text-gray-500" />
            </div>
            <select
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E4141C] appearance-none pr-8"
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
              <FiFilter className="text-gray-500" />
            </div>
            <select
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E4141C] appearance-none pr-8"
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
            className="bg-[#E4141C] text-white p-2 rounded hover:bg-[#c51119] transition-colors flex items-center justify-center gap-2"
            onClick={() => handleDownload('full')}
          >
            <FiDownload />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Passenger Statistics Section */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 border-b cursor-pointer"
          onClick={() => toggleSection('passengerStats')}
        >
          <div className="flex items-center">
            <FiBarChart2 className="text-[#242C54] mr-2" />
            <h2 className="text-lg font-semibold text-[#242C54]">Passenger Statistics</h2>
          </div>
          {expandedSection.passengerStats ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        
        {expandedSection.passengerStats && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Total Passengers</h3>
                <p className="text-2xl font-bold text-[#242C54]">12,450</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Avg. Daily Passengers</h3>
                <p className="text-2xl font-bold text-[#242C54]">415</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Busiest Station</h3>
                <p className="text-2xl font-bold text-[#242C54]">JED (3,240)</p>
              </div>
            </div>
            
            <div className="h-80 flex items-end justify-center">
              <div className="flex">
                {passengerCounts.map(renderPassengerBar)}
              </div>
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-[#242C54] text-[#242C54] rounded hover:bg-gray-100"
                onClick={() => handleDownload('passengers')}
              >
                <FiDownload size={16} />
                Export
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-[#242C54] text-[#242C54] rounded hover:bg-gray-100"
                onClick={() => window.print()}
              >
                <FiPrinter size={16} />
                Print
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Statistics Section */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 border-b cursor-pointer"
          onClick={() => toggleSection('feedbackStats')}
        >
          <div className="flex items-center">
            <FiPieChart className="text-[#242C54] mr-2" />
            <h2 className="text-lg font-semibold text-[#242C54]">Feedback Statistics</h2>
          </div>
          {expandedSection.feedbackStats ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        
        {expandedSection.feedbackStats && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Total Feedback</h3>
                <p className="text-2xl font-bold text-[#242C54]">{totalFeedback}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Avg. Rating</h3>
                <p className="text-2xl font-bold text-[#242C54]">4.2/5</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Response Rate</h3>
                <p className="text-2xl font-bold text-[#242C54]">78%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 flex flex-col items-center justify-center">
                <h3 className="text-gray-700 mb-4">Feedback Ratings</h3>
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
              <div className="h-80">
                <h3 className="text-gray-700 mb-4 text-center">Feedback by Station</h3>
                <div className="flex items-end h-48 mt-8">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-40">
                      <div className="w-6 bg-green-500 mx-1" style={{ height: '65%' }}></div>
                      <div className="w-6 bg-red-500 mx-1" style={{ height: '12%' }}></div>
                    </div>
                    <span className="text-xs mt-1">JED</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-40">
                      <div className="w-6 bg-green-500 mx-1" style={{ height: '45%' }}></div>
                      <div className="w-6 bg-red-500 mx-1" style={{ height: '8%' }}></div>
                    </div>
                    <span className="text-xs mt-1">RUH</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-40">
                      <div className="w-6 bg-green-500 mx-1" style={{ height: '78%' }}></div>
                      <div className="w-6 bg-red-500 mx-1" style={{ height: '15%' }}></div>
                    </div>
                    <span className="text-xs mt-1">DXB</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-40">
                      <div className="w-6 bg-green-500 mx-1" style={{ height: '32%' }}></div>
                      <div className="w-6 bg-red-500 mx-1" style={{ height: '5%' }}></div>
                    </div>
                    <span className="text-xs mt-1">CAI</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-40">
                      <div className="w-6 bg-green-500 mx-1" style={{ height: '56%' }}></div>
                      <div className="w-6 bg-red-500 mx-1" style={{ height: '10%' }}></div>
                    </div>
                    <span className="text-xs mt-1">IST</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-40">
                      <div className="w-6 bg-green-500 mx-1" style={{ height: '40%' }}></div>
                      <div className="w-6 bg-red-500 mx-1" style={{ height: '7%' }}></div>
                    </div>
                    <span className="text-xs mt-1">KRT</span>
                  </div>
                </div>
                <div className="flex justify-center mt-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-1"></div>
                    <span className="text-xs">Positive</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 mr-1"></div>
                    <span className="text-xs">Negative</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-[#242C54] text-[#242C54] rounded hover:bg-gray-100"
                onClick={() => handleDownload('feedback')}
              >
                <FiDownload size={16} />
                Export
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-[#242C54] text-[#242C54] rounded hover:bg-gray-100"
                onClick={() => window.print()}
              >
                <FiPrinter size={16} />
                Print
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Campaign Statistics Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 border-b cursor-pointer"
          onClick={() => toggleSection('campaignStats')}
        >
          <div className="flex items-center">
            <FiMail className="text-[#242C54] mr-2" />
            <h2 className="text-lg font-semibold text-[#242C54]">Campaign Statistics</h2>
          </div>
          {expandedSection.campaignStats ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        
        {expandedSection.campaignStats && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Total Campaigns</h3>
                <p className="text-2xl font-bold text-[#242C54]">8</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Messages Sent</h3>
                <p className="text-2xl font-bold text-[#242C54]">2,450</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 text-sm mb-1">Avg. Response Rate</h3>
                <p className="text-2xl font-bold text-[#242C54]">32%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 flex flex-col items-center justify-center">
                <h3 className="text-gray-700 mb-4">Campaign Types</h3>
                <div className="relative w-48 h-48 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-24 h-24 rounded-full" 
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
                <div className="flex gap-4">
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
              <div className="h-80">
                <h3 className="text-gray-700 mb-4 text-center">Campaign Performance</h3>
                <div className="mt-6">
                  {campaignPerformance.map(renderCampaignBar)}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-[#242C54] text-[#242C54] rounded hover:bg-gray-100"
                onClick={() => handleDownload('campaigns')}
              >
                <FiDownload size={16} />
                Export
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-[#242C54] text-[#242C54] rounded hover:bg-gray-100"
                onClick={() => window.print()}
              >
                <FiPrinter size={16} />
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