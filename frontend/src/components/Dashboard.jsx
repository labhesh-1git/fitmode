import { useEffect, useState } from "react";
import API from "../api";

function Dashboard({ userId, healthData, setHealthData, challenges, leaderboard }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get(`/auth/profile/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [userId, healthData]);

  const activeHealthData = healthData && typeof healthData === 'object' && !Array.isArray(healthData) ? healthData : {
    weight: 70,
    waterIntake: 0,
    steps: 0,
    caloriesBurned: 0,
    workoutCompleted: false,
    energyLevel: "Normal",
    bmi: 22.4
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-550"></div>
      </div>
    );
  }

  // Calculate circular progress dash offset (radius = 35, circumference = 2 * PI * 35 = 220)
  const xpPercentage = user.xp % 100;
  const strokeDashoffset = 220 - (220 * xpPercentage) / 100;

  // Find a daily challenge
  const todayChallenge = challenges[0] || { title: "No Challenge", description: "All caught up!", rewardXp: 0 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Large Cinematic Gym Banner */}
      <div 
        className="h-64 rounded-3xl bg-cover bg-center border border-slate-800 relative overflow-hidden flex items-end p-8 shadow-2xl group"
        style={{ backgroundImage: "url('/gym_hero_bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
        <div className="relative z-10 space-y-2">
          <span className="bg-red-650 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow">
            ACTIVE SESSION
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
            ENGINEER YOUR PHYSIQUE
          </h2>
          <p className="text-slate-300 text-sm max-w-xl font-light">
            Solve training test-cases, log metric commits, and level up in the community index.
          </p>
        </div>
      </div>

      {/* Welcome & Overview Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-5 relative z-10">
          {/* Circular progress badge */}
          <div className="relative flex items-center justify-center w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="35"
                className="stroke-slate-850"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                className="stroke-red-500 transition-all duration-500"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="220"
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xs text-slate-400 font-medium block">Level</span>
              <span className="text-lg font-extrabold text-slate-100">{user.level}</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">Welcome back, {user.fullName}!</h1>
            <p className="text-slate-400 text-sm mt-1">
              You have <span className="text-red-400 font-bold">{user.xp % 100}</span> XP. Get{" "}
              <span className="text-red-400 font-bold">{100 - (user.xp % 100)}</span> more XP to reach Level {user.level + 1}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-850 self-stretch md:self-auto justify-between">
          <div className="text-center px-4">
            <span className="text-xs text-slate-400 font-medium block uppercase tracking-wider">Daily Streak</span>
            <span className="text-2xl font-extrabold text-red-500 animate-pulse">🔥 {user.streak} Days</span>
          </div>
          <div className="w-[1px] bg-slate-800 h-8"></div>
          <div className="text-center px-4">
            <span className="text-xs text-slate-400 font-medium block uppercase tracking-wider">Total XP</span>
            <span className="text-2xl font-extrabold text-red-500">{user.xp}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Health cards & Today's challenge */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Challenge Section */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Today's Top Challenge
              </h2>
              <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                +{todayChallenge.rewardXp} XP
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">{todayChallenge.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{todayChallenge.description}</p>
            </div>
          </div>

          {/* Health cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Body Weight</span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-3xl font-extrabold text-slate-100">{activeHealthData.weight || 70} kg</span>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={async () => {
                        try {
                          const res = await API.post("/checkin", {
                            userId,
                            waterIntake: activeHealthData.waterIntake,
                            steps: activeHealthData.steps,
                            weight: (activeHealthData.weight || 70) - 0.5,
                            workoutCompleted: activeHealthData.workoutCompleted || false,
                            energyLevel: activeHealthData.energyLevel || "Normal",
                            caloriesBurned: activeHealthData.caloriesBurned
                          });
                          setHealthData(res.data);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="p-1.5 rounded bg-red-655/20 hover:bg-red-655/40 text-red-400 border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                    >
                      -0.5
                    </button>
                    <button 
                      onClick={async () => {
                        try {
                          const res = await API.post("/checkin", {
                            userId,
                            waterIntake: activeHealthData.waterIntake,
                            steps: activeHealthData.steps,
                            weight: (activeHealthData.weight || 70) + 0.5,
                            workoutCompleted: activeHealthData.workoutCompleted || false,
                            energyLevel: activeHealthData.energyLevel || "Normal",
                            caloriesBurned: activeHealthData.caloriesBurned
                          });
                          setHealthData(res.data);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="p-1.5 rounded bg-red-650/20 hover:bg-red-650/40 text-red-400 border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                    >
                      +0.5
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
              </div>
            </div>

            <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Water Intake</span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-3xl font-extrabold text-slate-100">{activeHealthData.waterIntake} L</span>
                  <button 
                    onClick={async () => {
                      try {
                        const newWater = Number((activeHealthData.waterIntake + 0.25).toFixed(2));
                        const res = await API.post("/checkin", {
                          userId,
                          waterIntake: newWater,
                          steps: activeHealthData.steps,
                          weight: activeHealthData.weight || 70,
                          workoutCompleted: activeHealthData.workoutCompleted || false,
                          energyLevel: activeHealthData.energyLevel || "Normal"
                        });
                        setHealthData(res.data);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="p-1.5 rounded bg-red-650/20 hover:bg-red-650/40 text-red-400 border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                  >
                    + 250ml
                  </button>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
            </div>

            <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Steps Walked</span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-3xl font-extrabold text-slate-100">{activeHealthData.steps} / 10k</span>
                  <button 
                    onClick={async () => {
                      try {
                        const res = await API.post("/checkin", {
                          userId,
                          waterIntake: activeHealthData.waterIntake,
                          steps: activeHealthData.steps + 1000,
                          weight: activeHealthData.weight || 70,
                          workoutCompleted: activeHealthData.workoutCompleted || false,
                          energyLevel: activeHealthData.energyLevel || "Normal"
                        });
                        setHealthData(res.data);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="p-1.5 rounded bg-red-650/20 hover:bg-red-650/40 text-red-400 border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                  >
                    + 1,000
                  </button>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
            </div>

            <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Calories Burned</span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-3xl font-extrabold text-slate-100">{activeHealthData.caloriesBurned} kcal</span>
                  <button 
                    onClick={async () => {
                      try {
                        const res = await API.post("/checkin", {
                          userId,
                          waterIntake: activeHealthData.waterIntake,
                          steps: activeHealthData.steps,
                          weight: activeHealthData.weight || 70,
                          workoutCompleted: activeHealthData.workoutCompleted || false,
                          energyLevel: activeHealthData.energyLevel || "Normal",
                          caloriesBurned: (activeHealthData.caloriesBurned || 0) + 100
                        });
                        setHealthData(res.data);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="p-1.5 rounded bg-red-650/20 hover:bg-red-650/40 text-red-400 border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                  >
                    + 100
                  </button>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Mini leaderboard */}
        <div className="space-y-6">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">Community Standings</h2>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((player, idx) => (
                <div key={player.id} className="flex justify-between items-center py-2 border-b border-slate-900 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-5 ${idx === 0 ? "text-amber-500" : idx === 1 ? "text-slate-300" : idx === 2 ? "text-amber-700" : "text-slate-500"}`}>
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-200">{player.fullName}</p>
                      <p className="text-xs text-slate-400 font-light">Lvl {player.level}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-red-400">{player.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;