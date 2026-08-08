import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DailyCheckIn from "./pages/DailyCheckIn";
import Dashboard from "./components/Dashboard";
import Onboarding from "./pages/Onboarding";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar";
import ChallengesTab from "./components/ChallengesTab";
import Analytics from "./components/Analytics";
import ProfileTab from "./components/ProfileTab";
import API from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [healthData, setHealthData] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch critical app state once logged in and checked in
  const fetchAppState = async (userId) => {
    try {
      const healthRes = await API.get(`/health/today/${userId}`);
      setHealthData(healthRes.data);

      const challengeRes = await API.get("/challenges");
      setChallenges(challengeRes.data);

      const leaderboardRes = await API.get("/auth/leaderboard");
      setLeaderboard(leaderboardRes.data);
    } catch (err) {
      console.error("Error fetching state:", err);
    }
  };

  const handleAuthSuccess = (data) => {
    setUser(data);
    // Explicitly enforce daily check-in on every single login session (regardless of backend default flag)
    setCheckedIn(false);
    if (data.onboardingCompleted) {
      fetchAppState(data.userId);
    }
  };

  const handleOnboardingSuccess = () => {
    setUser((prev) => ({ ...prev, onboardingCompleted: true, checkInRequired: true }));
    setCheckedIn(false);
  };

  const handleCheckInSuccess = () => {
    setCheckedIn(true);
    fetchAppState(user.userId);
  };

  const handleLogout = () => {
    setUser(null);
    setCheckedIn(false);
    setHealthData(null);
    setCurrentTab("dashboard");
  };

  const [isLandingView, setIsLandingView] = useState(true);

  // Auth flow
  if (!user) {
    if (isLandingView) {
      return <Landing onSwitchToLogin={() => setIsLandingView(false)} />;
    }
    return isLoginView ? (
      <Login
        onLogin={handleAuthSuccess}
        onSwitchToSignup={() => setIsLoginView(false)}
        onBackToLanding={() => setIsLandingView(true)}
      />
    ) : (
      <Signup
        onSignupSuccess={() => setIsLoginView(true)}
        onSwitchToLogin={() => setIsLoginView(true)}
        onBackToLanding={() => setIsLandingView(true)}
      />
    );
  }

  // Onboarding wizard flow
  if (!user.onboardingCompleted) {
    return <Onboarding userId={user.userId} onComplete={handleOnboardingSuccess} />;
  }

  // Daily check-in modal/page flow
  if (!checkedIn) {
    return (
      <DailyCheckIn
        userId={user.userId}
        onComplete={handleCheckInSuccess}
      />
    );
  }

  // Render tab content based on top navbar selections
  const renderTabContent = () => {
    switch (currentTab) {
      case "dashboard":
        return (
          <Dashboard
            userId={user.userId}
            healthData={healthData}
            setHealthData={setHealthData}
            challenges={challenges}
            leaderboard={leaderboard}
          />
        );
      case "challenges":
        return (
          <ChallengesTab 
            challenges={challenges} 
            health={healthData} 
            setChallenges={setChallenges}
            setHealthData={setHealthData}
            userId={user.userId}
          />
        );
      case "analytics":
        return <Analytics userId={user.userId} />;
      case "leaderboard":
        return (
          <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-12">
            {/* Top 3 Hero Cards Spotlight with dynamic visual design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-8">
              {[
                { rank: 2, name: leaderboard[1]?.fullName || "Sarah Connor", streak: "35 Days", xp: "12,450 XP", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=150&q=80", color: "border-slate-400 bg-slate-900/60 shadow-[0_0_20px_rgba(148,163,184,0.15)]", badge: "🥈 Silver" },
                { rank: 1, name: leaderboard[0]?.fullName || "Marcus Brody", streak: "42 Days", xp: "14,820 XP", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80", color: "border-amber-500 bg-slate-950 shadow-[0_0_35px_rgba(245,158,11,0.25)] scale-105 md:-translate-y-4", badge: "👑 Gold Champion" },
                { rank: 3, name: leaderboard[2]?.fullName || "Labhesh (You)", streak: "18 Days", xp: "8,920 XP", img: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=150&q=80", color: "border-amber-700 bg-slate-900/60 shadow-[0_0_20px_rgba(180,83,9,0.15)]", badge: "🥉 Bronze" }
              ].map((item, idx) => (
                <div key={idx} className={`p-6 rounded-3xl border text-center space-y-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.03] ${item.color}`}>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-slate-900/90 border border-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full text-slate-300">
                    {item.badge}
                  </div>
                  <div className="relative inline-block mt-4">
                    <img src={item.img} className="w-20 h-20 rounded-full object-cover border-2 border-slate-700 shadow-xl" alt={item.name} />
                    <span className="absolute -bottom-1.5 -right-1.5 bg-red-650 text-white font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                      #{item.rank}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-100 text-lg uppercase tracking-tight">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-semibold">{item.streak} streak</p>
                  </div>
                  <div className="text-xl font-black text-red-500 font-mono">{item.xp}</div>
                </div>
              ))}
            </div>

            {/* List entries for remaining board */}
            <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="glow-ambient glow-red w-[300px] h-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"></div>
              
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 px-5 uppercase tracking-widest border-b border-slate-850 pb-3">
                <span>Athlete Rankings</span>
                <span>Statistics</span>
              </div>

              {leaderboard.map((player, index) => {
                const avatars = [
                  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"
                ];
                const countries = ["USA Gym", "UK Power", "DE Fit", "CA Club"];
                const activeDurations = ["Active 2m ago", "Active 10m ago", "Active 1h ago", "Active 3h ago"];

                const avatarUrl = avatars[index % avatars.length];
                const countryTag = countries[index % countries.length];
                const activeTime = activeDurations[index % activeDurations.length];

                return (
                  <div
                    key={player.id}
                    className={`flex justify-between items-center py-4 px-5 rounded-2xl border transition-all relative z-10 ${
                      player.id === user.userId
                        ? "bg-red-500/10 border-red-500/30 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                        : "bg-[#020617]/60 border-slate-850 text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-black font-mono w-6 text-center ${index === 0 ? "text-amber-500" : index === 1 ? "text-slate-350" : index === 2 ? "text-amber-700" : "text-slate-500"}`}>
                        #{index + 1}
                      </span>
                      <img src={avatarUrl} className="w-11 h-11 rounded-full object-cover border border-slate-800 shadow" alt={player.fullName} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-slate-100">{player.fullName}</p>
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-900 border border-slate-850 rounded text-slate-450">{countryTag}</span>
                        </div>
                        <p className="text-xs text-slate-400">Level {player.level} • <span className="text-[10px] text-slate-500">{activeTime}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm font-semibold">
                      <span className="text-slate-450 font-mono">{player.streak} streak</span>
                      <span className="text-red-500 font-black font-mono">{player.xp} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "profile":
        return <ProfileTab user={user} challenges={challenges} health={healthData} />;
      default:
        return <Dashboard userId={user.userId} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-12 relative">
      {/* Background Soft Ambient Light */}
      <div className="glow-ambient glow-red w-[500px] h-[500px] top-[20%] right-[-100px] opacity-10"></div>
      <div className="glow-ambient glow-red w-[400px] h-[400px] bottom-[10%] left-[-150px] opacity-15"></div>

      <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} onLogout={handleLogout} />
      <div className="pt-6 relative z-10">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;