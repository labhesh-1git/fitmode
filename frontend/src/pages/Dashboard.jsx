export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F17] p-8">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">FitMode Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#161B22] p-6 rounded-2xl">
          <p className="text-gray-400">Current Streak</p>
          <h2 className="text-3xl font-bold mt-2">18 Days</h2>
        </div>

        <div className="bg-[#161B22] p-6 rounded-2xl">
          <p className="text-gray-400">Points</p>
          <h2 className="text-3xl font-bold mt-2">3,840</h2>
        </div>

        <div className="bg-[#161B22] p-6 rounded-2xl">
          <p className="text-gray-400">BMI</p>
          <h2 className="text-3xl font-bold mt-2 text-emerald-400">22.4</h2>
        </div>

        <div className="bg-[#161B22] p-6 rounded-2xl">
          <p className="text-gray-400">Rank</p>
          <h2 className="text-3xl font-bold mt-2">#243</h2>
        </div>
      </div>
    </div>
  );
}