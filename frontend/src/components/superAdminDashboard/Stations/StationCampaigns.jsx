import React, { useState } from "react";
import {
  FiUsers,
  FiPlayCircle,
  FiPauseCircle,
  FiEye,
  FiTrendingUp,
  FiBarChart2,
  FiPlus,
} from "react-icons/fi";

// Station Details Modal
const StationDetail = ({ station, onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
      <h2 className="text-2xl font-bold text-[#242C54] mb-4">
        {station.name} – Details
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
          <FiPlayCircle className="text-green-600" size={28} />
          <p className="text-xl font-bold text-[#242C54]">
            {station.activeCampaigns}
          </p>
          <span className="text-sm text-gray-600">Active Campaigns</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
          <FiPauseCircle className="text-red-600" size={28} />
          <p className="text-xl font-bold text-[#242C54]">
            {station.pendingCampaigns}
          </p>
          <span className="text-sm text-gray-600">Pending Campaigns</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
          <FiUsers className="text-[#E4141C]" size={28} />
          <p className="text-xl font-bold text-[#242C54]">
            {station.totalPassengers.toLocaleString()}
          </p>
          <span className="text-sm text-gray-600">Total Passengers</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
          <FiTrendingUp className="text-[#242C54]" size={28} />
          <p className="text-xl font-bold text-[#242C54]">
            {station.occupancyRate}%
          </p>
          <span className="text-sm text-gray-600">Occupancy Rate</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-[#242C54] mb-2">Passenger Trend</h3>
        <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#242C54] to-[#3A4375]"
            style={{ width: `${station.occupancyRate}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#242C54] to-[#3A4375] text-white hover:from-[#3A4375] hover:to-[#242C54] transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// Add Station Modal
const AddStationForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    totalPassengers: "",
    activeCampaigns: "",
    pendingCampaigns: "",
    occupancyRate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(),
      totalPassengers: Number(formData.totalPassengers),
      activeCampaigns: Number(formData.activeCampaigns),
      pendingCampaigns: Number(formData.pendingCampaigns),
      occupancyRate: Number(formData.occupancyRate),
      trend: "up",
      growth: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-[#242C54] mb-4">
          Add New Station
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "totalPassengers", "activeCampaigns", "pendingCampaigns", "occupancyRate"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-lg focus:ring focus:ring-[#242C54]"
            />
          ))}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#242C54] to-[#3A4375] text-white hover:from-[#3A4375] hover:to-[#242C54]"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
const Stations = () => {
  const [stations, setStations] = useState([
    {
      id: 1,
      name: "Jeddah (JED)",
      totalPassengers: 4670,
      activeCampaigns: 12,
      pendingCampaigns: 4,
      occupancyRate: 78,
      trend: "up",
      growth: 12,
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
    },
  ]);

  const [selectedStation, setSelectedStation] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAddStation = (newStation) => {
    setStations((prev) => [...prev, newStation]);
  };

  // Filtering
  const filteredStations = stations.filter((station) => {
    const matchesSearch = station.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "Active") {
      matchesStatus = station.activeCampaigns > 0;
    } else if (statusFilter === "Pending") {
      matchesStatus = station.pendingCampaigns > 0;
    } else if (statusFilter === "High Occupancy") {
      matchesStatus = station.occupancyRate > 75;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search stations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg focus:ring focus:ring-[#242C54]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded-lg focus:ring focus:ring-[#242C54]"
          >
            <option>All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>High Occupancy</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#242C54] to-[#3A4375] text-white hover:from-[#3A4375] hover:to-[#242C54]"
        >
          <FiPlus /> Add Station
        </button>
      </div>

      {/* Stations Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <FiBarChart2 className="text-[#242C54] mr-2" />
          <h3 className="text-lg font-semibold text-[#242C54]">
            Station Performance
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
            <thead className="bg-gradient-to-r from-[#242C54] to-[#3A4375] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Station Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Total Passengers
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Occupancy Rate
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Growth
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map((station) => (
                <tr
                  key={station.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {station.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {station.totalPassengers.toLocaleString()}
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#242C54] to-[#3A4375] h-2 rounded-full"
                          style={{
                            width: `${(station.totalPassengers / 6000) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`font-semibold ${
                        station.occupancyRate > 75
                          ? "text-green-600"
                          : station.occupancyRate > 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {station.occupancyRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      {station.trend === "up" ? (
                        <svg
                          className="w-4 h-4 text-green-600 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-red-600 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          ></path>
                        </svg>
                      )}
                      <span
                        className={
                          station.trend === "up" ? "text-green-600" : "text-red-600"
                        }
                      >
                        {station.growth}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => setSelectedStation(station)}
                      className="text-gray-500 hover:text-[#E4141C] transition flex items-center"
                    >
                      <FiEye size={16} className="mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStations.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No stations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStation && (
        <StationDetail
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}

      {showAddForm && (
        <AddStationForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddStation}
        />
      )}
    </div>
  );
};

export default Stations;
