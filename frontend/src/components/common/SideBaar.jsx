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
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

// Reusable NavItem
const NavItem = ({ icon, text, active, path, sidebarOpen, isMobile, onItemClick }) => (
  <Link
    to={path}
    className="block"
    aria-current={active ? "page" : undefined}
    onClick={() => {
      if (isMobile && onItemClick) onItemClick(); // ✅ close sidebar on mobile
    }}
  >
    <div
      className={`relative flex items-center ${
        sidebarOpen ? "gap-3 px-4" : "justify-center"
      } my-2 py-3 cursor-pointer group rounded-lg transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-[#E4141C] to-[#c1121f] text-white shadow-lg scale-105 w-[96%]"
            : "hover:bg-white/10 text-gray-300 hover:text-white"
        }`}
    >
      <span className={`transition-colors ${active ? "text-white" : ""}`}>
        {icon}
      </span>

      {sidebarOpen && !isMobile && (
        <span className="whitespace-nowrap font-medium">{text}</span>
      )}

      {active && sidebarOpen && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
      )}

      {!sidebarOpen && !isMobile && (
        <div className="absolute left-full ml-3 px-3 py-2 bg-[#242C54] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg border border-white/10 z-50">
          {text}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#242C54] rotate-45"></div>
        </div>
      )}
    </div>
  </Link>
);

// Sidebar sections config
const sections = [
  {
    title: "Main Menu",
    items: [
      { text: "Dashboard", path: "/", icon: <FiHome size={20} /> },
      { text: "Passengers", path: "/passengers", icon: <FiUsers size={20} /> },
      { text: "Campaigns", path: "/campaigns", icon: <FiMessageSquare size={20} /> },
      { text: "Feedback", path: "/feedback", icon: <FiStar size={20} /> },
      { text: "Complaints", path: "/complaints", icon: <FiAlertTriangle size={20} /> },
    ],
  },
  {
    title: "System",
    items: [
      { text: "Settings", path: "/setting", icon: <FiSettings size={20} /> },
    ],
  },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Responsive check
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const closeSidebar = () => setSidebarOpen(false); // ✅ helper

  const getSidebarWidth = () => {
    if (isMobile) return sidebarOpen ? "w-64" : "w-0";
    return sidebarOpen ? "w-64" : "w-16";
  };

  // Active tab memoized
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <div
      className={`h-screen bg-gradient-to-b from-[#242C54] to-[#1a1f42] text-white transition-all duration-300 shadow-xl border-r border-white/10 ${getSidebarWidth()}`}
    >
      {/* Header */}
      <div
        className={`px-4 py-4 flex items-center ${
          isMobile ? "justify-center" : "justify-between"
        } border-b border-white/20 bg-white/5 backdrop-blur-sm`}
      >
        <button
          onClick={toggleSidebar}
          aria-expanded={sidebarOpen}
          className="text-[#C8131F] bg-[#20274C] hover:bg-white/10 p-2 rounded-lg transition-colors"
        >
          {sidebarOpen ? <RxCross2 className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {/* Nav Sections */}
      {(sidebarOpen || !isMobile) && (
        <nav className="mt-4 w-full">
          {sections.map((section, idx) => (
            <div key={idx}>
              <div className={`${sidebarOpen ? "px-4" : "px-0"} mb-2 ${idx > 0 ? "mt-6" : ""}`}>
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
                  onItemClick={closeSidebar} // ✅ auto-close on mobile
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
