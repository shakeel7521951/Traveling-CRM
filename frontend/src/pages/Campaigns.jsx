import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiMail,
  FiPhone,
  FiCalendar,
  FiBarChart2,
  FiEdit,
  FiTrash2,
  FiX,
  FiChevronDown,
  FiEye,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiArrowLeft,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Campaigns = () => {
  const location = useLocation();
  // State for campaigns data
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Promotion 2023",
      type: "whatsapp",
      status: "active",
      target: "JED passengers",
      sent: 245,
      responses: 78,
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      color: "bg-[#242C54]",
    },
    {
      id: 2,
      name: "Flight Feedback Request",
      type: "email",
      status: "active",
      target: "All passengers",
      sent: 1028,
      responses: 324,
      startDate: "2023-05-15",
      endDate: "2023-12-31",
      color: "bg-[#E4141C]",
    },
    {
      id: 3,
      name: "Winter Special Offers",
      type: "whatsapp",
      status: "scheduled",
      target: "RUH passengers",
      sent: 0,
      responses: 0,
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      color: "bg-[#242C54]",
    },
  ]);

  // State for UI controls
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "whatsapp",
    status: "draft",
    target: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  // State for detailed view
  const [isDetailedView, setIsDetailedView] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    if (location.state) {
      const incomingCampaign = location.state;
      setCampaigns((prevCampaigns) => {
        const campaign = {
          ...incomingCampaign,
          id: Math.max(...prevCampaigns.map((c) => c.id)) + 1,
          sent: 0,
          responses: 0,
          color: ["bg-[#242C54]", "bg-[#E4141C]"][
            Math.floor(Math.random() * 2)
          ],
        };
        return [...prevCampaigns, campaign];
      });
    }
  }, [location.state]);

  const calculateResponseRate = () => {
    if (campaigns.length === 0) return "0%";

    const totalResponseRate = campaigns.reduce((sum, c) => {
      return sum + c.responses / (c.sent || 1);
    }, 0);

    const averageRate = (totalResponseRate / campaigns.length) * 100;
    return `${Math.round(averageRate)}%`;
  };

  // Filter campaigns based on search and filter
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || campaign.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new campaign
  const handleSubmit = (e) => {
    e.preventDefault();
    const campaign = {
      ...newCampaign,
      id: Math.max(...campaigns.map((c) => c.id)) + 1,
      sent: 0,
      responses: 0,
      color: ["bg-[#242C54]", "bg-[#E4141C]"][Math.floor(Math.random() * 2)],
    };
    setCampaigns([...campaigns, campaign]);
    setIsModalOpen(false);
    setNewCampaign({
      name: "",
      type: "whatsapp",
      status: "draft",
      target: "",
      startDate: "",
      endDate: "",
      message: "",
    });
  };

  // Delete a campaign
  const handleDelete = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      scheduled: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      draft: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  // Channel icon component
  const ChannelIcon = ({ type }) => {
    return type === "whatsapp" ? (
      <div className="bg-[#242C54] text-white p-2 rounded-lg">
        <FaWhatsapp className="text-xl" />
      </div>
    ) : (
      <div className="bg-[#E4141C] text-white p-2 rounded-lg">
        <FiMail className="text-xl" />
      </div>
    );
  };

  // Stat card component
  const StatCard = ({ title, value, icon, color }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center border border-gray-100 hover:shadow-md transition-all">
        <div className={`${color} text-white p-3 rounded-lg mr-4`}>{icon}</div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-xl font-bold text-[#242C54]">{value}</p>
        </div>
      </div>
    );
  };

  // Campaign card component
  const CampaignCard = ({ campaign }) => {
    const responseRate =
      campaign.sent > 0 ? (campaign.responses / campaign.sent) * 100 : 0;

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all">
        {/* Header with campaign color */}
        <div className={`h-2 ${campaign.color}`}></div>

        <div className="p-4">
          {/* Header with name and status */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-md font-bold text-[#242C54]">
              {campaign.name}
            </h3>
            <StatusBadge status={campaign.status} />
          </div>

          {/* Channel and target */}
          <div className="flex items-center mb-3">
            <ChannelIcon type={campaign.type} />
            <div className="ml-3">
              <p className="text-sm font-medium text-[#242C54]">
                {campaign.type === "whatsapp" ? "WhatsApp" : "Email"} Campaign
              </p>
              <p className="text-xs text-gray-500">Target: {campaign.target}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <div className="bg-gray-100 p-2 rounded-lg mr-3">
              <FiCalendar className="text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-sm font-medium">
                {campaign.startDate} - {campaign.endDate}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Sent: {campaign.sent}</span>
              <span className="font-medium">
                {Math.round(responseRate)}% Response Rate ({campaign.responses})
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-[#E4141C] h-2 rounded-full"
                style={{ width: `${responseRate}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between border-t pt-3">
            <button
              onClick={() => {
                setSelectedCampaign(campaign);
                setIsDetailedView(true);
              }}
              className="text-[#242C54] hover:text-[#E4141C] flex items-center text-xs font-medium"
            >
              <FiEye className="mr-1" size={14} />
              View Analytics
            </button>
            <button
              onClick={() => handleDelete(campaign.id)}
              className="text-gray-500 hover:text-[#E4141C] flex items-center text-xs font-medium"
            >
              <FiTrash2 className="mr-1" size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Detailed Campaign Analytics Component
  const CampaignAnalytics = ({ campaign, onBack }) => {
    const responseRate =
      campaign.sent > 0 ? (campaign.responses / campaign.sent) * 100 : 0;
    const openRate =
      campaign.sent > 0 ? ((campaign.responses + 50) / campaign.sent) * 100 : 0; // Mock open rate
    const clickRate =
      campaign.sent > 0 ? (campaign.responses / campaign.sent) * 50 : 0; // Mock click rate

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

  // Main render logic
  if (isDetailedView && selectedCampaign) {
    return (
      <CampaignAnalytics
        campaign={selectedCampaign}
        onBack={() => {
          setIsDetailedView(false);
          setSelectedCampaign(null);
        }}
      />
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header and search/filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#242C54]">
            Campaign Management
          </h1>
          <p className="text-gray-500 text-sm">
            Create and manage your marketing campaigns
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent appearance-none pr-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E4141C] text-white p-2 rounded-lg hover:bg-[#C1121F] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <FiPlus className="text-lg" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Campaigns"
          value={campaigns.length}
          icon={<FiMail />}
          color="bg-[#242C54]"
        />
        <StatCard
          title="Active Campaigns"
          value={campaigns.filter((c) => c.status === "active").length}
          icon={<FiBarChart2 />}
          color="bg-[#E4141C]"
        />
        <StatCard
          title="Messages Sent"
          value={campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
          icon={<FiPhone />}
          color="bg-[#242C54]"
        />
        <StatCard
          title="Response Rate"
          value={calculateResponseRate()}
          icon={<FaWhatsapp />}
          color="bg-[#E4141C]"
        />
      </div>

      {/* Campaigns grid */}
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <FiMail className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-md font-medium text-[#242C54] mb-1">
            No campaigns found
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E4141C] text-white px-4 py-2 rounded-lg hover:bg-[#C1121F] transition-colors text-sm"
          >
            Create New Campaign
          </button>
        </div>
      )}

      {/* New Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#242C54]">
                Create New Campaign
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-[#E4141C] transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#242C54] mb-1">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCampaign.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                    placeholder="e.g. Summer Promotion 2023"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#242C54] mb-1">
                    Channel
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`flex items-center p-2 border rounded-lg cursor-pointer transition-all ${
                        newCampaign.type === "whatsapp"
                          ? "border-[#242C54] bg-[#242C54]/10"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="whatsapp"
                        checked={newCampaign.type === "whatsapp"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        <div className="bg-[#242C54] text-white p-1 rounded-lg mr-2">
                          <FaWhatsapp className="text-sm" />
                        </div>
                        <span className="text-sm">WhatsApp</span>
                      </div>
                    </label>
                    <label
                      className={`flex items-center p-2 border rounded-lg cursor-pointer transition-all ${
                        newCampaign.type === "email"
                          ? "border-[#E4141C] bg-[#E4141C]/10"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="email"
                        checked={newCampaign.type === "email"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        <div className="bg-[#E4141C] text-white p-1 rounded-lg mr-2">
                          <FiMail className="text-sm" />
                        </div>
                        <span className="text-sm">Email</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#242C54] mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newCampaign.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="active">Active</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#242C54] mb-1">
                    Target Audience
                  </label>
                  <select
                    name="target"
                    value={newCampaign.target}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                    required
                  >
                    <option value="">Select target</option>
                    <option value="All passengers">All passengers</option>
                    <option value="JED passengers">JED passengers</option>
                    <option value="RUH passengers">RUH passengers</option>
                    <option value="DXB passengers">DXB passengers</option>
                    <option value="Frequent flyers">Frequent flyers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#242C54] mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400 text-sm" />
                    </div>
                    <input
                      type="date"
                      name="startDate"
                      value={newCampaign.startDate}
                      onChange={handleInputChange}
                      className="pl-9 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#242C54] mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400 text-sm" />
                    </div>
                    <input
                      type="date"
                      name="endDate"
                      value={newCampaign.endDate}
                      onChange={handleInputChange}
                      className="pl-9 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#242C54] mb-1">
                    Message Content
                  </label>
                  <textarea
                    name="message"
                    value={newCampaign.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                    placeholder="Write your campaign message here..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-[#242C54] hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E4141C] text-white rounded-lg hover:bg-[#C1121F] transition-colors text-sm"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
