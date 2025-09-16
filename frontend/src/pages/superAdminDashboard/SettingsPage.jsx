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
  FiX,
  FiLock,
  FiGlobe,
  FiDownload,
  FiEye,
  FiEyeOff
} from "react-icons/fi";

export default function SettingsPage() {
  const [isModel, setIsModel] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // Added isEdit state
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Main Street, New York, NY 10001");
  const [gender, setGender] = useState("Male");
  const [language, setLanguage] = useState("english");
  const [notifications, setNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [profileImage, setProfileImage] = useState("https://cdn.pixabay.com/photo/2024/06/22/23/01/boy-8847075_640.jpg");
  
  // Password state
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

  // ✅ Dark mode sync with Tailwind
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // ✅ Toggle edit mode
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  // ✅ Form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving changes:", { name, email, phone, address, gender, language });
    // Show success message
    alert("Your settings have been saved successfully!");
    setIsModel(false);
    setIsEdit(false); // Exit edit mode after saving
  };

  // ✅ Handle password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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

  // ✅ Save settings
  const handleSave = (section) => {
    alert(`${section} settings saved successfully!`);
    if (section === 'Profile') {
      setIsEdit(false); // Exit edit mode after saving
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#242C54] dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account preferences</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FiDownload className="text-[#242C54] dark:text-white" />
              <span className="text-[#242C54] dark:text-white">Export Data</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-r from-[#242C54] to-[#3a456b] p-5 text-white">
                <div className="flex items-center space-x-3">
                 <div className="relative mb-4">
                    <div className="w-14 h-14 border-4 border-white dark:border-gray-700 rounded-full overflow-hidden shadow-lg">
                      <img 
                        src={profileImage} 
                        className="w-full h-full object-cover bg-center" 
                        alt="Profile" 
                      />
                    </div>
                    <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-[#E4141C] p-2 rounded-full cursor-pointer shadow-md hover:bg-[#c1121f] transition-colors">
                      {isEdit ? <BiCamera className="text-white text-lg" /> :""}
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEdit} // Disable when not in edit mode
                        className={`block w-full pl-10 pr-3 py-2 border ${isEdit ? 'border-dotted border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${!isEdit ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEdit} // Disable when not in edit mode
                        className={`block w-full pl-10 pr-3 py-2 border ${isEdit ? 'border-dotted border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${!isEdit ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEdit} // Disable when not in edit mode
                        className={`block w-full pl-10 pr-3 py-2 border ${isEdit ? 'border-dotted border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${!isEdit ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiGlobe className="text-gray-400" />
                      </div>
                      <select
                        name="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        disabled={!isEdit} // Disable when not in edit mode
                        className={`block w-full pl-10 pr-3 py-2 border ${isEdit ? 'border-dotted border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] appearance-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${!isEdit ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
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
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                        disabled={!isEdit} // Disable when not in edit mode
                        className="sr-only"
                      />
                      <div className={`block w-10 h-6 rounded-full ${notifications ? 'bg-[#E4141C]' : 'bg-gray-300'} ${!isEdit ? 'opacity-50' : ''}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${notifications ? 'transform translate-x-4' : ''} ${!isEdit ? 'opacity-50' : ''}`}></div>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FiBell className="mr-2" />
                      <span>Receive email notifications</span>
                    </div>
                  </label>
                </div>
                <button
                  onClick={() => {
                    if (isEdit) {
                      handleSave('Profile');
                    } else {
                      setIsEdit(true);
                    }
                  }}
                  className="w-full bg-gradient-to-r font-semibold cursor-pointer from-[#E4141C] to-[#ff5252] text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                >
                  {isEdit ? (
                    <>
                      <FiSave className="mr-2" />
                      Update Profile
                    </>
                  ) : (
                    <>
                      <BiEdit className="mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Password Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword.current ? "text" : "password"}
                        name="current"
                        value={password.current}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showPassword.current ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword.new ? "text" : "password"}
                        name="new"
                        value={password.new}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {showPassword.new ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        name="confirm"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E4141C] focus:border-[#E4141C] bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      />
                      <button 
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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
            {/* Profile Image Card */}
            
            {/* Data Export Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
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
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Export Data</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Download all your account data in JSON format.</p>
                    <button className="w-full bg-[#242C54] text-white py-2 px-4 rounded-lg shadow-sm hover:bg-[#1a2140] transition-colors flex items-center justify-center">
                      <FiDownload className="mr-2" />
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-r from-[#242C54] to-[#3a456b] p-5 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <FiUser size={20} />
                  </div>
                  <h2 className="text-xl font-semibold">Account Actions</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300 py-2 px-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Deactivate Account
                  </button>
                  <button className="w-full text-left text-sm font-medium text-red-600 py-2 px-3 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
}