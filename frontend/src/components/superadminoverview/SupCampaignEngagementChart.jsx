// components/superadminoverview/SupCampaignEngagementChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const engagementData = {
  JED: [
    { month: "Jan", engagement: 30 },
    { month: "Feb", engagement: 45 },
    { month: "Mar", engagement: 50 },
  ],
  RUH: [
    { month: "Jan", engagement: 20 },
    { month: "Feb", engagement: 40 },
    { month: "Mar", engagement: 35 },
  ],
  DXB: [
    { month: "Jan", engagement: 50 },
    { month: "Feb", engagement: 60 },
    { month: "Mar", engagement: 70 },
  ],
};

const stationColors = {
  JED: "#242C54",
  RUH: "#E4141C",
  DXB: "#64748b",
};

const CampaignEngagementChart = () => {
  const months = ["Jan", "Feb", "Mar"];

  // Transform data: one row per month, each station as a field
  const data = months.map((month) => {
    const row = { month };
    Object.keys(engagementData).forEach((station) => {
      const found = engagementData[station].find((d) => d.month === month);
      row[station] = found ? found.engagement : 0;
    });
    return row;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-lg font-bold text-[#242C54] mb-4">
        Campaign Engagement
      </h2>
      <div className="w-full h-[350px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fill: "#242C54" }} />
            <YAxis tick={{ fill: "#242C54" }} />
            <Tooltip />
            <Legend />
            {Object.keys(engagementData).map((station) => (
              <Line
                key={station}
                type="monotone"
                dataKey={station}
                stroke={stationColors[station] || "#000"}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignEngagementChart;
