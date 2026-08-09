import React, { useState, useEffect, useMemo } from "react";
import API from "../api";

export default function ProfileTab({ user: initialUser, challenges = [], health = {} }) {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (initialUser && initialUser.userId) {
      API.get(`/auth/profile/${initialUser.userId}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));

      API.get(`/health/history/${initialUser.userId}`)
        .then((res) => setHistory(res.data || []))
        .catch((err) => console.error(err));
    }
  }, [initialUser.userId, health]);

  const historyMap = useMemo(() => {
    const map = {};
    history.forEach(record => {
      if (record.date) {
        map[record.date] = record;
      }
    });
    return map;
  }, [history]);

  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 370; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        record: historyMap[dateStr] || null
      });
    }
    return days;
  }, [historyMap]);

  // Safe default values for health metrics
  const activeHealth = health && typeof health === 'object' && !Array.isArray(health) ? health : {
    weight: 70,
    waterIntake: 0,
    steps: 0,
    caloriesBurned: 0,
    workoutCompleted: false,
    energyLevel: "Normal",
    bmi: 22.4
  };

  // Calculate historical personal records dynamically from data user types
  const personalRecords = useMemo(() => {
    if (history.length === 0) {
      return {
        maxSteps: activeHealth.steps || 0,
        maxWater: activeHealth.waterIntake || 0,
        maxCalories: activeHealth.caloriesBurned || 0
      };
    }
    return {
      maxSteps: Math.max(...history.map(h => h.steps || 0), activeHealth.steps || 0),
      maxWater: Math.max(...history.map(h => h.waterIntake || 0), activeHealth.waterIntake || 0),
      maxCalories: Math.max(...history.map(h => h.caloriesBurned || 0), activeHealth.caloriesBurned || 0)
    };
  }, [history, activeHealth]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-550"></div>
      </div>
    );
  }

  // Calculate dynamic stats
  const totalMissions = challenges.length;
  
  const getProgress = (c) => {
    let progress = 0;
    if (c.type === "WATER") progress = (activeHealth.waterIntake / c.target) * 100;
    else if (c.type === "STEPS") progress = (activeHealth.steps / c.target) * 100;
    else if (c.type === "CALORIES") progress = (activeHealth.caloriesBurned / c.target) * 100;
    else if (c.type === "WEIGHT") progress = activeHealth.weight ? 100 : 0;
    return Math.min(Math.round(progress), 100);
  };

  const completedMissions = challenges.filter(c => getProgress(c) >= 100);
  const totalCompleted = completedMissions.length;

  const easyMissions = challenges.filter(c => c.rewardXp < 20);
  const easyCompleted = easyMissions.filter(c => getProgress(c) >= 100).length;

  const mediumMissions = challenges.filter(c => c.rewardXp >= 20 && c.rewardXp < 30);
  const mediumCompleted = mediumMissions.filter(c => getProgress(c) >= 100).length;

  const hardMissions = challenges.filter(c => c.rewardXp >= 30);
  const hardCompleted = hardMissions.filter(c => getProgress(c) >= 100).length;

  // Rich achievements list
  const achievements = [
    { title: "Hello World", desc: "Successfully registered on FitMode", unlocked: true, icon: "👾", date: "Joined" },
    { title: "First Streak", desc: "Gain a streak of 1 day", unlocked: profile.streak >= 1, icon: "🔥", date: "Active" },
    { title: "XP Grinder", desc: "Reach Level 2 (100+ total XP)", unlocked: profile.level >= 2, icon: "💪", date: "Level 2" },
    { title: "Water Legend", desc: "Drink 3L or more water in one day", unlocked: history.some(h => h.waterIntake >= 3) || activeHealth.waterIntake >= 3, icon: "💧", date: "Hydrated" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      
      {/* Two Column Layout (Leetcode Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: User Profile Details Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Lvl {profile.level}
            </div>

            {/* Avatar Section */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-650 to-rose-600 flex items-center justify-center text-5xl shadow-xl border-4 border-slate-900 mt-4">
              {profile.gender === "Female" ? "👩" : "👨"}
            </div>

            {/* Name & Bio */}
            <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tight mt-6">{profile.fullName}</h2>
            <p className="text-slate-400 text-xs mt-1 font-mono">{profile.email}</p>

            <span className="mt-4 inline-block bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
              {profile.level >= 5 ? "🏆 Elite Beast" : profile.level >= 3 ? "🔥 Challenger" : "👾 Rookie"}
            </span>

            {/* Quick Stats Grid */}
            <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-850">
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Daily Streak</span>
                <span className="text-xl font-extrabold text-red-500 mt-1 block">🔥 {profile.streak} Days</span>
              </div>
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total XP</span>
                <span className="text-xl font-extrabold text-red-500 mt-1 block">💎 {profile.xp}</span>
              </div>
            </div>

            {/* Dimensions Info */}
            <div className="w-full bg-[#020617] border border-slate-850 p-4 rounded-2xl mt-4 text-xs font-semibold text-slate-300 flex justify-around">
              <span>🏃 Height: {profile.height}cm</span>
              <div className="w-[1px] bg-slate-800 h-4 self-center"></div>
              <span>⚖ Weight: {profile.weight}kg</span>
            </div>
          </div>

          {/* Unlocked Badges Showcase */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-4">
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest border-b border-slate-850 pb-3">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex gap-3 items-center transition-all ${
                    badge.unlocked
                      ? "bg-slate-900/60 border-slate-800 text-slate-200"
                      : "bg-slate-955/20 border-slate-900 text-slate-650 opacity-40"
                  }`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-xs text-slate-100 leading-none">{badge.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight">{badge.desc}</p>
                  </div>
                  {badge.unlocked && <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-bold uppercase">Done</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Leetcode Activity & Statistics (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Leetcode Style Progress Circle Card */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest border-b border-slate-850 pb-3">Completed Sessions Summary</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-8 justify-around">
              {/* Solved Progress Circle */}
              <div className="relative flex items-center justify-center w-36 h-36">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-slate-850"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-red-500 transition-all duration-500"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray="376.8"
                    strokeDashoffset={376.8 - (376.8 * (totalMissions > 0 ? totalCompleted / totalMissions : 0))}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-black text-slate-100">{totalCompleted}</span>
                  <span className="text-xs text-slate-455 block font-medium mt-1">/ {totalMissions} Solved</span>
                </div>
              </div>

              {/* Progress Breakdown Bars */}
              <div className="flex-1 w-full space-y-4">
                {/* Easy Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-400">Easy</span>
                    <span className="text-slate-300 font-mono">{easyCompleted} / {easyMissions.length}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full rounded-full transition-all" 
                      style={{ width: `${easyMissions.length > 0 ? (easyCompleted / easyMissions.length) * 100 : 0}%` }} 
                    />
                  </div>
                </div>

                {/* Medium Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-amber-500">Medium</span>
                    <span className="text-slate-300 font-mono">{mediumCompleted} / {mediumMissions.length}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all" 
                      style={{ width: `${mediumMissions.length > 0 ? (mediumCompleted / mediumMissions.length) * 100 : 0}%` }} 
                    />
                  </div>
                </div>

                {/* Hard/Elite Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-rose-500">Hard</span>
                    <span className="text-slate-300 font-mono">{hardCompleted} / {hardMissions.length}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all" 
                      style={{ width: `${hardMissions.length > 0 ? (hardCompleted / hardMissions.length) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub-style Contribution Heatmap */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest">Training Consistency Calendar</h3>
              <span className="text-[10px] text-slate-500">Yearly Activity Grid</span>
            </div>

            <div className="flex flex-wrap gap-1 p-3 bg-[#0d1117] rounded-2xl border border-slate-850 overflow-x-auto justify-center">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                {calendarDays.map((day, i) => {
                  const record = day.record;
                  const hasCheckedIn = record !== null;
                  
                  let cellColor = "bg-[#161b22]";
                  if (hasCheckedIn) {
                    const steps = record.steps || 0;
                    if (steps >= 10000) cellColor = "bg-[#39d353]";
                    else if (steps >= 5000) cellColor = "bg-[#26a641]";
                    else cellColor = "bg-[#0e4429]";
                  }

                  const formattedDate = new Date(day.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  });

                  const tooltipText = hasCheckedIn
                    ? `${formattedDate}: ${record.steps} steps, ${record.waterIntake}L water, ${record.weight}kg`
                    : `${formattedDate}: No activity logged`;

                  return (
                    <div
                      key={i}
                      className={`w-[10px] h-[10px] rounded-[2px] ${cellColor} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                      title={tooltipText}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Inactive Day (⬛ Inactive)</span>
              <span>Logged Session (🟩 Active)</span>
            </div>
          </div>

          {/* Personal Records Cards */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest border-b border-slate-850 pb-3">Athlete Best Performances</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Weight Metric", record: `${activeHealth.weight || profile.weight || 70} kg`, desc: "Current logged weight", color: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400" },
                { title: "Daily Walk PR", record: `${personalRecords.maxSteps} Steps`, desc: "All-time maximum steps walked", color: "from-red-500/10 to-transparent border-red-500/20 text-red-400" },
                { title: "Nutrition Target PR", record: `${personalRecords.maxWater} L`, desc: "All-time maximum water intake", color: "from-sky-500/10 to-transparent border-sky-500/20 text-sky-400" }
              ].map((pr, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border bg-gradient-to-br ${pr.color} shadow-sm space-y-3`}>
                  <span className="text-[10px] uppercase font-black tracking-widest">{pr.title}</span>
                  <div>
                    <h4 className="text-2xl font-black">{pr.record}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-light leading-tight">{pr.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
