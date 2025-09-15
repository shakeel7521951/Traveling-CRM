// SuperCampnArray.js (updated)
import { MdOutlineEmail, MdDateRange } from "react-icons/md";

export const campaignData = [
  {
    city: "bahawalpur",
    Elements: [
      {
        id: 1,
        name: "Get Free Ticket",
        email: <MdOutlineEmail />,
        selectedCampaign: "Whatsapp Campaign",
        target: "all",
        calender: <MdDateRange />,
        date1: "2023-12-01",
        date2: "2023-12-31",
        sentVAlue: "0",
        resValue: "0",
        status: "active",
      },
      
    ]
  },
  {
    city: "multan",
    Elements: [
      {
        id: 1,
        name: "Multan Free Ticket",
        email: <MdOutlineEmail />,
        selectedCampaign: "Whatsapp Campaign",
        target: "all",
        calender: <MdDateRange />,
        date1: "2023-12-01",
        date2: "2023-12-31",
        sentVAlue: "0",
        resValue: "10",
        status: "active",
      },
   
    ]
  }
];