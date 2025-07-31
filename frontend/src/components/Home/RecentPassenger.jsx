import React, { useState, useRef, useEffect } from "react";
import {
  FiUsers,
  FiMessageSquare,
  FiCalendar,
  FiDownload,
  FiBell,
  FiSearch,
  FiX,
  FiMail
} from "react-icons/fi";
import { FaQrcode, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecentPassenger = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    flightDate: '',
  });

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'whatsapp',
    status: 'draft',
    target: '',
    startDate: '',
    endDate: '',
    message: ''
  });

  const [recentPassengers, setRecentPassengers] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
    
      
      date: "2023-11-15",
      email: "ahmed@example.com",
      phone: "+966501234567"
    },
    {
      id: 2,
      name: "Youssef Ali",
      
      
      date: "2023-11-14",
      email: "youssef@example.com",
      phone: "+971501234567"
    },
    {
      id: 3,
      name: "Fatima Hassan",
      
      
      date: "2023-11-14",
      email: "fatima@example.com",
      phone: "+249901234567"
    },
  ]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCampaignChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassenger = {
      id: recentPassengers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.flightDate,
      flight: formData.flight,
      destination: formData.destination
    };

    setRecentPassengers([...recentPassengers, newPassenger]);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      flightDate: '',
      flight: '',
      destination: ''
    });
    
    navigate("/passengers", { state: formData });
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    navigate("/campaigns", { state: newCampaign });
    setIsModalOpen(false);
    setNewCampaign({
      name: '',
      type: 'whatsapp',
      status: 'draft',
      target: '',
      startDate: '',
      endDate: '',
      message: ''
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
 

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#242C54] mb-4">
                Recent Passengers
              </h3>
              <div className="space-y-4">
                {recentPassengers.map((passenger) => (
                  <div
                    key={passenger.id}
                    className="flex sm:items-center flex-col items-start  sm:flex-row  sm:justify-between p-3 border-b border-gray-100"
                  >
                    <div>
                      <p className="font-medium text-[#242C54]">
                        {passenger.name}
                      </p>
                 
                      <p className="text-xs text-gray-400 mt-1">
                        {passenger.phone} • {passenger.email}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        {passenger.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[#E4141C] flex items-center">
                View All Passengers
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#242C54] mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full flex items-center justify-between p-3 bg-[#242C54] text-white rounded-lg hover:bg-[#242C54]/90 transition"
                >
                  <span>Add New Passenger</span>
                  <FiUsers />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-between p-3 bg-[#E4141C] text-white rounded-lg hover:bg-[#E4141C]/90 transition"
                >
                  <span>Send Campaign</span>
                  <FiMessageSquare />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-100 text-[#242C54] rounded-lg hover:bg-gray-200 transition">
                  <span>Generate QR Code</span>
                  <FaQrcode />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-100 text-[#242C54] rounded-lg hover:bg-gray-200 transition">
                  <span>Create Report</span>
                  <FiDownload />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <form onSubmit={handleSubmit}>
            <div
              ref={formRef}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200 relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
                
                <h1 className="text-2xl font-bold text-[#242C54] mb-6 text-center">
                  Add New Passenger
                </h1>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        onChange={handleChange}
                        value={formData.name}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#242C54] focus:border-[#242C54] outline-none transition"
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#242C54] focus:border-[#242C54] outline-none transition"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        onChange={handleChange}
                        value={formData.phone}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#242C54] focus:border-[#242C54] outline-none transition"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    
                    <div>
                      <label
                        htmlFor="flightDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Flight Date
                      </label>
                      <input
                        id="flightDate"
                        onChange={handleChange}
                        value={formData.flightDate}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#242C54] focus:border-[#242C54] outline-none transition"
                        type="date"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#242C54] hover:bg-[#242C54]/90 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                      Add Passenger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="border-b p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Create New Campaign</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCampaignSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Campaign Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCampaign.name}
                    onChange={handleCampaignChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g. Summer Promotion 2023"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Channel</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${newCampaign.type === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <input
                        type="radio"
                        name="type"
                        value="whatsapp"
                        checked={newCampaign.type === 'whatsapp'}
                        onChange={handleCampaignChange}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg mr-2">
                          <FaWhatsapp className="text-green-600" />
                        </div>
                        <span className=" text-wrap">WhatsApp</span>
                      </div>
                    </label>
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${newCampaign.type === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                      <input
                        type="radio"
                        name="type"
                        value="email"
                        checked={newCampaign.type === 'email'}
                        onChange={handleCampaignChange}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-2">
                          <FiMail className="text-blue-600" />
                        </div>
                        <span>Email</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Status</label>
                  <select
                    name="status"
                    value={newCampaign.status}
                    onChange={handleCampaignChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="active">Active</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Target Audience</label>
                  <select
                    name="target"
                    value={newCampaign.target}
                    onChange={handleCampaignChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="startDate"
                      value={newCampaign.startDate}
                      onChange={handleCampaignChange}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">End Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="endDate"
                      value={newCampaign.endDate}
                      onChange={handleCampaignChange}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Message Content</label>
                  <textarea
                    name="message"
                    value={newCampaign.message}
                    onChange={handleCampaignChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Write your campaign message here..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8 border-t pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-md transition-all"
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

export default RecentPassenger;