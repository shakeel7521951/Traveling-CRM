import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiUsers, FiPlayCircle, FiPauseCircle, FiTrendingUp, FiArrowLeft, FiBarChart2, FiCalendar, FiClock, FiActivity } from "react-icons/fi";

const stationsData = [
  { 
    id: 1, 
    name: "Jeddah (JED)", 
    totalPassengers: 4670, 
    activeCampaigns: 12, 
    pendingCampaigns: 4, 
    occupancyRate: 78, 
    trend: "up", 
    growth: 12,
    lastUpdated: "2023-10-15",
    performance: 87,
    campaigns: [
      { id: 1, name: "Summer Promotion", status: "active", progress: 65 },
      { id: 2, name: "Holiday Special", status: "active", progress: 40 },
      { id: 3, name: "Business Class Upgrade", status: "pending", progress: 0 }
    ]
  },
  { 
    id: 2, 
    name: "Medina (MED)", 
    totalPassengers: 2980, 
    activeCampaigns: 9, 
    pendingCampaigns: 2, 
    occupancyRate: 65, 
    trend: "up", 
    growth: 8,
    lastUpdated: "2023-10-14",
    performance: 72,
    campaigns: [
      { id: 1, name: "Pilgrimage Package", status: "active", progress: 80 },
      { id: 2, name: "Family Offer", status: "pending", progress: 0 }
    ]
  },
  { 
    id: 3, 
    name: "Riyadh (RUH)", 
    totalPassengers: 5340, 
    activeCampaigns: 15, 
    pendingCampaigns: 5, 
    occupancyRate: 82, 
    trend: "down", 
    growth: 5,
    lastUpdated: "2023-10-16",
    performance: 92,
    campaigns: [
      { id: 1, name: "Business Traveler", status: "active", progress: 75 },
      { id: 2, name: "Weekend Getaway", status: "active", progress: 30 },
      { id: 3, name: "Luxury Experience", status: "pending", progress: 0 }
    ]
  },
  { 
    id: 4, 
    name: "Dammam (DMM)", 
    totalPassengers: 3250, 
    activeCampaigns: 7, 
    pendingCampaigns: 3, 
    occupancyRate: 71, 
    trend: "up", 
    growth: 15,
    lastUpdated: "2023-10-13",
    performance: 68,
    campaigns: [
      { id: 1, name: "Eastern Province Special", status: "active", progress: 50 },
      { id: 2, name: "Early Bird Offer", status: "pending", progress: 0 }
    ]
  },
  { 
    id: 5, 
    name: "Abha (AHB)", 
    totalPassengers: 1870, 
    activeCampaigns: 5, 
    pendingCampaigns: 1, 
    occupancyRate: 58, 
    trend: "up", 
    growth: 22,
    lastUpdated: "2023-10-12",
    performance: 63,
    campaigns: [
      { id: 1, name: "Mountain Escape", status: "active", progress: 90 },
      { id: 2, name: "Cultural Experience", status: "pending", progress: 0 }
    ]
  },
];

const ViewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const station = stationsData.find(st => st.id === Number(id));

  if (!station) return <div className="p-6">Station not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#242C54] hover:bg-gray-50 shadow-sm transition-all border border-gray-200 mr-4"
          >
            <FiArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl font-bold text-[#242C54]">{station.name} Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Passengers</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">{station.totalPassengers.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FiUsers className="text-[#242C54]" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {station.trend === "up" ? 
                <span className="text-green-600 font-medium">↑ {station.growth}%</span> : 
                <span className="text-red-600 font-medium">↓ {station.growth}%</span>
              } from last month
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">{station.activeCampaigns}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FiPlayCircle className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">{station.pendingCampaigns} campaigns pending</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Occupancy Rate</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">{station.occupancyRate}%</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <FiTrendingUp className="text-purple-600" size={20} />
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${station.occupancyRate > 75 ? "bg-green-500" : station.occupancyRate > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: `${station.occupancyRate}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Station Performance</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">{station.performance}%</h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <FiActivity className="text-orange-600" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Updated on <span className="font-medium">{station.lastUpdated}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaigns Section */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#242C54] to-[#3A4375]">
              <h2 className="text-lg font-semibold text-white">Campaigns</h2>
            </div>
            <div className="p-6">
              {station.campaigns.map(campaign => (
                <div key={campaign.id} className="mb-4 last:mb-0 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#242C54]">{campaign.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <FiClock size={14} />
                    <span>{campaign.status === 'active' ? 'In progress' : 'Awaiting approval'}</span>
                  </div>
                  {campaign.status === 'active' && (
                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-[#242C54] to-[#3A4375] h-2 rounded-full" 
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Passenger Trend Section */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#242C54] to-[#3A4375]">
              <h2 className="text-lg font-semibold text-white">Passenger Trend</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#242C54]">{station.totalPassengers.toLocaleString()}</h3>
                  <p className="text-sm text-gray-500">Total passengers this month</p>
                </div>
                <div className={`flex items-center ${station.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {station.trend === "up" ? 
                    <span className="mr-1">&#9650;</span> : 
                    <span className="mr-1">&#9660;</span>
                  }
                  <span className="font-medium">{station.growth}%</span>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Occupancy Rate</span>
                  <span className="text-sm font-medium text-[#242C54]">{station.occupancyRate}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-[#242C54] to-[#3A4375]" 
                    style={{ width: `${station.occupancyRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Station Performance</span>
                  <span className="text-sm font-medium text-[#242C54]">{station.performance}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-700" 
                    style={{ width: `${station.performance}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#242C54] to-[#3A4375]">
            <h2 className="text-lg font-semibold text-white">Station Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-[#242C54] mb-3">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Station Code</span>
                  <span className="font-medium">{station.name.split(' ').pop()}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{station.lastUpdated}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">Operational</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-[#242C54] mb-3">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className={`font-medium ${station.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {station.trend === "up" ? "+" : "-"}{station.growth}%
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Campaign Efficiency</span>
                  <span className="font-medium">{(station.activeCampaigns / (station.activeCampaigns + station.pendingCampaigns) * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Capacity Utilization</span>
                  <span className="font-medium">{station.occupancyRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;