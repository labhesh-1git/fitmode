import React from "react";

export default function NavBar({ currentTab, setCurrentTab, onLogout }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "challenges", label: "Challenges", icon: "🏆" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "leaderboard", label: "Leaderboard", icon: "🔥" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <nav className="bg-[#0b0f19] border-b border-slate-800 text-slate-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                FitMode
              </span>
            </div>
            <div className="hidden md:flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    currentTab === tab.id
                      ? "bg-slate-900 text-red-400 border border-red-500/20"
                      : "hover:bg-slate-900/60 hover:text-white text-slate-400"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* Mobile sub bar */}
      <div className="md:hidden flex justify-around border-t border-slate-800 bg-[#060a13] py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 text-xs font-medium cursor-pointer ${
              currentTab === tab.id ? "text-red-400" : "text-slate-400"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
