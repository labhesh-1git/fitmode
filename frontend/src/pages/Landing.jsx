import React, { useEffect, useState } from "react";

export default function Landing({ onSwitchToLogin }) {
  const [offsetY, setOffsetY] = useState(0);
  const [activePlan, setActivePlan] = useState("pro");

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col relative overflow-hidden font-sans scroll-smooth">
      {/* Background Ambient Crimson Accents */}
      <div 
        className="glow-ambient glow-red w-[600px] h-[600px] -top-80 -left-60 transition-transform duration-300"
        style={{ transform: `translateY(${offsetY * 0.1}px)` }}
      />
      <div 
        className="glow-ambient glow-red w-[700px] h-[700px] top-[40%] -right-80 transition-transform duration-350"
        style={{ transform: `translateY(${offsetY * -0.08}px)` }}
      />

      {/* Floating grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Premium Sticky Glass Header */}
      <nav className="glass-nav px-6 md:px-12 py-5 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-305">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-red-500">⚡</span>
          <span className="font-extrabold text-xl tracking-wider text-white uppercase">
            Fit<span className="text-red-500">Mode</span>
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <a href="#train" className="hover:text-white transition-colors">Train</a>
          <a href="#challenges" className="hover:text-white transition-colors">Challenges</a>
          <a href="#progress" className="hover:text-white transition-colors">Progress</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
          <a href="#membership" className="hover:text-white transition-colors">Membership</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={onSwitchToLogin}
            className="text-sm font-semibold tracking-wider text-slate-350 hover:text-white transition-colors cursor-pointer"
          >
            Dashboard Login
          </button>
          <button
            onClick={onSwitchToLogin}
            className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-full bg-red-655 hover:bg-red-700 text-white transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.25)]"
          >
            Begin Your Transformation
          </button>
        </div>
      </nav>

      {/* Full-Screen Immersive Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Real Gym Image with Parallax & Dark Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 scale-105"
          style={{ 
            backgroundImage: "url('/gym_hero_bg.png')",
            transform: `translateY(${offsetY * 0.25}px)`
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/40" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8 pt-12">
          <div className="inline-flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-xs font-bold text-red-400 uppercase tracking-widest animate-pulse">
            <span>🏋️‍♂️</span> Engineered for Peak Performance
          </div>
          
          <h1 className="text-font-serif text-5xl md:text-9xl font-black tracking-tight text-white leading-none">
            Level Up Your Body.<br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-650 bg-clip-text text-transparent">
              Build Strength.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            Gamify your physical progression. Complete daily training sessions, build streaks, earn badges, and track workout statistics with premium performance reports.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={onSwitchToLogin}
              className="px-10 py-5 rounded-full bg-red-650 hover:bg-red-700 text-white font-bold tracking-widest text-sm uppercase transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.35)] hover:scale-105 cursor-pointer"
            >
              Start Today
            </button>
            <a
              href="#train"
              className="px-10 py-5 rounded-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:text-white cursor-pointer"
            >
              Learn Philosophy
            </a>
          </div>
        </div>
      </div>

      {/* Train Section */}
      <div id="train" className="relative z-10 bg-[#060a15] py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-red-500 text-xs font-extrabold uppercase tracking-widest">01 / Training Systems</span>
              <h2 className="text-font-serif text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Tackle daily training plans with performance-focused tracking.
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                FitMode assigns dynamic training plans based on your metabolic feedback. Track weight trends, hydration logs, and active session duration inside a unified, distraction-free environment.
              </p>
              
              {/* Floating Stat Cards Mockup */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div className="text-xs text-slate-500 uppercase font-bold">Active Sessions</div>
                  <div className="text-xl font-bold text-slate-200">128 Completed</div>
                </div>
                <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div className="text-xs text-slate-500 uppercase font-bold">Weekly Volume</div>
                  <div className="text-xl font-bold text-red-500">14,250 kg</div>
                </div>
                <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div className="text-xs text-slate-500 uppercase font-bold">Recovery Score</div>
                  <div className="text-xl font-bold text-green-500">92% Optimal</div>
                </div>
                <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div className="text-xs text-slate-500 uppercase font-bold">Hydration Level</div>
                  <div className="text-xl font-bold text-slate-200">3.2L Daily</div>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
              <img 
                src="/strength_training.png" 
                alt="Strength Training" 
                className="w-full object-cover h-[500px] transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent" />
            </div>
          </div>

          {/* Workouts Sub-Ecosystem Grid */}
          <div className="space-y-8 pt-12">
            <h3 className="text-2xl font-bold text-white text-center tracking-widest uppercase">Target Training Splits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Push Day", time: "60 Mins", target: "Chest, Shoulders & Triceps", img: "/strength_training.png" },
                { name: "Pull Day", time: "65 Mins", target: "Back, Rear Delts & Biceps", img: "/gym_hero_bg.png" },
                { name: "Leg Day", time: "70 Mins", target: "Quads, Hamstrings & Calves", img: "/strength_training.png" }
              ].map((item, i) => (
                <div key={i} className="relative group overflow-hidden rounded-xl border border-slate-855 bg-slate-950 shadow-lg">
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.name} />
                    <div className="absolute inset-0 bg-slate-950/60" />
                    <span className="absolute top-4 right-4 bg-red-650 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">{item.time}</span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-lg font-bold text-white">{item.name}</h4>
                    <p className="text-sm text-slate-400">{item.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div id="challenges" className="relative z-10 bg-[#020617] py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group overflow-hidden rounded-2xl border border-slate-800 order-last lg:order-first shadow-2xl">
              <img 
                src="/athletic_nutrition.png" 
                alt="Athletic Nutrition" 
                className="w-full object-cover h-[500px] transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent" />
            </div>
            
            <div className="space-y-6">
              <span className="text-red-500 text-xs font-extrabold uppercase tracking-widest">02 / Daily Challenges</span>
              <h2 className="text-font-serif text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Earn XP, build streaks, and unlock rewards.
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Input yesterday's metrics through the daily update modal. Log water intake, steps completed, sleep stats, and protein macros to earn consistency streaks.
              </p>

              {/* Dynamic Challenge Card Previews */}
              <div className="space-y-3 pt-2">
                {[
                  { name: "HIIT Sprint Intervals", xp: "+120 XP", status: "Active" },
                  { name: "Consistency Sprint: 5 Active Days", xp: "+500 XP", status: "Locked" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-slate-950 border border-slate-850 rounded-xl hover:border-red-500/40 transition-colors">
                    <span className="font-bold text-slate-200">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-red-500 text-xs font-bold font-mono">{item.xp}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* XP & Rewards sub-grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { name: "Bronze Streak", desc: "Unlock with 3-day active tracking streak", icon: "🥉" },
              { name: "Silver Streak", desc: "Unlock with 7-day active tracking streak", icon: "🥈" },
              { name: "Gold Streak", desc: "Unlock with 14-day active tracking streak", icon: "🥇" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-950 border border-slate-855 rounded-2xl text-center space-y-4 hover:scale-[1.02] transition-transform">
                <span className="text-5xl block">{item.icon}</span>
                <h4 className="text-lg font-extrabold text-slate-100">{item.name}</h4>
                <p className="text-sm text-slate-455">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress & Analytics Section */}
      <div id="progress" className="relative z-10 bg-[#060a15] py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-red-500 text-xs font-extrabold uppercase tracking-widest">03 / Progress Logs</span>
            <h2 className="text-font-serif text-3xl md:text-5xl font-extrabold text-white leading-none">
              Track Your Workouts with Absolute Precision.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Visualize your daily workout consistency with our signature heatmap calendar. Track personal records and monitor weight trend charts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-slate-950 border border-slate-850 rounded-2xl space-y-3">
              <span className="text-slate-500 text-xs font-mono">// Personal Records</span>
              <h4 className="text-xl font-bold text-white">Heaviest Lift</h4>
              <p className="text-2xl font-black text-red-500">185 kg squat</p>
            </div>
            <div className="p-6 bg-slate-950 border border-slate-850 rounded-2xl space-y-3">
              <span className="text-slate-500 text-xs font-mono">// Active Streaks</span>
              <h4 className="text-xl font-bold text-white">Best Active Streak</h4>
              <p className="text-2xl font-black text-red-500">24 days</p>
            </div>
            <div className="p-6 bg-slate-950 border border-slate-850 rounded-2xl space-y-3">
              <span className="text-slate-500 text-xs font-mono">// Step Tracking</span>
              <h4 className="text-xl font-bold text-white">Daily Average Steps</h4>
              <p className="text-2xl font-black text-red-500">11,420 steps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div id="community" className="relative z-10 bg-[#020617] py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-red-500 text-xs font-extrabold uppercase tracking-widest">04 / Leaderboards</span>
            <h2 className="text-font-serif text-3xl md:text-5xl font-extrabold text-white leading-none">
              Rise through community standings.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Compete on the community index leaderboard, compare streaks with peers, and unlock unique profile badges.
            </p>
          </div>

          {/* Leaders Board Preview Mockup */}
          <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-850 rounded-2xl divide-y divide-slate-850 overflow-hidden shadow-2xl">
            {[
              { rank: 1, name: "Marcus 'Beast' Brody", streak: "42 Days", xp: "14,820 XP", icon: "🏆" },
              { rank: 2, name: "Sarah Connor", streak: "35 Days", xp: "12,450 XP", icon: "🔥" },
              { rank: 3, name: "Labhesh (You)", streak: "18 Days", xp: "8,920 XP", icon: "⚡" }
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-900/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-red-500 font-mono w-6">#{user.rank}</span>
                  <span className="font-extrabold text-slate-100">{user.name}</span>
                </div>
                <div className="flex items-center gap-6 text-sm font-semibold">
                  <span className="text-slate-400">{user.streak} streak</span>
                  <span className="text-red-500 font-mono">{user.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Section */}
      <div id="membership" className="relative z-10 bg-[#060a15] py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-red-500 text-xs font-extrabold uppercase tracking-widest">05 / Memberships</span>
            <h2 className="text-font-serif text-3xl md:text-5xl font-extrabold text-white leading-none">
              Choose your training level.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Begin with free daily tracking or unlock premium programs, custom streak trophies, and advanced body composition trend analyses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {[
              { id: "free", name: "Free Tier", price: "$0", features: ["Daily Metrics Check-In", "Basic Leaderboard Entry", "Consistency Heatmap"] },
              { id: "pro", name: "Pro Athlete", price: "$19/mo", features: ["Advanced Workout Splits", "Custom Challenge Builder", "Body Fat & Weight Trend Analysis", "Animated Trophy Badges"] },
              { id: "elite", name: "Elite Club", price: "$49/mo", features: ["Personal Trainer Feedbacks", "Custom Macro Meal Compilers", "Priority Leaderboard Spotlights", "FitMode Athlete Apparel Discount"] }
            ].map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`p-8 rounded-2xl bg-slate-950 border transition-all duration-300 text-left space-y-6 cursor-pointer relative ${
                  activePlan === plan.id 
                    ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.25)] scale-[1.03]" 
                    : "border-slate-850 hover:border-slate-700"
                }`}
              >
                {activePlan === plan.id && (
                  <span className="absolute top-4 right-4 bg-red-650 text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full">Active</span>
                )}
                <div>
                  <h4 className="text-xl font-bold text-white">{plan.name}</h4>
                  <div className="text-3xl font-black text-red-500 mt-2">{plan.price}</div>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-red-500">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onSwitchToLogin}
                  className="w-full py-3 rounded-lg bg-red-650 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-[#020617] border-t border-slate-900 py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-font-serif text-3xl md:text-6xl font-black text-white leading-none">
            Train hard. Build your streak.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            FitMode applying game design architectures directly to athletic consistency. By tracking workout sets, hydration targets, and sleep metrics, we make the physical transformation journey as addicting as climbing gaming leaderboards.
          </p>
          <div className="pt-4">
            <button
              onClick={onSwitchToLogin}
              className="px-10 py-5 rounded-full bg-red-650 hover:bg-red-700 text-white font-extrabold tracking-widest text-sm uppercase transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-pointer"
            >
              Train Now
            </button>
          </div>
        </div>
      </div>

      {/* Premium Luxury Gym Brand Footer */}
      <footer className="bg-[#02050f] border-t border-slate-900 text-slate-450 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-red-500">⚡</span>
              <span className="font-extrabold text-xl tracking-wider text-white uppercase">
                Fit<span className="text-red-500">Mode</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Applying gamification structures directly to physical potential. Train daily, build streaks, and level up.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-widest uppercase">Train</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#train" className="hover:text-red-400 transition-colors">Workouts</a></li>
              <li><a href="#train" className="hover:text-red-400 transition-colors">Strength Programs</a></li>
              <li><a href="#train" className="hover:text-red-400 transition-colors">Cardio Plans</a></li>
              <li><a href="#train" className="hover:text-red-400 transition-colors">Recovery</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-widest uppercase">Challenges</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#challenges" className="hover:text-red-400 transition-colors">Daily Challenges</a></li>
              <li><a href="#challenges" className="hover:text-red-400 transition-colors">Weekly Missions</a></li>
              <li><a href="#challenges" className="hover:text-red-400 transition-colors">Streak Rewards</a></li>
              <li><a href="#challenges" className="hover:text-red-400 transition-colors">XP System</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-widest uppercase">Progress</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#progress" className="hover:text-red-400 transition-colors">Analytics</a></li>
              <li><a href="#progress" className="hover:text-red-400 transition-colors">Heatmap</a></li>
              <li><a href="#progress" className="hover:text-red-400 transition-colors">Personal Records</a></li>
              <li><a href="#progress" className="hover:text-red-400 transition-colors">Goal Tracking</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-widest uppercase">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#community" className="hover:text-red-400 transition-colors">Leaderboard</a></li>
              <li><a href="#community" className="hover:text-red-400 transition-colors">Teams</a></li>
              <li><a href="#community" className="hover:text-red-400 transition-colors">Events</a></li>
              <li><a href="#about" className="hover:text-red-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p>© 2026 FitMode Performance Platforms. Crafted for athletes.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Training API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}