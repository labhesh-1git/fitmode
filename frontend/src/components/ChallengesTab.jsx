import React, { useState } from "react";
import API from "../api";

export default function ChallengesTab({ challenges, health, setChallenges, setHealthData, userId }) {
  const [celebratingId, setCelebratingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState("STEPS");
  const [newTarget, setNewTarget] = useState(5000);
  const [newDifficulty, setNewDifficulty] = useState("Easy");

  const handleAddChallenge = async (e) => {
    e.preventDefault();
    let rewardXp = 10;
    if (newDifficulty === "Medium") rewardXp = 20;
    if (newDifficulty === "Elite") rewardXp = 30;

    try {
      const res = await API.post("/challenges", {
        title: newTitle,
        description: newDesc,
        type: newType,
        target: Number(newTarget),
        rewardXp
      });
      if (setChallenges) {
        setChallenges((prev) => [...prev, res.data]);
      }
      setShowForm(false);
      setNewTitle("");
      setNewDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  const getChallengeStats = (challenge) => {
    let progress = 0;
    if (challenge.type === "WATER") {
      progress = (health.waterIntake / challenge.target) * 100;
    } else if (challenge.type === "STEPS") {
      progress = (health.steps / challenge.target) * 100;
    } else if (challenge.type === "CALORIES") {
      progress = (health.caloriesBurned / challenge.target) * 100;
    } else if (challenge.type === "WEIGHT") {
      progress = health.weight ? 100 : 0;
    }
    progress = Math.min(Math.round(progress), 100);
    const completed = progress >= 100;

    let difficulty = "Easy";
    let diffColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (challenge.rewardXp >= 30) {
      difficulty = "Elite";
      diffColor = "text-rose-500 bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
    } else if (challenge.rewardXp >= 20) {
      difficulty = "Medium";
      diffColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
    }

    return { progress, completed, difficulty, diffColor };
  };

  const handleComplete = async (challenge) => {
    setCelebratingId(challenge.id);
    // Play sound FX
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.2); // C6
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.log("Audio not allowed by policy yet");
    }

    setTimeout(async () => {
      try {
        const nextSteps = health.steps + (challenge.type === "STEPS" ? challenge.target : 0);
        const nextWater = health.waterIntake + (challenge.type === "WATER" ? challenge.target : 0);
        const nextCalories = health.caloriesBurned + (challenge.type === "CALORIES" ? challenge.target : 0);

        const checkinRes = await API.post("/checkin", {
          userId: userId || 1,
          waterIntake: nextWater,
          steps: nextSteps,
          weight: health.weight || 70,
          workoutCompleted: true,
          caloriesBurned: nextCalories,
          energyLevel: health.energyLevel || "Normal"
        });

        // Safe client state update to avoid page reload or auth state wipes!
        if (setHealthData) {
          setHealthData(checkinRes.data);
        }
        
        // Fetch fresh challenge completions without resetting session
        const challengeRes = await API.get("/challenges");
        if (setChallenges) {
          setChallenges(challengeRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCelebratingId(null);
      }
    }, 950);
  };

  // Curated list of high-quality gym-related photography URLs from Unsplash
  const enrichChallenge = (c) => {
    if (c.type === "WATER") {
      return {
        image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80", // Clear water bottle in gym
        duration: "All Day",
        calories: "0 kCal",
        multiplier: "1.5x Boost",
        category: "Nutrition Challenges"
      };
    }
    if (c.type === "STEPS") {
      return {
        image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=600&q=80", // Athlete running on track/treadmill
        duration: "45 Mins",
        calories: "350 kCal",
        multiplier: "2.0x Boost",
        category: "Cardio Challenges"
      };
    }
    return {
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80", // Heavy barbells squat racks
      duration: "60 Mins",
      calories: "450 kCal",
      multiplier: "1.2x Boost",
      category: "Strength Challenges"
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-12">
      {/* Immersive Cinematic Hero Header */}
      <div 
        className="h-80 rounded-3xl bg-cover bg-center border border-slate-805 relative overflow-hidden flex items-end p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80')" }} // Large premium barbell deadlift background
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-red-650/5 mix-blend-overlay z-10" />
        <div className="relative z-20 space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
            ⚡ Training Hub Active
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
            Today's Training Missions
          </h1>
          <p className="text-slate-355 text-base md:text-lg font-light">
            Complete physical workout prompts to compile strength commits, earn XP, and unlock streak multipliers.
          </p>
        </div>
      </div>

      {/* Progress Showcase Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-950/80 border border-slate-850 rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xs text-slate-505 uppercase font-bold tracking-wider relative z-10">Missions Active</div>
          <div className="text-4xl font-black text-white mt-2 relative z-10">{challenges.length} Exercises</div>
        </div>
        <div className="p-6 bg-slate-950/80 border border-slate-850 rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xs text-slate-505 uppercase font-bold tracking-wider relative z-10">Completed Today</div>
          <div className="text-4xl font-black text-red-500 mt-2 relative z-10">
            {challenges.filter((c) => getChallengeStats(c).completed).length} Sessions
          </div>
        </div>
        <div className="p-6 bg-slate-950/80 border border-slate-850 rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xs text-slate-505 uppercase font-bold tracking-wider relative z-10">Compilation Rate</div>
          <div className="text-4xl font-black text-green-500 mt-2 relative z-10">
            {challenges.length > 0
              ? Math.round((challenges.filter((c) => getChallengeStats(c).completed).length / challenges.length) * 100)
              : 0}%
          </div>
        </div>
      </div>

      {/* Challenge Creation form */}
      <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Custom Training Missions</h2>
            <p className="text-slate-400 text-xs mt-1">Design and append custom fitness routines to your active session.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 bg-red-650 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.2)] text-xs uppercase tracking-wider self-start sm:self-auto"
          >
            {showForm ? "✕ Close Form" : "＋ Create Mission"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddChallenge} className="pt-4 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Mission Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Squat Burnout"
                className="w-full bg-[#020617] border border-slate-855 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Mission Description</label>
              <textarea
                required
                placeholder="e.g. Perform 50 deep bodyweight squats with controlled form."
                className="w-full bg-[#020617] border border-slate-855 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors h-20 resize-none"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Mission Type</label>
              <select
                className="w-full bg-[#020617] border border-slate-855 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                <option value="STEPS">STEPS</option>
                <option value="WATER">WATER</option>
                <option value="CALORIES">CALORIES</option>
                <option value="WEIGHT">WEIGHT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Target Value</label>
              <input
                type="number"
                required
                min="1"
                className="w-full bg-[#020617] border border-slate-855 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={newTarget}
                onChange={(e) => setNewTarget(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Difficulty</label>
              <select
                className="w-full bg-[#020617] border border-slate-855 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value)}
              >
                <option value="Easy">Easy (+10 XP)</option>
                <option value="Medium">Medium (+20 XP)</option>
                <option value="Elite">Elite (+30 XP)</option>
              </select>
            </div>

            <div className="sm:col-span-2 md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-red-650 hover:bg-red-700 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.25)] text-xs uppercase tracking-wider w-full sm:w-auto"
              >
                ＋ Append to Training Missions
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Dynamic Visual splits by Categories */}
      {["Strength Challenges", "Cardio Challenges", "Nutrition Challenges"].map((cat) => {
        const catChallenges = challenges.filter(c => enrichChallenge(c).category === cat);
        if (catChallenges.length === 0) return null;

        return (
          <div key={cat} className="space-y-6 pt-4">
            <div className="flex items-center gap-4 border-b border-slate-850 pb-3">
              <span className="w-2 h-6 bg-red-650 rounded-full" />
              <h3 className="text-2xl font-black text-white uppercase tracking-wider">{cat}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {catChallenges.map((challenge) => {
                const { progress, completed, difficulty, diffColor } = getChallengeStats(challenge);
                const extra = enrichChallenge(challenge);
                const isCelebrating = celebratingId === challenge.id;

                return (
                  <div 
                    key={challenge.id} 
                    className={`rounded-3xl bg-slate-955 border overflow-hidden transition-all duration-300 relative flex flex-col justify-between group ${
                      completed 
                        ? "border-red-955/20 opacity-75" 
                        : isCelebrating 
                          ? "border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.3)] scale-[0.98]" 
                          : "border-slate-850 hover:border-slate-700 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                    }`}
                  >
                    {/* Visual Card Image Cover */}
                    <div className="h-52 overflow-hidden relative">
                      <img src={extra.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={challenge.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-955/40 to-transparent" />
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${diffColor}`}>
                        {difficulty}
                      </span>
                      <span className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 text-slate-350 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {extra.multiplier}
                      </span>
                    </div>

                    {/* Content details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                          <span>⏱ {extra.duration}</span>
                          <span>🔥 {extra.calories}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">{challenge.title}</h4>
                        <p className="text-sm text-slate-400 font-light">{challenge.description}</p>
                      </div>

                      {/* Progress Metrics & Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Workout Progress</span>
                          <span className="text-red-500">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-red-650 to-red-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Celebration Overlay */}
                      {isCelebrating && (
                        <div className="absolute inset-0 bg-[#020617]/90 z-20 flex flex-col items-center justify-center space-y-3 animate-fade-in">
                          <span className="text-4xl animate-bounce">🏆</span>
                          <span className="text-xl font-extrabold text-white uppercase tracking-widest">Workout Completed!</span>
                          <span className="text-red-500 font-mono font-bold">+{challenge.rewardXp} XP Awarded</span>
                        </div>
                      )}

                      {/* Action trigger */}
                      <div>
                        <button
                          disabled={completed || isCelebrating}
                          onClick={() => handleComplete(challenge)}
                          className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer ${
                            completed
                              ? "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed"
                              : isCelebrating
                                ? "bg-red-655 text-white animate-pulse"
                                : "bg-red-650 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]"
                          }`}
                        >
                          {completed ? "✓ Workout Logged" : isCelebrating ? "Compiling Streak..." : "Complete Session"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
