import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useStationPassengersQuery } from "../../redux/slices/PassengerSlice";
import { useStationCompaignsQuery } from "../../redux/slices/CompaignSlice";

// Register ChartJS components
ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#242C54",
        font: { size: 12 },
        padding: 20,
      },
    },
  },
};

const Graph = () => {
  const { data, isLoading } = useStationPassengersQuery();
  const { data: compaignsData, isLoading: compaignsLoading } =
    useStationCompaignsQuery();

  // ✅ Always define arrays (avoid conditional hooks)
  const passengers = data?.allPassenger || [];
  const compaigns = compaignsData?.compaigns || [];

  // ✅ Group passengers by month (Line Chart)
  const monthlyCounts = useMemo(() => {
    const counts = {};
    passengers.forEach((p) => {
      const date = new Date(p.flightDate);
      const month = date.toLocaleString("default", { month: "short" }); // "Sep"
      counts[month] = (counts[month] || 0) + 1;
    });
    return counts;
  }, [passengers]);

  const passengerTrendsData = {
    labels: Object.keys(monthlyCounts),
    datasets: [
      {
        label: "Passengers",
        data: Object.values(monthlyCounts),
        borderColor: "#242C54",
        backgroundColor: "rgba(36, 44, 84, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#242C54",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // ✅ Campaigns by channel (WhatsApp vs Email)
  const campaignCounts = useMemo(() => {
    const counts = { whatsapp: 0, email: 0 };
    compaigns.forEach((c) => {
      if (c.channel === "whatsapp") counts.whatsapp++;
      if (c.channel === "email") counts.email++;
    });
    return counts;
  }, [compaigns]);

  const campaignDistributionData = {
    labels: ["WhatsApp", "Email"],
    datasets: [
      {
        label: "Campaigns",
        data: [campaignCounts.whatsapp, campaignCounts.email],
        backgroundColor: ["#25D366", "#4285F4"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // ✅ Show loader until both queries done
  if (isLoading || compaignsLoading) {
    return <p className="p-6 text-center">Loading graphs...</p>;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-[#242C54] mb-6">
        AI Analytics Graphs Section
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Passenger Trends (Line Chart) */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 lg:col-span-2 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#242C54] mb-4">
            Passenger Trends (By Month)
          </h3>
          <div className="h-64 md:h-80">
            <Line data={passengerTrendsData} options={chartOptions} />
          </div>
        </div>

        {/* Campaigns by Channel */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 lg:col-span-1">
          <h3 className="text-lg font-semibold text-[#242C54] mb-4">
            Campaigns by Channel
          </h3>
          <div className="h-64 md:h-80">
            <Pie data={campaignDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
