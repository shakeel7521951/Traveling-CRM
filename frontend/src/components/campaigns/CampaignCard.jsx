import React from "react";
import { FiEye, FiTrash2, FiCalendar } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import ChannelIcon from "./ChannelIcon";

const CampaignCard = ({ campaign, onViewAnalytics, onDelete }) => {
  const responseRate =
    campaign.sent > 0 ? (campaign.responses / campaign.sent) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all">
      {/* Header with campaign color */}
      <div className={`h-2 ${campaign.color}`}></div>

      <div className="p-4">
        {/* Header with name and status */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-md font-bold text-[#242C54]">{campaign.name}</h3>
          <StatusBadge status={campaign.status} />
        </div>

        {/* Channel and target */}
        <div className="flex items-center mb-3">
          <ChannelIcon type={campaign.type} />
          <div className="ml-3">
            <p className="text-sm font-medium text-[#242C54]">
              {campaign.type === "whatsapp" ? "whatsapp" : "Email"} Campaign
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
              {new Date(campaign.startDate).toLocaleDateString()} -{" "}
              {new Date(campaign.endDate).toLocaleDateString()}
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
            onClick={onViewAnalytics}
            className="text-[#242C54] hover:text-[#E4141C] flex items-center text-xs font-medium"
          >
            <FiEye className="mr-1" size={14} />
            View Analytics
          </button>
          <button
            onClick={onDelete}
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

export default CampaignCard;
