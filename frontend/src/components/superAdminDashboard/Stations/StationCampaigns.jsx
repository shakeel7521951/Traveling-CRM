import React, { useState } from "react";
import { FiUsers, FiPlayCircle, FiPauseCircle, FiTrendingUp, FiBarChart2, FiPlus, FiEye, FiSearch, FiFilter, FiX, FiChevronDown, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddStationForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    city: "",
    district: "",
    state: "",
    country: "",
    latitude: "",
    longitude: ""
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(),
      totalPassengers: 0,
      activeCampaigns: 0,
      pendingCampaigns: 0,
      occupancyRate: 0,
      trend: "up",
      growth: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
     <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 animate-fade-in 
                max-h-[90vh] flex flex-col overflow-hidden">
  {/* Headers */}
  <div className="flex justify-between items-center mb-6 flex-shrink-0">
    <h2 className="text-2xl font-bold text-[#242C54]">Add New Station</h2>
    <button onClick={onClose} className="text-red-700 hover:text-gray-600 transition-colors">
      <FiX size={24} />
    </button>
  </div>

  {/* Forms */}
  <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-2 flex-1">
    {[
      { field: "name", label: "Station Name", type: "text" },
      { field: "code", label: "Station Code", type: "text" },
      { field: "location", label: "Location", type: "text" }
    ].map(({ field, label, type }) => (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
          type={type}
          name={field}
          placeholder={label}
          value={formData[field]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#242C54] focus:border-transparent transition-all"
        />
      </div>
    ))}

    <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-100 flex-shrink-0">
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#242C54] to-[#3A4375] text-white hover:from-[#3A4375] hover:to-[#242C54] transition-all shadow-md hover:shadow-lg font-medium"
      >
        Add Station
      </button>
    </div>
  </form>
</div>
</div>
);
};

const StationCampaigns = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState([
    { id: 1, name: "Jeddah (JED)", totalPassengers: 4670, activeCampaigns: 12, pendingCampaigns: 4, occupancyRate: 78, trend: "up", growth: 12 },
    { id: 2, name: "Medina (MED)", totalPassengers: 2980, activeCampaigns: 9, pendingCampaigns: 2, occupancyRate: 65, trend: "up", growth: 8 },
    { id: 3, name: "Riyadh (RUH)", totalPassengers: 5340, activeCampaigns: 15, pendingCampaigns: 5, occupancyRate: 82, trend: "down", growth: 5 },
    { id: 4, name: "Dammam (DMM)", totalPassengers: 3250, activeCampaigns: 7, pendingCampaigns: 3, occupancyRate: 71, trend: "up", growth: 15 },
    { id: 5, name: "Abha (AHB)", totalPassengers: 1870, activeCampaigns: 5, pendingCampaigns: 1, occupancyRate: 58, trend: "up", growth: 22 },
    { id: 6, name: "Pakistan (PAK)", totalPassengers: 0, activeCampaigns: 0, pendingCampaigns: 0, occupancyRate: 0, trend: "up", growth: 0 },
    { id: 7, name: "India (IND)", totalPassengers: 0, activeCampaigns: 0, pendingCampaigns: 0, occupancyRate: 0, trend: "up", growth: 0 },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAddStation = (newStation) => setStations(prev => [...prev, newStation]);

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(search.toLowerCase());
    let matchesStatus = true;
    if (statusFilter === "Active") matchesStatus = station.activeCampaigns > 0;
    else if (statusFilter === "Pending") matchesStatus = station.pendingCampaigns > 0;
    else if (statusFilter === "High Occupancy") matchesStatus = station.occupancyRate > 75;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Headers */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#242C54] mb-2">Station Management</h1>
          <p className="text-gray-600">Monitor and manage all station campaigns and performance metrics</p>
        </div>

        {/* Stat Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Stations</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">{stations.length}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <FiUsers className="text-[#242C54]" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3"><span className="text-green-600 font-medium">+3</span> since last month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">{stations.reduce((acc, station) => acc + station.activeCampaigns, 0)}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <FiPlayCircle className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3"><span className="text-green-600 font-medium">+12%</span> from last week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending Campaigns</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">{stations.reduce((acc, station) => acc + station.pendingCampaigns, 0)}</h3>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <FiPauseCircle className="text-yellow-600" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3"><span className="text-red-600 font-medium">-2</span> since yesterday</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Avg. Occupancy</p>
                <h3 className="text-2xl font-bold text-[#242C54] mt-1">
                  {Math.round(stations.reduce((acc, station) => acc + station.occupancyRate, 0) / stations.length)}%
                </h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <FiTrendingUp className="text-purple-600" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3"><span className="text-green-600 font-medium">+5%</span> from last month</p>
          </div>
        </div>

        {/* Controls and Tables */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-80">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search stations..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#242C54] outline-none focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)} 
                    className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#242C54] outline-none focus:border-transparent appearance-none transition-all"
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>High Occupancy</option>
                  </select>
                  {/* <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
                </div>
                
                <button 
                  onClick={() => setShowAddForm(true)} 
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#242C54] to-[#3A4375] text-white hover:from-[#3A4375] hover:to-[#242C54] transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <FiPlus size={18} /> Add Station
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#242C54] to-[#3A4375] text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-nowrap">Station Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-nowrap">Total Passengers</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-nowrap">Active Campaigns</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-nowrap">Occupancy Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-nowrap">Growth</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStations.map(station => (
                  <tr key={station.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{station.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-900 mr-3">{station.totalPassengers.toLocaleString()}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#242C54] to-[#3A4375] h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (station.totalPassengers / 6000) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{station.activeCampaigns}</div>
                      <div className="text-xs text-gray-500">{station.pendingCampaigns} pending</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${station.occupancyRate > 75 ? "bg-green-500" : station.occupancyRate > 60 ? "bg-yellow-500" : "bg-red-500"}`}></div>
                        <span className={`text-sm font-semibold ${station.occupancyRate > 75 ? "text-green-600" : station.occupancyRate > 60 ? "text-yellow-600" : "text-red-600"}`}>
                          {station.occupancyRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {station.trend === "up" ? 
                          <FiArrowUp className="text-green-600 mr-1" /> : 
                          <FiArrowDown className="text-red-600 mr-1" />
                        }
                        <span className={`text-sm font-medium ${station.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {station.growth}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/superadmin/viewdetail/${station.id}`)} 
                        className="flex items-center text-sm font-medium text-[#242C54] hover:text-[#3A4375] transition-colors"
                      >
                        <FiEye size={16} className="mr-1" /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStations.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FiBarChart2 size={48} className="mb-2 opacity-50" />
                        <p className="font-medium">No stations found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddForm && <AddStationForm onClose={() => setShowAddForm(false)} onAdd={handleAddStation} />}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StationCampaigns;