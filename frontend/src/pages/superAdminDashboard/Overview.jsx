import KPISection from '../../components/superadminoverview/SupKPISection';
import FeedbackRatingSummary from '../../components/superadminoverview/SupFeedbackRatingSummary';
import StationLeaderboard from '../../components/superadminoverview/SupStationLeaderboard';
import CampaignEngagementChart from '../../components/superadminoverview/SupCampaignEngagementChart';
import RecentActivityTimeline from '../../components/superadminoverview/SupRecentActivityTimeline';
import PassengerDataOverview from '../../components/superadminoverview/SupPassengerDataOverview';
import { FaPlane } from 'react-icons/fa';
import { useState } from 'react';

export default function Overview() {
  const [stationFilter, setStationFilter] = useState('All');

  return (
    <div className="p-4 space-y-6 o">
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-[#242C54]">Admin Dashboard</h1>
        <select
          className="p-2 rounded border border-gray-300 text-sm text-[#242C54] focus:border-[#E4141C] focus:ring-1 focus:ring-[#E4141C] outline-none transition-colors"
          value={stationFilter}
          onChange={(e) => setStationFilter(e.target.value)}
        >
          <option value="All">All Stations</option>
          <option value="JED">JED</option>
          <option value="RUH">RUH</option>
          <option value="DMM">DMM</option>
          <option value="DXB">DXB</option>
          {/* aur bhi stations add kar lena */}
        </select>
      </div>

      {/* KPI Section */}
      <KPISection title="Total Flights" value="120" icon={<FaPlane />} color="#E4141C" station={stationFilter} />

      {/* Passenger Overview */}
      <PassengerDataOverview station={stationFilter} />

      {/* Feedback + Leaderboard */}
      <div className="flex flex-wrap gap-4">
        <FeedbackRatingSummary station={stationFilter} />
        <StationLeaderboard station={stationFilter} />
      </div>

      {/* Campaign Engagement */}
      <CampaignEngagementChart station={stationFilter} />

      {/* Recent Activities */}
      <RecentActivityTimeline station={stationFilter} />
    </div>
  );
}
