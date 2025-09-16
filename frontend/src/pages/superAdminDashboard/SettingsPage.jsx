import React, { useState } from "react";

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  );
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  );

  const handleProfileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Header with improved styling */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-[#242C54]">
              Create Your Profile
            </h1>
            <p className="text-gray-800 dark:text-gray-400 font-medium">
              Customize your personal information
            </p>
          </div>

          <form>
            {/* Cover Section with improved styling */}
            <div
              className="w-full h-56 md:h-64 rounded-2xl bg-cover bg-center relative flex items-end justify-center shadow-lg border-2 border-white/30"
              style={{ backgroundImage: `url(${coverImage})` }}
            >
              <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
              
              {/* Cover Upload */}
              <input
                type="file"
                id="upload_cover"
                hidden
                accept="image/*"
                onChange={handleCoverChange}
              />
              <label
                htmlFor="upload_cover"
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-700 text-sm px-4 py-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Change Cover
              </label>

              {/* Profile Image with improved styling */}
              <div className="absolute -bottom-14 w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl bg-cover bg-center transform transition-transform duration-300 hover:scale-105">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${profileImage})` }}
                ></div>
                <input
                  type="file"
                  id="upload_profile"
                  hidden
                  accept="image/*"
                  onChange={handleProfileChange}
                />
                <label
                  htmlFor="upload_profile"
                  className="absolute bottom-1 right-1 bg-[#242C54] hover:bg-[#1a1f3f] text-white w-9 h-9 flex items-center justify-center rounded-full cursor-pointer shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </label>
              </div>
            </div>

            <div className="mt-20 space-y-6">
              {/* First / Last Name */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="p-4 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#242C54] focus:outline-none focus:border-transparent  transition-all duration-300"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="p-4 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#242C54] focus:outline-none focus:border-transparent  transition-all duration-300"
                  />
                </div>
              </div>

              {/* Sex / DOB */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                    Gender
                  </label>
                  <select className="p-4 w-full border border-gray-300  rounded-xl focus:ring-2  focus:ring-[#242C54] focus:outline-none focus:border-transparent transition-all duration-300">
                    <option disabled value="">
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="p-4 w-full border border-gray-300  rounded-xl focus:ring-2 focus:ring-[#242C54] focus:outline-none  focus:border-transparent  transition-all duration-300"
                  />
                </div>
              </div>

              {/* Additional Fields */}
              <div className="w-full">
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself"
                  rows="3"
                  className="p-4 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#242C54] focus:outline-none focus:border-transparent transition-all duration-300"
                ></textarea>
              </div>

              {/* Submit Button with improved styling */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#242C54] hover:bg-[#1a1f3f] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}