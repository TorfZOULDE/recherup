import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6366f1", "#10b981"];
const fallback = [{ name: "Entreprises", value: 60 }, { name: "Utilisateurs", value: 40 }];

export default function AdminDonutChart({ data }) {
  const chartData = data?.length ? data : fallback;
  return (
    <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Répartition des sources</h3>

      <div className="relative flex items-center justify-center" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", fontSize: 13, background: "rgba(255,255,255,0.95)", color: "#0f172a" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center pointer-events-none">
          <span className="text-xl font-bold text-slate-900">100%</span>
          <span className="text-xs text-slate-400">Total</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        {chartData.map((entry, i) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-xs text-slate-500">{entry.name} <span className="font-semibold text-slate-900">{entry.value}%</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
