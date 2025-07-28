import React, { useState } from 'react';

const activities = [
  { time: '09:30 AM', type: 'Flight Update', station: 'Lahore', user: 'Ali Khan' },
  { time: '10:15 AM', type: 'Feedback Received', station: 'Karachi', user: 'Sara Malik' },
  { time: '11:45 AM', type: 'System Sync', station: 'Islamabad', user: 'Zeeshan Ahmed' },
  { time: '12:30 PM', type: 'Flight Update', station: 'Lahore', user: 'Sara Malik' },
];

const RecentActivityTimeline = () => {
  const [typeFilter, setTypeFilter] = useState('');
  const [stationFilter, setStationFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  const filteredActivities = activities.filter((activity) => {
    return (
      (!typeFilter || activity.type === typeFilter) &&
      (!stationFilter || activity.station === stationFilter) &&
      (!userFilter || activity.user === userFilter)
    );
  });

  return (
    <div className="flex flex-col lg:flex-row bg-white shadow rounded-xl p-6 gap-6 w-full">
      {/* Left: Timeline */}
      <div className="lg:w-2/3">
        <h2 className="text-xl font-semibold mb-4">⏳ Recent Activity Timeline</h2>
        {filteredActivities.length > 0 ? (
          <ul className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-md font-medium">{activity.type}</p>
                <p className="text-sm text-gray-400">
                  {activity.station} — by {activity.user}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No activity found with selected filters.</p>
        )}
      </div>

      {/* Right: Filter + Stats */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">🎛️ Filters</h2>

        <div className="space-y-3">
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Flight Update">Flight Update</option>
            <option value="Feedback Received">Feedback Received</option>
            <option value="System Sync">System Sync</option>
          </select>

          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
          >
            <option value="">All Stations</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
          </select>

          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option value="">All Users</option>
            <option value="Ali Khan">Ali Khan</option>
            <option value="Sara Malik">Sara Malik</option>
            <option value="Zeeshan Ahmed">Zeeshan Ahmed</option>
          </select>
        </div>

        {/* Mini Stats */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📈 Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded text-center">
              <p className="text-sm text-gray-600">Activities</p>
              <p className="font-bold text-blue-600 text-xl">{filteredActivities.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded text-center">
              <p className="text-sm text-gray-600">Users</p>
              <p className="font-bold text-green-600 text-xl">
                {
                  new Set(filteredActivities.map((a) => a.user)).size
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTimeline;
