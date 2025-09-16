import { useState, useEffect } from "react";
import { BiEdit, BiCamera } from "react-icons/bi";
import {
  FiUser,
  FiBell,
  FiShield,
  FiMoon,
  FiMail,
  FiSettings,
  FiPhone,
  FiMapPin,
  FiSave,
  FiX
} from "react-icons/fi";

export default function SettingsPage() {
  const [isModel, setIsModel] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Main Street, New York, NY 10001");
  const [notifications, setNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [profileImage, setProfileImage] = useState("https://cdn.pixabay.com/photo/2024/06/22/23/01/boy-8847075_640.jpg");

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
    console.log("Saving changes:", { name, email, phone, address });
    // Show success message
    alert("Your settings have been saved successfully!");
    setIsModel(false);
  };

  // ✅ Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Show modal
  const showModel = () => {
    setIsModel(true);
  };

  return (
    <div className="dark max-w-6xl mx-auto p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <FiSettings className="text-[#E4141C]" />  Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Profile Image and Quick Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="relative mb-6">
            <div className="w-32 h-32 mx-auto border-4 border-white dark:border-gray-700 rounded-full overflow-hidden shadow-lg">
              <img 
                src={profileImage} 
                className="w-full h-full object-cover bg-center" 
                alt="Profile" 
              />
            </div>
            <label htmlFor="profile-upload" className="absolute bottom-2 right-2 md:right-6 bg-[#E4141C] p-2 rounded-full cursor-pointer shadow-md hover:bg-[#c1121f] transition-colors">
              <BiCamera className="text-white text-lg" />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiSettings className="text-[#242C54]" /> Quick Settings
          </h2>
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiBell className="text-[#242C54]" />
                <span className="text-gray-700 dark:text-gray-300">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#242C54]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiShield className="text-[#242C54]" />
                <span className="text-gray-700 dark:text-gray-300">Security Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securityAlerts}
                  onChange={() => setSecurityAlerts(!securityAlerts)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#242C54]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FiUser className="text-[#242C54]" /> Profile Information
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700">
                  <FiUser className="text-[#242C54] mr-2" />
                  <span className="text-gray-800 dark:text-gray-100">{name}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700">
                  <FiPhone className="text-[#242C54] mr-2" />
                  <span className="text-gray-800 dark:text-gray-100">{phone}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700">
                <FiMail className="text-[#242C54] mr-2" />
                <span className="text-gray-800 dark:text-gray-100">{email}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Permanent Address
              </label>
              <div className="flex items-start border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700">
                <FiMapPin className="text-[#242C54] mr-2 mt-1" />
                <span className="text-gray-800 dark:text-gray-100">{address}</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={showModel}
                className="px-6 py-3 cursor-pointer font-semibold bg-gradient-to-r from-[#242C54] to-[#E4141C] hover:from-[#1a1f3f] hover:to-[#c1121f] text-white rounded-xl shadow-md flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1"
              >
                <BiEdit className="text-lg" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Profile */}
      {isModel && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white">
                Edit Profile Information
              </h3>
              <button
                onClick={() => setIsModel(false)}
                className="text-gray-500 hover:text-[#E4141C] cursor-pointer transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 transition-all focus-within:border-[#242C54] focus-within:ring-2 focus-within:ring-[#242C54]/20">
                    <FiUser className="text-[#242C54] mr-2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 transition-all focus-within:border-[#242C54] focus-within:ring-2 focus-within:ring-[#242C54]/20">
                    <FiPhone className="text-[#242C54] mr-2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 transition-all focus-within:border-[#242C54] focus-within:ring-2 focus-within:ring-[#242C54]/20">
                  <FiMail className="text-[#242C54] mr-2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permanent Address
                </label>
                <div className="flex items-start border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 transition-all focus-within:border-[#242C54] focus-within:ring-2 focus-within:ring-[#242C54]/20">
                  <FiMapPin className="text-[#242C54] mr-2 mt-1" />
                  <textarea
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModel(false)}
                  className="px-4 py-2 border border-gray-300 cursor-pointer dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r cursor-pointer from-[#242C54] to-[#E4141C] hover:from-[#1a1f3f] hover:to-[#c1121f] text-white rounded-lg shadow-md flex items-center gap-2 transition-all duration-300"
                >
                  <FiSave className="text-lg" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}