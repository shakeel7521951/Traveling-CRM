import React, { useState } from "react";

const activities = [
  {
    time: "09:30 AM",
    type: "Flight Update",
    station: "Saudi Arabia",
    user: "Hassan Al-Faisal",
  },
  {
    time: "10:15 AM",
    type: "Feedback Received",
    station: "United Arab Emirates",
    user: "Fatima Noor",
  },
  {
    time: "11:45 AM",
    type: "System Sync",
    station: "Qatar",
    user: "Mohammed Saleh",
  },
  {
    time: "12:30 PM",
    type: "Flight Update",
    station: "Egypt",
    user: "Aisha Karim",
  },
];

const RecentActivityTimeline = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const [stationFilter, setStationFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const filteredActivities = activities.filter((activity) => {
    return (
      (!typeFilter || activity.type === typeFilter) &&
      (!stationFilter || activity.station === stationFilter) &&
      (!userFilter || activity.user === userFilter)
    );
  });

  return (
    <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-4 border border-gray-100 w-full">
      {/* Left: Timeline */}
      <div className="lg:w-2/3 lg:pr-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#242C54]">
          Recent Activity Timeline
        </h2>
        {filteredActivities.length > 0 ? (
          <ul className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <li key={index} className="border-l-4 border-[#E4141C] pl-4 py-2">
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-md font-medium text-[#242C54]">
                  {activity.type}
                </p>
                <p className="text-sm text-gray-600">
                  {activity.station} — by {activity.user}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No activity found with selected filters.
          </p>
        )}
      </div>

      {/* Right: Filter + Stats */}
      <div className="lg:w-1/3 flex flex-col gap-4 lg:pl-4 lg:border-l lg:border-gray-200 mt-4 lg:mt-0">
        <h2 className="text-lg sm:text-xl font-semibold text-[#242C54]">
          Filters
        </h2>

        <div className="space-y-3">
          {/* Type Filter */}
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#242C54] focus:border-[#E4141C] focus:ring-1 focus:ring-[#E4141C] outline-none transition-colors"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Flight Update">Flight Update</option>
            <option value="Feedback Received">Feedback Received</option>
            <option value="System Sync">System Sync</option>
          </select>

          {/* Station Filter (Arabic Countries) */}
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#242C54] focus:border-[#E4141C] focus:ring-1 focus:ring-[#E4141C] outline-none transition-colors"
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
          >
            <option value="">All Countries</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Qatar">Qatar</option>
            <option value="Egypt">Egypt</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Oman">Oman</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Jordan">Jordan</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Morocco">Morocco</option>
          </select>

          {/* User Filter */}
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#242C54] focus:border-[#E4141C] focus:ring-1 focus:ring-[#E4141C] outline-none transition-colors"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option value="">All Users</option>
            <option value="Hassan Al-Faisal">Hassan Al-Faisal</option>
            <option value="Fatima Noor">Fatima Noor</option>
            <option value="Mohammed Saleh">Mohammed Saleh</option>
            <option value="Aisha Karim">Aisha Karim</option>
          </select>
        </div>

        {/* Mini Stats */}
        <div className="mt-4">
          <h3 className="text-md sm:text-lg font-semibold mb-2 text-[#242C54]">
            Summary
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#242C54]/10 p-3 rounded text-center">
              <p className="text-xs sm:text-sm text-gray-600">Activities</p>
              <p className="font-bold text-[#242C54] text-lg sm:text-xl">
                {filteredActivities.length}
              </p>
            </div>
            <div className="bg-[#E4141C]/10 p-3 rounded text-center">
              <p className="text-xs sm:text-sm text-gray-600">Users</p>
              <p className="font-bold text-[#E4141C] text-lg sm:text-xl">
                {new Set(filteredActivities.map((a) => a.user)).size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTimeline;
