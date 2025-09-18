import React, { useState } from 'react';
import { 
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiGlobe,
  FiBell,
  FiSave,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiSun,
  FiMoon,
  FiSliders
} from 'react-icons/fi';

const Setting = () => {
  // User profile state
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@tarcoaviation.com',
    phone: '+966501234567',
    language: 'english',
    notifications: true
  });

  // Password change state
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Theme state
  const [theme, setTheme] = useState('light');

  // Handle profile changes
  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Save settings
  const handleSave = (section) => {
    alert(`${section} settings saved successfully!`);
    // Add actual save logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#242C54]">Settings</h1>
            <p className="text-gray-600">Manage your account preferences</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <FiDownload className="text-[#242C54]" />
              <span className="text-[#242C54]">Export Data</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#242C54] to-[#3a456b] p-5 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <FiUser size={20} />
                  </div>
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiGlobe className="text-gray-400" />
                      </div>
                      <select
                        name="language"
                        value={profile.language}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] appearance-none bg-white"
                      >
                        <option value="english">English</option>
                        <option value="arabic">العربية (Arabic)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="notifications"
                        name="notifications"
                        checked={profile.notifications}
                        onChange={handleProfileChange}
                        className="sr-only"
                      />
                      <div className={`block w-10 h-6 rounded-full ${profile.notifications ? 'bg-[#E4141C]' : 'bg-gray-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${profile.notifications ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiBell className="mr-2" />
                      <span>Receive email notifications</span>
                    </div>
                  </label>
                </div>
                <button
                  onClick={() => handleSave('Profile')}
                  className="w-full bg-gradient-to-r from-[#E4141C] to-[#ff5252] text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <FiSave className="mr-2" />
                  Save Profile
                </button>
              </div>
            </div>

            {/* Password Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#242C54] to-[#3a456b] p-5 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <FiLock size={20} />
                  </div>
                  <h2 className="text-xl font-semibold">Change Password</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword.current ? "text" : "password"}
                        name="current"
                        value={password.current}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C]"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.current ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword.new ? "text" : "password"}
                        name="new"
                        value={password.new}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C]"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.new ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        name="confirm"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C]"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSave('Password')}
                  className="w-full bg-gradient-to-r from-[#E4141C] to-[#ff5252] text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <FiSave className="mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preferences */}
          <div className="space-y-6">
            {/* Theme Card */}
            {/* <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#242C54] to-[#3a456b] p-5 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <FiSliders size={20} />
                  </div>
                  <h2 className="text-xl font-semibold">Appearance</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Theme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-lg border ${theme === 'light' ? 'border-[#E4141C] ring-2 ring-[#E4141C] ring-opacity-30' : 'border-gray-200'} flex flex-col items-center`}
                      >
                        <div className="w-full h-20 bg-gray-100 rounded mb-2 border border-gray-200"></div>
                        <FiSun className="text-gray-700" />
                        <span className="text-xs mt-1">Light</span>
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-[#E4141C] ring-2 ring-[#E4141C] ring-opacity-30' : 'border-gray-200'} flex flex-col items-center`}
                      >
                        <div className="w-full h-20 bg-gray-800 rounded mb-2 border border-gray-700"></div>
                        <FiMoon className="text-gray-700" />
                        <span className="text-xs mt-1">Dark</span>
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={`p-4 rounded-lg border ${theme === 'system' ? 'border-[#E4141C] ring-2 ring-[#E4141C] ring-opacity-30' : 'border-gray-200'} flex flex-col items-center`}
                      >
                        <div className="w-full h-20 bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-2 border border-gray-200"></div>
                        <FiSun className="text-gray-700" />
                        <span className="text-xs mt-1">System</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Data Export Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#242C54] to-[#3a456b] p-5 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <FiDownload size={20} />
                  </div>
                  <h2 className="text-xl font-semibold">Data Management</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Export Data</h3>
                    <p className="text-sm text-gray-500 mb-4">Download all your account data in JSON format.</p>
                    <button className="w-full bg-[#242C54] text-white py-2 px-4 rounded-lg shadow-sm hover:bg-[#1a2140] transition-colors flex items-center justify-center">
                      <FiDownload className="mr-2" />
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r fr  om-[#242C54] to-[#3a456b] p-5 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <FiUser size={20} />
                  </div>
                  <h2 className="text-xl font-semibold">Account Actions</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full text-left text-sm font-medium text-gray-700 py-2 px-3 rounded hover:bg-gray-50 transition-colors">
                    Deactivate Account
                  </button>
                  <button className="w-full text-left text-sm font-medium text-red-600 py-2 px-3 rounded hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;