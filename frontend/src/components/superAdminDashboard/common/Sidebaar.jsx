import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiStar,
  FiPieChart,
  FiSettings,
  FiMenu,
  FiAlertTriangle,
  FiBarChart2,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ icon, text, active, path, sidebarOpen, isMobile }) => {
  return (
    <Link to={path} className="block">
      <div
        className={`flex gap-3 mx-2 my-1 p-3 cursor-pointer group relative rounded-lg transition-all duration-200 ${
          active
            ? "bg-gradient-to-r from-[#E4141C] to-[#c1121f] text-white shadow-lg transform scale-105"
            : "hover:bg-white/10 text-gray-300 hover:text-white"
        }`}
      >
        {/* Show icon only when sidebar is open on mobile */}
        {sidebarOpen && (
          <span
            className={`mr-0 transition-colors ${active ? "text-white" : ""}`}
          >
            {icon}
          </span>
        )}
        {sidebarOpen && !isMobile && (
          <span
            className={`font-medium transition-colors ${
              active ? "text-white" : ""
            }`}
          >
            {text}
          </span>
        )}

        {/* Active indicator */}
        {active && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
        )}

        {/* Tooltip for desktop when sidebar is closed */}
        {!sidebarOpen && !isMobile && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-[#242C54] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg border border-white/10">
            {text}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#242C54] rotate-45"></div>
          </div>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getSidebarWidth = () => {
    if (isMobile) {
      return sidebarOpen ? "w-15" : "w-0";
    } else {
      return sidebarOpen ? "w-64" : "w-15";
    }
  };

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/overview") return "overview";
    if (path === "/stations") return "stations";
    if (path === "/compaigns") return "compaigns";
    if (path === "/feedback") return "feedback";
    if (path === "/complaints") return "complaints";
    if (path === "/reports") return "reports";
    if (path === "/admin") return "admin";
    if (path === "/all-stations") return "stations";
    if (path === "/setting") return "settings";
    return "";
  };

  return (
    <div
      className={`bg-gradient-to-b from-[#242C54] to-[#1a1f42] text-white transition-all duration-300  z-50 shadow-xl border-r border-white/10 ${getSidebarWidth()}`}
    >
      <div
        className={`px-5 py-4 flex items-center ${
          isMobile ? "justify-center" : "justify-between"
        } border-b border-white/20 bg-white/5 backdrop-blur-sm`}
      >
        {sidebarOpen && !isMobile && (
          <div className="flex items-center">
            <div className="bg-[#E4141C] text-white p-2 rounded-lg mr-3">
              <FiBarChart2 className="text-lg" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Travel CRM</h1>
              <p className="text-xs text-gray-300">Management Panel</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="relative text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
        >
          {sidebarOpen ? (
            <RxCross2 className="text-xl" />
          ) : (
            <FiMenu className="text-white" size={20} />
          )}
        </button>
      </div>

      {/* Only show nav items when sidebar is open on mobile */}
      {(sidebarOpen || !isMobile) && (
        <nav className="mt-4 w-full">
          <div className="px-3 mb-2">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
              Main Menu
            </p>
          </div>

          <NavItem
            icon={<FiHome size={20} />}
            text="Dashboard"
            active={getActiveTab() === "dashboard"}
            path="overview"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />

          <NavItem
            icon={<FiUsers size={20} />}
            text="All Stations"
            active={getActiveTab() === "passengers"}
            path="stations"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />

          <NavItem
            icon={<FiMessageSquare size={20} />}
            text="Campaigns"
            active={getActiveTab() === "campaigns"}
            path="compaigns"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />

          <NavItem
            icon={<FiStar size={20} />}
            text="Feedback"
            active={getActiveTab() === "feedback"}
            path="/feedback"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />

          <NavItem
            icon={<FiAlertTriangle size={20} />}
            text="Complaints"
            active={getActiveTab() === "complaints"}
            path="/complaints"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />

          {/* Removed Management Section */}

          <div className="px-3  mb-2 mt-6 ">
            <p className="text-xs  text-gray-400 uppercase tracking-wider font-semibold">
              System
            </p>
          </div>

          <NavItem
            icon={<FiSettings size={20} />}
            text="Settings"
            active={getActiveTab() === "settings"}
            path="setting"
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
