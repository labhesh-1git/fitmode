import { useState } from "react";
import API from "../api";

function Login({ onLogin, onSwitchToSignup, onBackToLanding }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      onLogin(res.data);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-slate-200 px-4 relative overflow-hidden">
      {/* Background Soft Red Accent Light */}
      <div className="glow-ambient glow-red w-[400px] h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>

      <div className="bg-[#0b0f19]/90 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 relative z-10 backdrop-blur-md">
        <button
          onClick={onBackToLanding}
          className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>←</span> Back to Landing
        </button>

        <div className="text-center">
          <span className="text-4xl">⚡</span>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent mt-2">
            FitMode
          </h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to track your LeetCode-style daily metrics.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617] border border-slate-850 p-3 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-4">
          Don't have an account?{" "}
          <button onClick={onSwitchToSignup} className="text-red-400 hover:underline font-semibold cursor-pointer">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;