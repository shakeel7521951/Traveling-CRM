// components/superadminoverview/SupStationLeaderboard.jsx
const stationData = [
  { station: 'JED', score: 92 },
  { station: 'RUH', score: 88 },
  { station: 'DXB', score: 95 },
  { station: 'DMM', score: 83 },
];

const StationLeaderboard = () => {
  // Always sort by score (descending)
  const data = [...stationData].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex-1 min-w-[320px]">
      <h2 className="text-lg font-bold text-[#242C54] mb-6">
        Station Leaderboard
      </h2>
      <ul className="space-y-3">
        {data.map((s, idx) => (
          <li
            key={s.station}
            className="flex justify-between items-center p-3 rounded-lg border border-gray-100 transition-colors duration-200 hover:bg-[#626884] hover:text-white"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold w-6 text-center">
                {idx + 1}
              </span>
              <span className="font-semibold text-base">
                {s.station}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full font-bold text-sm bg-[#E4141C]/10 text-[#E4141C] hover:bg-white hover:text-[#E4141C]">
              {s.score}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StationLeaderboard;
