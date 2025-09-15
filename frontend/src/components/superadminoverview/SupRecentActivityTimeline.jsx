// components/superadminoverview/SupRecentActivityTimeline.jsx
import { Megaphone, ClipboardList, CheckCircle2, MessageSquare } from "lucide-react";

const activities = [
  { station: "JED", activity: "New campaign launched", time: "2h ago", type: "campaign" },
  { station: "RUH", activity: "Passenger survey completed", time: "5h ago", type: "survey" },
  { station: "DXB", activity: "Complaint resolved", time: "1d ago", type: "complaint" },
  { station: "JED", activity: "Feedback review meeting", time: "2d ago", type: "feedback" },
];

const typeConfig = {
  campaign: { icon: Megaphone, color: "bg-blue-100 text-blue-600" },
  survey: { icon: ClipboardList, color: "bg-amber-100 text-amber-600" },
  complaint: { icon: CheckCircle2, color: "bg-green-100 text-green-600" },
  feedback: { icon: MessageSquare, color: "bg-purple-100 text-purple-600" },
};

const RecentActivityTimeline = ({ data = activities }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
      {/* Header */}
      <h2 className="text-xl font-bold text-[#242C54] mb-6">
        Recent Activities
      </h2>

      {/* Timeline */}
      <ul className="relative border-l border-gray-200 ml-3 space-y-6">
        {data.map((a, idx) => {
          const config = typeConfig[a.type] || {};
          const Icon = config.icon || MessageSquare;

          return (
            <li key={idx} className="ml-6 relative">
              {/* Icon */}
              <span
                className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white shadow-sm ${config.color}`}
              >
                <Icon size={14} />
              </span>

              {/* Content */}
              <div className="bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md">
                <p className="text-sm font-medium text-[#242C54]">
                  {a.activity}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {a.time} · <span className="font-semibold">{a.station}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivityTimeline;
