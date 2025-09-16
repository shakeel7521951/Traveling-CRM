import { useState, useEffect } from "react";
import {
  FiUser,
  FiBell,
  FiShield,
  FiMoon,
  FiMail,
  FiSettings,
} from "react-icons/fi";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  // ✅ Dark mode sync with Tailwind
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // ✅ Form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving changes:", { name, email });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <FiSettings className="text-[#242C54]" /> Settings
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Section */}
        <div className="bg-white border border-[#242C54] dark:bg-gray-800 rounded-xl shadow p-6 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <FiUser className="text-[#242C54]" /> Profile Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300  mb-1"
              >
                Full Name
              </label>
              <div className="flex items-center border border-[#242C54] rounded-lg p-2 bg-white dark:bg-gray-700">
                <FiUser className="text-[#242C54] mr-2" />
                <input
                  id="fullName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <div className="flex items-center border border-[#242C54] rounded-lg p-2 bg-white dark:bg-gray-700">
                <FiMail className="text-[#242C54] mr-2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-[#242C54] hover:bg-[#1a1f3f] text-white rounded-lg shadow"
            >
              Save Changes
            </button>
          </form>
        </div></div>
    </div>
  );
}
