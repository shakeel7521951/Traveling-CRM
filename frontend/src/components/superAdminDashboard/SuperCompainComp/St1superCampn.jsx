import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";


const St1superCampn = () => {
    const bwpstAry=[
        {id:1,name:"Way to Success",email:<MdOutlineEmail/>,selectedCampaign:"Whatsapp Campaing",target:"all",calender:<MdDateRange/>,date1:"123232",date2:"233334",sentVAlue:"0",resValue:"0"},
        {id:1,name:"Way to Success",email:<MdOutlineEmail/>,selectedCampaign:"Whatsapp Campaing",target:"all",calender:<MdDateRange/>,date1:"123232",date2:"233334",sentVAlue:"0",resValue:"0"},
        {id:1,name:"Way to Success",email:<MdOutlineEmail/>,selectedCampaign:"Whatsapp Campaing",target:"all",calender:<MdDateRange/>,date1:"123232",date2:"233334",sentVAlue:"0",resValue:"0"},
        {id:1,name:"Way to Success",email:<MdOutlineEmail/>,selectedCampaign:"Whatsapp Campaing",target:"all",calender:<MdDateRange/>,date1:"123232",date2:"233334",sentVAlue:"0",resValue:"0"},
        {id:1,name:"Way to Success",email:<MdOutlineEmail/>,selectedCampaign:"Whatsapp Campaing",target:"all",calender:<MdDateRange/>,date1:"123232",date2:"233334",sentVAlue:"0",resValue:"0"},
        {id:1,name:"Way to Success",email:<MdOutlineEmail/>,selectedCampaign:"Whatsapp Campaing",target:"all",calender:<MdDateRange/>,date1:"123232",date2:"233334",sentVAlue:"0",resValue:"0"},
    ]
  return (
    <div>
      <div className="flex flex-col rounded-2xl p-4 md:flex-row justify-between shadow-sm items-start md:items-center gap-4 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-black">
            All Campaigns
          </h1>
          <p className="text-sm text-gray-400">
            Create and manage your campaign in your required area.
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search Box */}
          <div className="flex items-center px-3 py-2 rounded-full border border-gray-300 shadow-sm">
            <CiSearch className="text-xl text-gray-500" />
            <input
              className="p-1 ml-2 bg-transparent focus:outline-none w-40"
              type="text"
              placeholder="Search Campaign"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-2 rounded-lg shadow-sm">
            <CiFilter className="text-lg text-gray-600" />
            <select className="bg-transparent outline-none text-gray-700">
              <option value="">All Campaigns</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Create Button */}
      
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between  p-3 mb-10 bg-[#1E2449]">
            <h1 className=" font-semibold  text-2xl  w-xs text-center  py-2 my-10 text-white">Bahawalpur Station</h1>
         
                   <button className="flex items-center gap-2 bg-[#D1131E] text-white px-4 py-3 cursor-pointer rounded-lg hover:bg-gray-800 transition">
            <AiOutlinePlus className="text-lg" />
            <span>Create Campaign</span>
          </button>
           
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {bwpstAry.map((item,id)=>(
                 <div key={item.id} className="p-5 rounded-sm border-gray-100 shadow-md border">
            <div></div>
            <h1 className="font-semibold text-2xl mb-2">{item.name}</h1>
            <div className="flex items-center gap-10">
              <div className="p-2 bg-[#FB2C36] text-white rounded-sm">
                {item.email}
              </div>
              <div>
                <h1 className="font-semibold">{item.selectedCampaign}</h1>
                <p>
                  Target: <span>{item.target}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-10 my-2">
              <div className="p-2 bg-gray-100">
                {item.calender}
              </div>
              <div>
                <h1 className="font-semibold">Duation</h1>
                <div className="flex gap-2">
                  <p>{item.date1}</p>
                  <p>{item.date2}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex my-2 justify-between">
                {" "}
                <h1>Sent: {item.sentVAlue}</h1>
                <p>0% Reponse Rate ({item.resValue})</p>
              </div>
              <div className=" w-full h-4 bg-gray-200 mb-2 rounded-sm  "></div>
            </div>
            <div className="flex justify-between">
              <div>
                <button className="text-sm flex items-center py-2 gap-3 font-semibold cursor-pointer">
                  <FiEye />
                  View Analytics
                </button>
              </div>
              <div className="">
                <button className="flex items-center px-3 py-2 gap-1 bg-[#FB2C36] text-white font-semibold rounded-sm cursor-pointer">
                  <MdOutlineDelete />
                  Delete
                </button>
              </div>
            </div>
          </div>
            ))}
         
        </div>
      </div>
    </div>
  );
};

export default St1superCampn;
