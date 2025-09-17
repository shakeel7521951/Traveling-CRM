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
import { useStationPassengersQuery } from "../../redux/slices/PassengerSlice";

const RecentPassenger = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useStationPassengersQuery();
  
  if (isLoading) {
    return <div className="flex h-screen bg-gray-100 items-center justify-center">Loading...</div>;
  }

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
                {data?.allPassenger?.map((passenger) => (
                  <div
                    key={passenger._id}
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
              <button 
                className="mt-4 text-[#E4141C] flex items-center"
                onClick={() => navigate("/passengers")}
              >
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
                  onClick={() => navigate("/passengers")}
                  className="w-full flex items-center justify-between p-3 bg-[#242C54] text-white rounded-lg hover:bg-[#242C54]/90 transition"
                >
                  <span>Add New Passenger</span>
                  <FiUsers />
                </button>
                <button
                  onClick={()=>navigate("/campaigns")}
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
    </div>
  );
};

export default RecentPassenger;