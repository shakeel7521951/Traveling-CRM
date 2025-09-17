import React from 'react';
import { FiUsers, FiStar } from 'react-icons/fi';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useStationPassengersQuery } from '../../redux/slices/PassengerSlice';
import { useGetStationFeedbacksQuery } from '../../redux/slices/FeedbackSlice';
import { useStationCompaignsQuery } from '../../redux/slices/CompaignSlice';

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div>{icon}</div>
    </div>
    <p className="text-2xl font-bold text-[#242C54]">{value}</p>
    <span className="text-sm text-red-600">{change}</span>
  </div>
);

const Station = () => {
  const { data } = useStationPassengersQuery();
  const { data: feedback } = useGetStationFeedbacksQuery();
  const { data: compaigns } = useStationCompaignsQuery();

  const whatsappCount = compaigns?.compaigns?.reduce(
    (sum, item) => item.channel === "whatsapp" ? sum + 1 : sum,
    0
  ) ?? 0;

  const emailCount = compaigns?.compaigns?.reduce(
    (sum, item) => item.channel === "email" ? sum + 1 : sum,
    0
  ) ?? 0;

  const averageRating = feedback?.data && feedback?.data.length > 0 ? feedback?.data?.reduce((sum, item) => sum + item.rating, 0) / feedback?.data?.length : '';
  return (
    <div className="p-4 bg-gray-50 ">

      <h2 className="text-2xl mt-4 font-bold text-[#242C54] mb-6">
        Station Performance Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Passengers"
          value={data?.allPassenger?.length}
          change="+12%"
          icon={<FiUsers className="text-[#E4141C]" size={24} />}
        />
        <StatCard
          title="Average Rating"
          value={averageRating}
          change="+0.3"
          icon={<FiStar className="text-[#E4141C]" size={24} />}
        />
        <StatCard
          title="WhatsApp Compaigns"
          value={whatsappCount}
          change="+8%"
          icon={<FaWhatsapp className="text-[#E4141C]" size={24} />}
        />
        <StatCard
          title="Email Campaigns"
          value={emailCount}
          change="+5%"
          icon={<FaEnvelope className="text-[#E4141C]" size={24} />}
        />
      </div>
    </div>
  );
};

export default Station;
