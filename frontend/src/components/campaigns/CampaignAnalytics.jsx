import React from "react";
import {
  FiArrowLeft,
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const CampaignAnalytics = ({ campaign, onBack }) => {
  const responseRate =
    campaign.sent > 0 ? (campaign.responses / campaign.sent) * 100 : 0;
  const openRate =
    campaign.sent > 0 ? ((campaign.responses + 50) / campaign.sent) * 100 : 0;
  const clickRate =
    campaign.sent > 0 ? (campaign.responses / campaign.sent) * 50 : 0;

  // Mock analytics data
  const weeklyData = [
    {
      week: "Week 1",
      sent: Math.floor(campaign.sent * 0.3),
      responses: Math.floor(campaign.responses * 0.2),
    },
    {
      week: "Week 2",
      sent: Math.floor(campaign.sent * 0.4),
      responses: Math.floor(campaign.responses * 0.3),
    },
    {
      week: "Week 3",
      sent: Math.floor(campaign.sent * 0.2),
      responses: Math.floor(campaign.responses * 0.3),
    },
    {
      week: "Week 4",
      sent: Math.floor(campaign.sent * 0.1),
      responses: Math.floor(campaign.responses * 0.2),
    },
  ];

  const demographicData = [
    { age: "18-25", percentage: 15 },
    { age: "26-35", percentage: 35 },
    { age: "36-45", percentage: 30 },
    { age: "46-55", percentage: 15 },
    { age: "56+", percentage: 5 },
  ];

  const locationData = [
    { location: "JED", percentage: 40 },
    { location: "RUH", percentage: 30 },
    { location: "DXB", percentage: 20 },
    { location: "KRT", percentage: 10 },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <FiArrowLeft className="text-xl text-[#242C54]" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#242C54]">
            {campaign.name}
          </h1>
          <p className="text-gray-600">Detailed Analytics & Performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#242C54] text-white p-3 rounded-xl">
              <FiUsers className="text-xl" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-[#242C54]">
            {campaign.sent.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Messages Sent</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#E4141C] text-white p-3 rounded-xl">
              <FiTrendingUp className="text-xl" />
            </div>
            <span className="text-green-600 text-sm font-medium">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-[#242C54]">
            {Math.round(responseRate)}%
          </h3>
          <p className="text-gray-600 text-sm">Response Rate</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-xl">
              <FiTarget className="text-xl" />
            </div>
            <span className="text-green-600 text-sm font-medium">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-[#242C54]">
            {Math.round(openRate)}%
          </h3>
          <p className="text-gray-600 text-sm">Open Rate</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500 text-white p-3 rounded-xl">
              <FiBarChart2 className="text-xl" />
            </div>
            <span className="text-red-600 text-sm font-medium">-3%</span>
          </div>
          <h3 className="text-2xl font-bold text-[#242C54]">
            {Math.round(clickRate)}%
          </h3>
          <p className="text-gray-600 text-sm">Click Rate</p>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-[#242C54] mb-4">
            Weekly Performance
          </h3>
          <div className="space-y-4">
            {weeklyData.map((week, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {week.week}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#242C54] rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      {week.sent} sent
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#E4141C] rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      {week.responses} responses
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-[#242C54] mb-4">
            Age Demographics
          </h3>
          <div className="space-y-3">
            {demographicData.map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {demo.age}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#E4141C] h-2 rounded-full"
                      style={{ width: `${demo.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-10">
                    {demo.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Performance & Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-[#242C54] mb-4">
            Performance by Location
          </h3>
          <div className="space-y-3">
            {locationData.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {location.location}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#242C54] h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-10">
                    {location.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-[#242C54] mb-4">
            Campaign Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Channel
              </label>
              <p className="text-[#242C54] font-semibold">
                {campaign.type === "whatsapp" ? "WhatsApp" : "Email"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Target Audience
              </label>
              <p className="text-[#242C54] font-semibold">
                {campaign.target}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Duration
              </label>
              <p className="text-[#242C54] font-semibold">
                {campaign.startDate} to {campaign.endDate}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>
              <div className="mt-1">
                <StatusBadge status={campaign.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;