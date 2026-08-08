import { useState } from "react";
import API from "../api";

export default function Onboarding({ userId, onComplete }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!age || !height || !weight) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await API.post(`/auth/onboarding/${userId}`, {
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
      });
      onComplete();
    } catch (err) {
      setError("Failed to save onboarding data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-slate-200 px-4">
      <div className="bg-[#1e293b] border border-slate-700 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <span className="text-4xl">🚀</span>
          <h1 className="text-3xl font-extrabold text-slate-100 mt-2">Welcome to FitMode!</h1>
          <p className="text-slate-400 text-sm mt-1">Let's set up your profile metrics to personalize your experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Age</label>
            <input
              type="number"
              placeholder="e.g. 24"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Height (cm)</label>
            <input
              type="number"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Weight (kg)</label>
            <input
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Saving..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}