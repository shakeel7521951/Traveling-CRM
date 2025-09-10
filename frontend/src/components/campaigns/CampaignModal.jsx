import React from "react";
import { FiX, FiCalendar, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const CampaignModal = ({ isLoading,newCampaign, onInputChange, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#242C54]">
            Create New Campaign
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#E4141C] transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#242C54] mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                name="name"
                value={newCampaign.name}
                onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-transparent"
                required
              >
                <option value="">Select target</option>
                <option value="all">All passengers</option>
                <option value="JED">JED passengers</option>
                <option value="RUH">RUH passengers</option>
                <option value="DXB">DXB passengers</option>
                <option value="frequent">Frequent flyers</option>
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
                  onChange={onInputChange}
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
                  onChange={onInputChange}
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
                onChange={onInputChange}
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
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-[#242C54] hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-[#E4141C] text-white rounded-lg hover:bg-[#C1121F] transition-colors text-sm ${isLoading?'cursor-not-allowed':''}`}
            >
              {isLoading ? 'Creating...':'Create Compaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignModal;