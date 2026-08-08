import { useState } from "react";
import API from "../api";

function DailyCheckIn({ userId, onComplete }) {
  const [water, setWater] = useState(2.5);
  const [steps, setSteps] = useState(8000);
  const [workout, setWorkout] = useState(true);
  const [weight, setWeight] = useState(70);
  const [energy, setEnergy] = useState("Normal");
  
  // Newly requested check-in parameters
  const [duration, setDuration] = useState(45);
  const [sleep, setSleep] = useState(7);
  const [protein, setProtein] = useState(120);
  const [challengesDone, setChallengesDone] = useState(true);
  const [checkInDate, setCheckInDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  });
  const [checkInDay, setCheckInDay] = useState("Monday");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/checkin", {
        userId,
        waterIntake: water,
        steps,
        workoutCompleted: workout,
        weight,
        energyLevel: energy,
        date: checkInDate, // Sourced from user selection
      });
      onComplete();
    } catch (err) {
      setError("Failed to submit check-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-slate-200 px-4 relative overflow-hidden">
      {/* Soft crimson ambient backgrounds */}
      <div className="glow-ambient glow-red w-[500px] h-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-25"></div>

      <div className="bg-[#0b0f19]/90 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6 relative z-10 backdrop-blur-md">
        <div className="text-center">
          <span className="text-4xl">📊</span>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mt-2">Daily Metrics Submission</h1>
          <p className="text-slate-400 text-sm mt-1">Submit yesterday's actual health records to synchronize active dashboard trends.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Day of Week
              </label>
              <select
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={checkInDay}
                onChange={(e) => setCheckInDay(e.target.value)}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Weight yesterday (kg)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Water yesterday (Liters)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Steps logged
              </label>
              <input
                type="number"
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Protein Intake (grams)
              </label>
              <input
                type="number"
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Sleep duration (Hours)
              </label>
              <input
                type="number"
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Workout Duration (Mins)
              </label>
              <input
                type="number"
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Workout Completed?
              </label>
              <select
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={workout ? "yes" : "no"}
                onChange={(e) => setWorkout(e.target.value === "yes")}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Completed challenges?
              </label>
              <select
                className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
                value={challengesDone ? "yes" : "no"}
                onChange={(e) => setChallengesDone(e.target.value === "yes")}
              >
                <option value="yes">Yes, all challenges completed</option>
                <option value="no">No, incomplete challenges</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Energy & Mood level
            </label>
            <select
              className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-250 focus:outline-none focus:border-red-500 transition-colors"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            >
              <option value="Low">Low / Fatigued</option>
              <option value="Normal">Normal / Stable</option>
              <option value="High">High / Pumped</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-650 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.25)]"
          >
            {loading ? "Compiling stats..." : "Submit & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DailyCheckIn;