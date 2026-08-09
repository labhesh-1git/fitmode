
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import API from "../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

function Analytics({ userId }) {
  const [analytics, setAnalytics] = useState({
    weight: [],
    water: [],
    steps: [],
    calories: [],
    dates: [],
  });

  useEffect(() => {
    API.get(`/analytics/weekly/${userId}`)
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  const labels = analytics.dates && analytics.dates.length > 0 
    ? analytics.dates 
    : ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Today"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8", // slate-400
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#334155" }, // slate-700
        ticks: { color: "#94a3b8" },
      },
      y: {
        grid: { color: "#334155" },
        ticks: { color: "#94a3b8" },
      },
    },
  };

  const weightData = {
    labels,
    datasets: [
      {
        label: "Weight (kg)",
        data: analytics.weight,
        borderColor: "#ef4444", // crimson-red
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };

  const waterData = {
    labels,
    datasets: [
      {
        label: "Water Intake (L)",
        data: analytics.water,
        backgroundColor: "#b91c1c", // darker red
        borderRadius: 4,
      },
    ],
  };

  const stepsData = {
    labels,
    datasets: [
      {
        label: "Steps Walked",
        data: analytics.steps,
        backgroundColor: "#dc2626", // medium red
        borderRadius: 4,
      },
    ],
  };

  const caloriesData = {
    labels,
    datasets: [
      {
        label: "Calories Burned (kcal)",
        data: analytics.calories,
        borderColor: "#f87171", // soft glowing red
        backgroundColor: "rgba(248, 113, 113, 0.2)",
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-100">Weekly Progress Analytics</h2>
        <p className="text-slate-400 text-sm mt-1">Visualize health trends and track consistency statistics.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Weight Trend</h3>
          <Line data={weightData} options={options} />
        </div>

        <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Water Intake</h3>
          <Bar data={waterData} options={options} />
        </div>

        <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Steps Progress</h3>
          <Bar data={stepsData} options={options} />
        </div>

        <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Calories Burned</h3>
          <Line data={caloriesData} options={options} />
        </div>
      </div>

      <div className="bg-[#0b0f19] border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="glow-ambient glow-red w-[200px] h-[200px] -bottom-10 -right-10 opacity-20"></div>
        <div>
          <h3 className="text-xl font-bold text-slate-100">Weekly Consistency Score</h3>
          <p className="text-slate-400 text-sm mt-1">Keep checking in daily to reach your fitness streak goals.</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-extrabold text-red-500">92%</p>
          <span className="inline-block mt-2 text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full font-semibold">
            Great consistency this week!
          </span>
        </div>
      </div>
    </div>
  );
}

export default Analytics;