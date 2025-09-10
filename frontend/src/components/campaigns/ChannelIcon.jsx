// ChannelIcon.js
import React from "react";
import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ChannelIcon = ({ type }) => {
  return type === "whatsapp" ? (
    <div className="bg-[#242C54] text-white p-2 rounded-lg">
      <FaWhatsapp className="text-xl" />
    </div>
  ) : (
    <div className="bg-[#E4141C] text-white p-2 rounded-lg">
      <FiMail className="text-xl" />
    </div>
  );
};

export default ChannelIcon;