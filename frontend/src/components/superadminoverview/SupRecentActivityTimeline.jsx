// components/superadminoverview/SupRecentActivityTimeline.jsx
const activities = [
  { station: "JED", activity: "New campaign launched", time: "2h ago" },
  { station: "RUH", activity: "Passenger survey completed", time: "5h ago" },
  { station: "DXB", activity: "Complaint resolved", time: "1d ago" },
  { station: "JED", activity: "Feedback review meeting", time: "2d ago" },
];

const RecentActivityTimeline = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-lg font-bold text-[#242C54] mb-4">Recent Activities</h2>
      <ul className="space-y-4">
        {activities.map((a, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#E4141C]" />
            <div>
              <p className="text-sm text-[#242C54] font-medium">{a.activity}</p>
              <p className="text-xs text-gray-500">
                {a.time} · {a.station}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityTimeline;
