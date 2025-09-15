// components/superadminoverview/SupStationLeaderboard.jsx
import { Crown } from "lucide-react";

const stationData = [
  { station: "JED", score: 92 },
  { station: "RUH", score: 88 },
  { station: "DXB", score: 95 },
  { station: "DMM", score: 83 },
];

const getBadgeStyle = (rank) => {
  switch (rank) {
    case 1:
      return "bg-green-100 text-green-700";
    case 2:
      return "bg-amber-100 text-amber-700";
    case 3:
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const StationLeaderboard = () => {
  // Always sort by score (descending)
  const data = [...stationData].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex-1 min-w-[320px]">
      <h2 className="text-lg font-bold text-[#242C54] mb-6">
        Station Leaderboard
      </h2>
      <ul className="space-y-3">
        {data.map((s, idx) => {
          const rank = idx + 1;
          return (
            <li
              key={s.station}
              className="flex justify-between items-center p-3 rounded-lg border border-gray-100 transition-colors duration-200 hover:bg-[#626884] hover:text-white"
              aria-label={`Rank ${rank}: ${s.station} with score ${s.score}%`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold w-6 text-center">
                  {rank}
                </span>
                <span className="font-semibold text-base flex items-center gap-1">
                  {s.station}
                  {rank === 1 && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-bold text-sm ${getBadgeStyle(
                  rank
                )}`}
              >
                {s.score}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StationLeaderboard;
