import React, { useState, useEffect, useMemo } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiStar,
  FiSettings,
  FiMenu,
  FiAlertTriangle,
  FiBarChart2,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

// Reusable NavItem
const NavItem = ({ icon, text, active, path, sidebarOpen, isMobile }) => (
  <Link to={path} className="block">
    <div
      className={`flex gap-3 mx-2 my-1 p-3 cursor-pointer group relative rounded-lg transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-[#E4141C] to-[#c1121f]  text-white shadow-lg transform scale-105"
            : "hover:bg-[#E4141C] text-gray-300 hover:text-white"
        }`}
    >
      <span className={`${active ? "text-white" : ""}`}>{icon}</span>

      {sidebarOpen && !isMobile && (
        <span className={`font-medium ${active ? "text-white" : ""}`}>
          {text}
        </span>
      )}

      {active && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
      )}
    </div>
  </Link>
);

// Sidebar sections config
const sections = [
  {
    title: "Main Menu",
    items: [
      { text: "Dashboard", path: "overview", icon: <FiHome size={20} /> },
      { text: "All Stations", path: "stations", icon: <FiUsers size={20} /> },
      {
        text: "Campaigns",
        path: "compaigns",
        icon: <FiMessageSquare size={20} />,
      },
      { text: "Feedback", path: "supfeedback", icon: <FiStar size={20} /> },
      {
        text: "Complaints",
        path: "supcomplaints",
        icon: <FiAlertTriangle size={20} />,
      },
    ],
  },
  {
    title: "System",
    items: [
      { text: "Settings", path: "setting", icon: <FiSettings size={20} /> },
    ],
  },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const getSidebarWidth = () => {
    if (isMobile) return sidebarOpen ? "w-64" : "w-0";
    return sidebarOpen ? "w-64" : "w-16";
  };

  // Active path memoized
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <div
      className={`h-full bg-gradient-to-b from-[#242C54] to-[#1a1f42] text-white transition-all duration-300 shadow-xl border-r border-white/10 ${getSidebarWidth()}`}
    >
      {/* Header */}
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
          aria-expanded={sidebarOpen}
          className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
        >
          {sidebarOpen ? <RxCross2 className="text-xl" /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Nav Sections */}
      {(sidebarOpen || !isMobile) && (
        <nav className="mt-4 w-full">
          {sections.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 mb-2 mt-4">
                {sidebarOpen && (
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    {section.title}
                  </p>
                )}
              </div>
              {section.items.map((item) => (
                <NavItem
                  key={item.path}
                  {...item}
                  active={activePath === item.path}
                  sidebarOpen={sidebarOpen}
                  isMobile={isMobile}
                />
              ))}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
