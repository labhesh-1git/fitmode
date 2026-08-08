import React from "react";

export default function ProfileTab({ user, challenges, health }) {
  // Rich achievements list
  const achievements = [
    { title: "Hello World", desc: "Successfully registered on FitMode", unlocked: true, icon: "👾", date: "Joined" },
    { title: "First Streak", desc: "Gain a streak of 1 day", unlocked: user.streak >= 1, icon: "🔥", date: "Active" },
    { title: "XP Grinder", desc: "Reach Level 2 (100+ total XP)", unlocked: user.level >= 2, icon: "💪", date: "Level 2" },
    { title: "Water Legend", desc: "Drink 3L or more water in one day", unlocked: health.waterIntake >= 3, icon: "💧", date: "Hydrated" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-12">
      {/* Profile Header with Cinematic Full-Width Background */}
      <div 
        className="h-80 rounded-3xl bg-cover bg-center border border-slate-805 relative overflow-hidden flex items-end p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
        style={{ backgroundImage: "url('/gym_hero_bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent z-10" />
        
        <div className="relative z-20 flex flex-col md:flex-row items-center gap-8 w-full">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-red-500 via-rose-600 to-red-650 flex items-center justify-center text-5xl shadow-2xl border-4 border-slate-900 group-hover:scale-105 transition-transform duration-500">
              {user.gender === "Female" ? "👩" : "👨"}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-red-650 text-white font-black text-sm px-3.5 py-1 rounded-full border-2 border-slate-900 shadow-xl">
              Lvl {user.level}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-3xl md:text-5xl font-black text-slate-100 uppercase tracking-tight">{user.fullName}</h1>
              <span className="inline-block bg-red-500/10 text-red-400 border border-red-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest self-center">
                {user.level >= 5 ? "🏆 Elite Beast" : user.level >= 3 ? "🔥 Challenger" : "👾 Rookie"}
              </span>
            </div>
            <p className="text-slate-400 font-light text-sm md:text-base">{user.email}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-xs font-semibold">
              <span className="px-4 py-2 bg-slate-950/80 border border-slate-850 rounded-xl text-slate-350 shadow">
                🔥 {user.streak} Day Streak
              </span>
              <span className="px-4 py-2 bg-red-550/15 border border-red-500/20 rounded-xl text-red-450 shadow">
                💎 {user.xp} Total XP
              </span>
              <span className="px-4 py-2 bg-slate-950/80 border border-slate-850 rounded-xl text-slate-350 shadow">
                🏃 H: {user.height}cm / W: {user.weight}kg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main statistics layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leetcode / GitHub style Contribution Panel */}
        <div className="lg:col-span-1 bg-[#060a15] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <h3 className="text-lg font-black text-slate-100 uppercase tracking-wider border-b border-slate-850 pb-4">Training Consistency</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Current Active Streak</p>
              <p className="text-4xl font-black text-red-500 mt-1">{user.streak} Days</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Level Target Progression</p>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-red-650 h-full rounded-full" style={{ width: `${user.xp % 100}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1 text-right">{user.xp % 100} / 100 XP</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Body Mass Index (BMI)</p>
              <p className="text-4xl font-black text-red-500 mt-1">{health.bmi || "23.4"}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-850 space-y-4">
            <p className="text-slate-400 text-xs font-black uppercase tracking-wider">Commit Heatmap</p>
            
            {/* Heatmap grid calendar */}
            <div className="grid grid-cols-7 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-855">
              {Array.from({ length: 28 }).map((_, i) => {
                const colors = [
                  "bg-slate-900 border-slate-950",
                  "bg-red-955 border-red-900/30",
                  "bg-red-800 border-red-700/30",
                  "bg-red-650 border-red-500/20",
                  "bg-red-500 border-red-400/20"
                ];
                const isNewUser = user.xp <= 0;
                const valIdx = isNewUser ? 0 : ((i * 5 + 2) % colors.length);
                return (
                  <div 
                    key={i} 
                    className={`w-5 h-5 rounded-md border ${colors[valIdx]} hover:scale-110 hover:border-red-500 transition-all cursor-pointer`}
                    title={isNewUser ? "No sessions logged" : `Session logged: Day -${28 - i}`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] text-slate-500 block text-right">Less 🟩 More 🟥</span>
          </div>
        </div>

        {/* Badges and Personal Records showcase */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Glassmorphism Badge Wall */}
          <div className="bg-[#060a15] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-black text-slate-100 uppercase tracking-wider border-b border-slate-850 pb-4">Unlocked Badges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border flex gap-5 items-center transition-all ${
                    badge.unlocked
                      ? "bg-slate-900 border-slate-800 text-slate-200 shadow-lg"
                      : "bg-slate-950/20 border-slate-900 text-slate-650 opacity-50"
                  }`}
                >
                  <span className="text-4xl">{badge.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-100">{badge.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{badge.desc}</p>
                    <span className={`inline-block mt-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      badge.unlocked 
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-slate-950 text-slate-500 border-slate-850"
                    }`}>
                      {badge.unlocked ? `Unlocked - ${badge.date}` : "Locked"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Large visual PR cards */}
          <div className="bg-[#060a15] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-black text-slate-100 uppercase tracking-wider border-b border-slate-850 pb-4">Personal Records</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Heaviest Squat", record: "185 kg", desc: "Strength PR", img: "/strength_training.png" },
                { title: "Daily Walk", record: "14,250 Steps", desc: "Cardio PR", img: "/gym_hero_bg.png" },
                { title: "Protein Count", record: "160g", desc: "Nutrition PR", img: "/athletic_nutrition.png" }
              ].map((pr, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-2xl border border-slate-850 bg-slate-950 shadow-md">
                  <div className="h-32 overflow-hidden relative">
                    <img src={pr.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={pr.title} />
                    <div className="absolute inset-0 bg-slate-950/70" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <span className="text-[10px] text-red-500 uppercase font-black tracking-widest">{pr.desc}</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-300">{pr.title}</h4>
                        <p className="text-lg font-black text-white">{pr.record}</p>
                      </div>
                    </div>
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
